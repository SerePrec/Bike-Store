# Mammoth Bike Store App

Este proyecto forma parte del trabajo final correspondiente al curso de **React JS** dictado por **CoderHouse**.

Se trata del desarrollo de una tienda virtual para una bicicletería (Mammoth) utilizando la biblioteca de **React JS**.

## Deploy 
https://mammoth-bike-store.netlify.app/

### Inicios y origen del proyecto

La idea del proyecto nace en base a mi proyecto final para el curso de **Desarrollo Web** de CoderHouse. Inicialmente elegí está temática de un sitio web de una bicicletería, ya que me resultaba atractiva y divertida.

Con el objeto de darle más realismo al sitio, tome como base la marca de una red de bicicleterías de España, ya que de este modo podía conseguir material (imágenes, videos, redes, etc) real con la impronta de la marca. Salvo estos recursos, el resto del sitio fue desarrollado totalmente desde cero y de manera propia.

Posteriormente, tome el curso de **JavaScript** y me pareció interesante como trabajo final, desarrollar una tienda virtual para mi sitio, complementando de esta manera toda lo hecho en el curso anterior donde no se veía nada de JavaScript.

Ahora, llegado el curso de **React JS**, el trabajo final que se solicita es hacer un e-commerce (no es a total libre elección como en los cursos anteriores), por lo que me vi en la situación de optar por un e-commerce totalmente nuevo o adaptar y optimizar el que ya había realizado para el curso previo de JavaScript.

Finalmente, opte por la segunda opción, ya que lo como un desafío extra el de readaptar una App construida en puro **JS Vanilla** a una **SPA construida con React JS**. Aparte de buscar optimizar y mejorar la App anterior.

Otro punto que me llevó por este camino fue el de contar con material ya utilizado (fundamentalmente imágenes y datos de productos), lo que me ahorra el tiempo de volver a buscarlo y poder dedicar ese tiempo más a la programación y funcionalidad de la App, que a la "estética" de la misma. Igualmente, cabe destacar que sufrió un restyling total respecto a la versión original.

---

## Resumen de Funcionalidades

A continuación, hago un punteo de algunos temas referidos a la lógica funcional que implemente y escogí para la programación de los componentes. Están ordenados en base al orden en que se fueron incorporando en las entregas de los **desafíos** de la cursada, pero reagrupados por tema.

- Estructura de archivos
- Asincronía y peticiones Firebase
- Proceso simulado de confirmación del checkout
- Componente NavBar
- Componente BrandBanner
- Componente ItemCount
- Componente InfoMessage
- Componente Item
- Componente ItemListContainer
- Componente Loader
- Componente InfoDollar
- Componente ItemDetail
- Page Home y Category
- Page ItemDetailContainer
- Reestructuración de ItemListContainner (HomeItemListContainer y page SearchItemListContainer)
- Componente SearchForm
- Componente PictureHeader
- SearchesContext
- Page Error404
- Componente ScrollToTop
- Componente ButtonScroll
- CartContext
- Componente CartWidget
- Componente Cart (CartDetail y EmptyCart)
- Page MyAccount y Register
- UserContext
- Page Checkout
- Componente UserStuffContainer
- Componentes Modales (CartModal, LoaderModal, OrderModal, SummaryorderModal, TermsModal y UserModal )
- Hooks personalizados
- React.memo

### Estructura de archivos

Luego de crear la App con **React-Create-App**, se procedió a "limpiar" tanto la carpeta `public` como la carpeta `src` de los archivos iniciales de ejemplo que provee la app. Se eliminaron archivos innecesarios y modificaron el contenido de otros, adaptándolos a mi proyecto.

Salvo las imágenes en cantidad (para poder realizar rutas dinámicas de manera más simple) y archivos json para simular peticiones fetch, que se colocaron en la carpeta `public`, el resto de los archivos del proyecto se ubicaron el la carpeta `src`. En la carpeta public, también se ubicó el archivo `_redirects` que sirve para posibilitar el redireccionamiento a la home page desde el servidor (en mi caso voy generando deploys en **Netlify** a medida que voy avanzando en el proyecto) cuando se piden otras rutas que se generaron con el uso de **React-Router**.

La carpeta `src` se compone de otras subcarpetas para organizar todos los archivos del proyecto:

- `assets`: Dentro de ella se encuentran (en otras subcarpetas), los archivos de imágenes y auxiliares de scss
- `components`: Ubico todos los componentes de la app, excepto los que son considerados como "pages", que son los componentes contenedores de cada "página" renderizada por el ruteo.

  Cada componente posee su propia carpeta, y dentro de la misma se ubica su archivo JSX (`index.jsx`) junto con el SCSS (`NombreDelComponente.scss`) en caso de tenerlo

- `hooks`: Contiene mis hooks personalizados

- `pages`: Como mencioné anteriormente, aquí pongo los componentes contenedores encargados de renderizar y manejar el estado de las "paginas" ruteadas

- `utils`: Aquí coloco archivos js que sirven como utilidades para el proyecto y luego son llamados por el componente que los requiere. Constantes, Funciones, etc.

### Asincronía y peticiones **Firebase** (**Firestore, Storage y Authentication**)

Finalmente, las promesas de los async mock iniciales fueron reemplazadas por peticiones reales.

- Para obtener y mostrar en “home” el valor del dólar oficial, se hace un fetch a la API de **dolarsi.com**

#### Firestore (Colecciones: items, categories, orders, users, subscriptions)

- Respecto a las peticiones de los productos, me encontraba en la disyuntiva entre traer todos los productos al acceder a la App o ir trayendo los mismos de acuerdo a lo que el usuario vaya necesitando. **Firestore** cuenta como lecturas cada elemento consultado de la BD y no como a la petición en sí, por lo que si en una petición leo todos mis productos, contabiliza tantas lecturas como productos tenga en mi BD. Finalmente, y luego de ver como **Firestore** maneja los límites de pago y conteo de lecturas, adopte una opción mixta, que me pareció una buena solución, frente a las ventajas que tiene cada planteo.

  No me terminaba de convencer la idea de traer SIEMPRE todo al entrar en el sitio, ya que si por ejemplo un usuario guardó en favoritos el link a un determinado producto, debería traer todo mi catálogo en lugar de 1 solo producto. Así mismo con las categorías, en donde si un usuario va por un determinado rubro, sería más optimo traer solo los productos contenidos en el mismo.

  Pero lo anterior tiene la contra que si el usuario se pone a navegar de un lado para el otro repitiendo “búsquedas” (es decir, pasando varias veces por una categoría a otra), se realizan llamados innecesarios a la base de datos.

  En base a todo lo anterior opte por mantener el llamado parcial a la BD (no traer todo al inicio), e ir guardando en una especie de cache manejado por el contexto `SearchesContext` los **grupos de productos** que ya fueron consultados. Así si accedo a la categoría “bicicletas” y luego navego a otra parte para luego volver a pasar por bicicletas, no se realizan 2 peticiones. Sólo se hace la primera vez y luego se maneja con el listado correspondiente guardado en un estado del contexto. \_**Nota:**\_Como **Firestore** no dispone actualmente de búsqueda por texto y además por no generar un plan de pago que sería necesario para utilizar una herramienta de terceros, generó una simulación de esta búsqueda, trayendo todos los productos y luego buscando el texto de manera local. Debido a lo anterior, como ya tengo todos los productos, también considero esta opción a la hora de saber si generar o no una petición a nuestra BD. En caso de haber realizado antes una búsqueda, ya no hago peticiones al acceder a nuevas búsquedas, categorías o home.

  Para finalizar el tema referente a las peticiones de productos, lo que si me parece mejor dejar, son las peticiones que se generan al consultar individualmente un producto, ya que por un lado representa solo el pedido de 1 elemento y por otro me parece muy útil que la información se encuentre totalmente actualizada en ese momento, ya que es la que dará origen a componer nuestro carrito. Igualmente, antes de generarse la orden y efectivizar el pago, se rechequea el stock de cada producto.

- Petición de categorías a la colección `categories` de nuestra base de datos. Con ellas se genra dinámicamente el menu del navbar y sus respectivos links a las distintas categorías

- A la hora de recuperar un carrito guardado en el localStorage por el usuario, se hace una petición a nuestra base de datos con los id de los productos presentes en el carrito (con un máximo de 10 diferentes que es lo que permite Firestore en una consulta)

- Como primer paso luego de confirmar el checkout, se llama a la BD con los productos del carrito para validar su stock y dar diferentes resultados y mensajes en base a la respuesta. Si el stock es el correcto, se procede a actualizar el stock de la BD, restando las cantidades compradas.

  Luego hice una `Promise` con la simulación de una validación de pago. También se puede rechazar para verificar el resultado en ese caso.

  Finalmente si todo sucede correctamente, se procede a guardar en la colección `orders` de Firestore, el detalle de la orden generada con todos los valores útiles para una posterior consulta. También se guardan los datos de referencia de esta orden en una sub-colección dentro de la colección `users` (`users\{userId}\orders`) . Esta sub-colección se encuentra dentro de un documento con el **ID del usuario** que sólo él a través del manejo de reglas, puede leer y escribir.

- Dentro del detalle del producto, es posible setear el estado de favorito. Es decir, añadirlo o quitarlo según sea su estado previo. Para esto se realizan peticiones a la colección `users\{userId}\favs` de Firestore.

- El usuario puede ingresas a "Mi Cuenta" y realizar la petición a **Firestore** de sus órdenes y sus favoritos. Se detalla mejor en la sección **MyAccount**

- Desde el **footer** se puede acceder al formulario para registrarse al newsletter. Al aceptar suscribirse, se realiza una conexión con la BD en donde primero se verifica si el email, ya existe y alerta de la situación. De no existir, lo crea dentro de la colección `subscriptions` y muestra un mensaje de éxito al usuario. si algo sale mal también se muestra un mensaje correspondiente.

#### Authentication

- En las Pages **MyAccount** y **Register** se hace una comunicación con Firebase para registrar un nuevo usuario o iniciar sesión o salir de la misma con uno previamente creado.

#### Storage

Todas las imágenes del catálogo de productos fueron subidas al **Storage** de Firebase.

Debido a que existe una demora apreciable en cargar dichas imágenes, generé una funcionalidad de loader que extraje en un componente `ImgWidthLoader` donde se maneja un estado junto a la escucha del evento “load” para hacer la transición entre la imagen de loading y la del producto.

También para una mejor UX, hago la precarga de este loader en un `div` individual del index.html, así siempre están disponibles para cuando llegue su uso (ya que puede ser que el usuario acceda directamente a una page sin pasar antes por la carga), evitando saltos en la interfaz.

En todos los casos anteriores, se realiza un manejo de los errores dando lugar a diferentes mensajes al usuario.

### Proceso post confirmación del checkout

A fin de simular un proceso más completo y probar las distintas herramientas que fui incorporando, me planteé **Simular un procedimiento de validación para el checkout**. Opté por esta opción frente a incorporar **Mercado Pago**, ya que quería tener el control sobre el total del proceso, incluyendo simular aprobar o no el pago y sus correspondientes acciones “inmediatas” en consecuencia. Si bien en la práctica real se realiza de manera diferente, me pareció un camino válido a fin de hacer una simulación con las herramientas que cuento actualmente y plantear distintos escenarios para poder utilizar distintos caminos y herramientas.

El esquema es el siguiente:

- Una vez el usuario completa y acepta el checkout, lo que primero se realiza es una validación de stock con la base de datos. Si algún producto actualmente está con stock = 0, se quita del carrito y se notifica. En caso de que alguno, tenga stock > 0, pero insuficiente para la selección del usuario, se notifica y lleva al carrito para que adecue su cantidad o lo elimine. Aparecen notificaciones indicando esto y hasta no proceder, no se permite volver al checkout.
- Si el stock se valida correctamente, se procede a descontar de **Firestore** esas cantidades compradas, de los respectivos stock
- Luego se pasa a una situación de validación de pago simulado (Dejé comentado un posible rechazo para ver el resultado en este caso). En caso de rechazo, se notifica y se vuelve a conectar con Firestore para devolver al stock las cantidades previamente “reservadas”. Esto lo hago así para evitar la situación de sin haber descontado las cantidades, proceder al pago y luego del mismo (por otra compra en ese momento), no contar con el stock de la mercadería. Debiendo comunicarle esta situación embarazosa al cliente. De la manera que propongo es como realizar una reserva de stock, y si no se concreta correctamente el pago, vuelve a estar disponible para futuros compradores. He probado compras casi simultaneas en donde compro a la vez lo mismo con 2 clientes con 1 segundo de desfasaje y mientras el primero esta en proceso de validación aún, alerta al segundo que el producto ya no esta disponible y cancela el inicio del pago de este cliente. Obviamente en un caso real deberían hacerse otras operaciones y validaciones extras, pero acá pretendo hacer una simulación sencilla con los modestos conocimientos que tengo.
- En caso de aprobarse el pago, se procede a guardar la orden la colección `orders` en **Firestore** con todos los datos de la compra. También a continuación, se guarda una referencia de ella en la colección `users` dentro de un documento con el Id del usuario que solo él puede leer y modificar. En este paso también deje comentados distintos casos para simular errores. En cada uno se notifica al cliente debidamente. Si no se pudiera generar la orden, igualmente el stock ya fue reservado luego de verificarse el pago, así que no se corre el riesgo de sobrevenderlo, aunque se deberá manejar la situación personalizadamente con el cliente. Por último, se muestra un mensaje con el id de la orden generada.

Toda esta lógica la extraje en un **hook personalizado** llamado `useConfirmOrder` y como dije, dejé comentadas varias líneas de código para simular situaciones de rechazo o errores.

### Componente NavBar

Esta maquetado con **React-Bootstrap** y presenta la siguiente funcionalidad:

- Logo de la marca: al clickear en el, navega a home.
- Buscador: Permite realizar la búsqueda de productos por su marca o descripción.
- Mi cuenta: Para permitir el logueo del usuario.
- CartWidget: Muestra la cantidad de elementos del carrito y navega al carrito de compras
- Barra de categorías: Se genera dinámicamente en base a la respuesta de una petición a nuestra base de datos. Esta lógica se extrajo en el `useCategories`. Si bien se utiliza un componente de React-Bootstrap para representar cada link, mediante la prop `as={NavLink}`, se le dice que haga uso del componente **NavLink** de **React-Router** para su representación.

### Componente BrandBanner

Sirve para representar el banner de marcas de la home page. Toma por props un array de objetos con los datos de cada ítem de marca (dirección web del sitio de la marca, imagen y nombre) y luego los mapea generando el banner mencionado.

### Componente Itemcount

- Decidí poner un input controlado por React para tener un mejor manejo de la situación y validaciones en tiempo real.
- Me gusta que el usuario pueda poner la cantidad a mano (por si es una cantidad grande en algún caso) y no solo con los botones + y -, pero eso me lleva a hacer unas validaciones extra.

#### Valor a mano

- Al introducir a mano los valores, se genera una validación mediante el evento onchange y mediante un testeo con una expresión regular, se habilita solo a poner dígitos (Nada de letras, espacios, puntos, etc)
- Si no hay ningún valor válido (ejemplo al borrar todo) aparece un mensaje alertando eso (mensaje tipo warning)
- Si pongo un número mayor al stock disponible, también me lo avisa por un mensaje (tipo danger)
- En ambas situaciones anteriores, se deshabilita el botón de agregar al carrito (disabled) y también se deshabilita el llamado al callback onAdd.

#### Valor por medio de botones

- Obviamente se restringe el rango de operación entre 1 y el valor del stock
- Si al llegar al valor del stock se presiona +, aparece un mensaje (tipo warning) que dura 3 segundos (mediante useEffect con un callback de limpieza del temporizador) alertando que no se puede incrementar la cantidad
- Si puse a mano un valor por encima del stock y presiono + ó -, se setea la cantidad al valor del stock
- Si borré la cantidad y presiono + ó -, se setea el valor a 1

#### Agregando al carrito

- Al presionar el botón **“Agregar al carrito”**, aparece un mensaje de verificación indicando la cantidad que se seleccionó para añadirse al mismo
- Desaparece el componente ItemCount y en su lugar aparece un botón de **“Finalizar compra”** que linkea a la page del carrito de compras (/cart) junto con otro botón **“Agregar más”** que vuelve al estado inicial de selección.

Por último, también puse una validación que no muestre los controles si el stock es cero. Sólo alerta que no hay disponible y deshabilita el botón

### Componente InfoMessage

Es llamado por ItemCount y muestra los mensajes emergentes relacionados a problemas en la introducción de la cantidad a agregar al carrito. Toma por props el mensaje, el estilo de dicho mensaje y el tipo de animación a realizar.

### Componente Item

Toma por props la información del producto que representa.

Como se mencionó en la parte de asincronía, dentro de este componente se simula mediante un efecto la carga en tiempo diferido aleatorio de la imagen de cada card.

Se hace uso de varios "conditional renders" para darle diferentes estilos y mostrar diferente contenido según el producto posea descuento o no tenga stock disponible.

Se hace uso de `useHistory()` para pushear la ruta asociada al detalle de producto correspondiente al clickear sobre esta. Esta función también se setea con un condiconal, dependiendo si el producto tiene stock disponible

### Componente ItemListContainer

Es un componente contenedor que se encarga de manejar la lógica de estado asociada a mostrar determinados productos.

En su montaje se encarga mediante un efecto, de hacer la petición de los productos correspondientes a la categoría o ruta solicitada. inicialmente esta petición se simula con una promesa como se menciona en la parte de asincronía y posteriormente se reemplazará por un llamado a nuestra base de datos en **Firebase**.

Se hace uso de `useParams()` de **react-router** para obtener por parámetro la categoría que debe solicitar por petición y por ende luego pasar por props a sus hijos para representar la información correspondiente.

Es importante destacar que esta categoría, se pasa como dependencia [] del `useEffect` para poder volver a realizar esta petición si hay un cambio de categoría asociada a un cambio de ruta, permaneciendo el componente montado.

Este componente también maneja el estado de `isLoading` junto con `isError`, para mediante conditional render, administrar entre las vistas del catálogo de productos, un loader y un posible mensaje de error en caso de no encontrar la categoría o producirse un error de comunicación con la base de datos.`

### Componente Loader

Sirve para mostrar una animación durante el transcurso de las peticiones hasta su respuesta.

Toma por props el mensaje a renderizar sobre el fondo animado del loader.

### Componente InfoDollar

Se encarga de mostrar la cotización del dólar oficial que se obtiene como respuesta de una petición fetch a la api **dolarsi.com**. La lógica de estado y esta petición fueron extraídas en un hook personalizado, que es llamado en el componente principal App, con el motivo de ejecutar esa petición solo una vez cuando la página se carga por primera vez, y no cada vez que vuelva a navegar a una página en donde dicho componente se monte.

Seguramente utilice estos datos del dólar más adelante para mostrar, por ejemplo, el total de la compra alternativamente en esta moneda.

### Componente ItemDetail

Toma por props los datos del producto a representar.

Mediante "conditional render" se muestra y dan estilos a diferentes elementos, según los valores de las propiedades del objeto producto.

Pasa las props al componente ItemCount en base a los datos del producto.

Este componente consume el CartContext y determina si el producto que representa se encuentra ya en el carrito. De ser así, muestra la información de la cantidad del producto que ya se encuentra seleccionada en el carrito. También determina del context si la cantidad de productos **distintos** es superior a 10 y alerta con un modal de la situación, evitando incorporar nuevos productos diferentes a los que ya se encuentran. Este límite se debe a una restricción en un tipo de consulta que se lleva a cabo a la base de datos cuando el usuario recupera un carrito previamente guardado por él. Para evitar exceder este límite impuesto por **Firestore** en ese tipo de consultas por array de valores, es que se impone este límite, que es mucho más que lógico para una bicicletería y de compras minoristas online. Igualmente, si se quiere comparar más allá de este límite de 10 productos **diferentes**, es posible separar la compra en diferentes órdenes.

Aparte de lo anterior, setea el valor disponible teniendo en cuanta el stock del producto y restando lo que ya esta en el carrito. De esta manera, pasando por props al ItemCount, se setea la lógica de éste ultimo con este nuevo valor límite. Evitando dar la opción al usuario de “pasarse” de la cantidad disponible (que igualmente valida la función addTocart).

Primeramente, esta función a través de su valor de retorno negativo, se encargaba de disparar un mensaje en el ItemDetail avisando del rechazo ante la situación de pretender pasarse del valor de stock. Pero luego consideré que no era optimo permitir valores mayores al rango determinado por el stock menos lo que ya fue elegido, por lo que use el consumo del contexto del carrito como mencioné anteriormente y retiré esa lógica inicial del componente, ya que no era necesaria con esta implementación.

### Page Home y Category

Se encargan de mostrar la landing page y la page correspondiente a la categoría seleccionada o ruteada respectivamente.

Ambas, aparte de mostrar componentes específicos al layout de cada vista, llaman al componente contenedor ItemListContainer, que se encarga como se vio anteriormente de manejar la lógica de representación de los productos correspondientes.

### Page ItemDetailContainer

Es un componente contenedor encargado de administrar la lógica de estado relacionada al producto del que se quiere mostrar su detalle.

Se encarga de hacer la petición de los datos de ese producto en base a los parámetros de _id_ obtenidos de la ruta asociada mediante el uso de `useParams()` de **react-router**

Como sucedía con el ItemListContainer, también maneja el estado de `isLoading` junto con `isError`, para mediante conditional render, administrar entre las vistas del catálogo de productos, un loader y un posible mensaje de error en caso de no encontrar el producto o producirse un error de comunicación con la base de datos.

### Reestructuración de ItemListContainner (HomeItemListContainer y page SearchItemListContainer)

Al avanzar en el proyecto me di cuenta que el componente ItemListContainer estaba demasiado sencillo en cuanto a sus funcionalidades.

Pretendía poder ordenar los productos mediante distintos criterios, filtrar los mismos utilizando diversos tipos de filtros y también poder realizar búsquedas por palabras, por lo que debía incorporar toda esta nueva lógica al componente.

Comó gran parte de esta lógica es común ya sea que se realice una consulta por **categoría** (`/category/:catId`) o por **búsqueda por palabras** (`/search?q=...`), era interesante desarrollar la misma pensando en ambas situaciones. Utilicé efectos con distintas dependencias y varios “conditional render” para poder darle las funcionalidades y vistas ligeramente diferentes ya se que se trate de una u otra ruta anteriormente mencionada.

También se extrajo la lógica relacionada a la petición de productos y la relacionada al filtrado de los mismos en dos **hooks personalizados** para aliviar de código al propio componente y poder reutilizar a futuro la misma en donde sea oportuno.``

Como en **Home** (`/`) no se requería ni de toda esta lógica más compleja ni tampoco de la vista asociada (columna de filtros, barra de ordenamiento, etc) que también es mucho más elaborada, opté por mantener el original y simplemente lo renombré a **HomeItemListContainer** para esta “ruta” y crear el **SearchItemListContainer** con toda la funcionalidad y vista mencionada anteriormente, que comparten las rutas a **Categorías** (`/category/:catId`) y **Búsqueda por palabras** (`/search?q=...`)

#### Función de búsqueda

Creé una función para asistir un poco más al usuario en la búsqueda que realice. Hice uso de distintas expresiones regulares para ello. En primer lugar, reemplazo la frase por su equivalente en minúsculas y sin acentos o caracteres similares.

Luego aíslo la primera palabra de la búsqueda y de ser mayor o igual a 3 letras, realizo otras operaciones. Si es una palabra singular (no terminada en s), genero sus variantes plurales terminadas en "s" o "es". De ser una palabra singular terminada en "es", genero las variantes de la misma en singular (quitando la "s" o la "es"). Por último, si es plural terminada solo en "s", genero también su variante sin la "s".

Todo lo anterior es para hacer válida la búsqueda de palabras plurales aunque en la base de datos figuren de manera singular, y viceversa (sobre todo en oraciones, porque una palabra sola no tendría ese problema al quedar contenida). De esta manera si en la **BD** figura "bicicleta" y se ingresa "bicicletas", se obtendría la coincidencia. Igual con "pantalón" e ingresar "pantalones" (sin acento y plural). Otro ejemplo sería que en la **BD** figure "cascos de ruta" y se ingrese "casco de ruta" (considera la variante plural también)

Finalmente, la búsqueda se realiza primeramente en el título del producto y si no hay coincidencia pasa a la descripción del mismo.

#### SortBar

A la izquierda, contiene la cantidad de productos coincidentes con el total de filtros aplicados sobre la "consulta principal".

A la derecha se ubica el componente SortSelector que nos brinda un conjunto de criterios diferentes para realizar el ordenamiento de los productos mostrados resultado de la combinación de filtros elegida.

Existen 7 opciones de ordenamiento de los productos. Por defecto la página inicia con la opción “Destacados primero” donde ubica primero a los productos destacados ordenados por marca y descripción, luego los no destacados con el mismo orden. Las otras opciones son orden alfabético A-Z o Z-A por marca y luego descripción, precio ascendente o descendente y por menor o mayor descuento.

Este ordenamiento se puede hacer en cualquier proceso del filtrado de productos

#### Filtrado de productos (Componentes PropertyListFilter, PriceRangeFilter)

Existen 5 formas de filtrar los productos:

- Por búsqueda de palabra
- Por categoría
- Por solo ofertas
- Por marcas (correspondiente a la selección Princiapl)
- Por rango de precios (correspondiente a la selección Principal)

La selección Principal (Main Selection) la compone la combinación de los tres primeros filtros, es decir: búsqueda, categoría y solo ofertas. Es en base a esta selección Principal que se genera un array de productos mainSelection.

Este array es el punto de partida para los otros dos filtros: marcas y rango precios. Es decir, estos dos filtros trabajan siempre sobre esa selección Principal, pero no la modifican, solo agregan un filtrado extra a partir de ella. Por eso los extremos del rango de precio se mantienen inalterados siempre que no se toque ninguno de los tres primeros filtros.
Lo mismo con el listado de marcas que se mantiene junto a las cantidades de productos de cada marca.

Es decir, ambas cosas se mantienen porque la selección Principal es la misma, pero si se toca cualquiera de los 3 filtros que la componen, se resetean los valores de los filtros de marcas y rango de precios, tomando los valores correspondientes a la nueva selección Principal escogida por el usuario.

Un ejemplo que muestra el funcionamiento de lo anterior es el siguiente:

Supongamos elegir una determinada palabra, dentro de una determinada categoría y luego si quiero ver solo las ofertas o no. Bien, con estos tres filtros ya definimos nuestra selección Principal. Ahora, si vemos nuestro listado de marcas o nuestra escala de precios, comprobamos que se corresponden a esta selección y van a permanecer inalteradas siempre y cuando no cambiemos la misma al cambiar cualquiera de los 3 filtros que la componen.

Por eso por ejemplo si tenía 5 marcas con sus respectivas cantidades de productos y realizo un cambio en el rango de precios, este listado de marcas permanece igual, aunque dentro de ese precio no existan determinadas marcas, porque recordemos que se corresponde a la selección Principal que permanece inalterada. Obviamente, si selecciono una marca que no tiene precios en ese rango, va a mostrar el mensaje de que no se encontraron productos con nuestros criterios de búsqueda.

Conclusión, los productos que finalmente se exhiben luego de interactuar con estos filtros son el resultado de la combinación de todos ellos (los 5).

Búsqueda por palabra: Se mencionó anteriormente con detalle anteriormente.

Filtro por categoría: Permite circunscribir los productos entre las categorías existentes o todas.

Este también tiene interacción con la carga de la página o cambio ruta, es decir, que si se accede a la página a través de una url con la ruta correspondiente a una determinada categoría, se pasa a esa selección.
Para saber si tenemos activa alguna selección del filtro categorías, el logo a la derecha del botón pasa del estado OFF al ON si hay categorías seleccionadas.

Filtro por solo ofertas: Solo muestra los productos que son ofertas al activar el checkbox.

Filtrado por marcas: Muestra un listado con las marcas que contiene la selección Principal como también la cantidad de productos que las componen.

Se pueden seleccionar una o varias marcas y el filtro mostrará los productos de la selección Principal que contengan dichas marcas y se encuentren dentro del rango de precios elegido.
Se puede volver a ingresar y cambiar dicha selección a gusto.
Importante: Esta selección se resetea automáticamente al cambiar cualquiera de los 3 primeros filtros enumerados.

Para saber si tenemos activa alguna selección del filtro marcas el logo a la derecha del botón pasa del estado OFF al ON si hay marcas seleccionadas.

Filtro por rango de precio: Permite elegir el valor del producto desde un precio mínimo a uno máximo.

Respecto a la escala quiero decir dos cosas:

- Los valores mín y máx se setean de acuerdo a la selección Principal. Se recorre el array de productos que la componen y se sacan los valores extremos de los precios
- Como puede haber mucha diferencia entre los extremos de precio, generé una escala exponencial, en donde crece más suavemente al comienzo para permitir más fácilmente precios del rango inferior y luego crece más rápido a medida que se acerca al extremo máximo.

Realicé mediante funciones asociadas a los eventos del control del rango de precios la verificación para que no permita la inconsistencia de que el precio mín se elija por encima del máximo. En caso de suceder esto, inmediatamente comienza a arrastrar al indicador de rango "hermano", los indicadores se acomodan automáticamente al valor máximo permitido para el cruce (min = max).

También generé eventos asociados al mouse y al teclado para estos input, así se pueden manejar también mediante Tab y las flechas del teclado, logrando un ajuste fino.

Por último, estos filtros en versión mobile, se ven contraídos y si se apaísa el dispositivo dando origen a la columna izquierda de filtros, vuelven a ser visibles.
En el caso del celular vertical, inicialmente aparece contraído y tocando sobre la leyenda de filtros, se despliega completamente haciéndose visible.

Todos los filtros pueden limpiarse mediante el botón al final de la columna respectiva

**_Nota: Todas las funciones asociadas al filtrado y ordenado de productos, está extraidas en `productsFilter.js` dentro de la carpeta `utils`_**

### Componente SearchForm

Se encuentra en el NavBar y se encarga mediante el evento `onSubmit` y el hook `useHistory` de **React Router** de navegar a una ruta generada dinámicamente en función de la palabra o frase buscada. se hace uso de los "query params" de la url

### Componente PictureHeader

Es un componente presentacional encargado de mostrar una imagen a modo de "header" para cada página de categoría (`/category/:catId`) junto a la de búsqueda (`/search?=q=...`).

Se le pasa por props la información de manera condicional. Si estamos en una categoría, pasamos el título de la misma y la clase **CSS** asociada, de lo contrario pasamos el título de "resultados", junto a la clase que la representa.

De esta manera, logramos tener distintas imágenes y titulares para cada caso con sus respectivas reglas de estilos CSS.

### SearchesContext

Sirve para mantener el estado de las consultas del usuario y evitar peticiones innecesarias a nuestra base de dartos. Generé un componente **SearchesContextProvider** que hace el papel de un provider personalizado para el contexto `SearchesContext`.

En este componente se incluye la lógica para ir almacenando las consultas que el usuario va realizando. Esta relacionado a lo explicado en la sección de mi decisión en cuanto a cómo manejar las peticiones a la base de datos. Se guarda en un estado (que luego pasa como contexto) los productos que son devueltos cuando el usuario consulta una categoría o la página principal (home). También guarda todos los productos en el caso de una consulta por búsqueda de palabra, ya que se traen todos para realizarla como se explicó más arriba.

Cada vez que el usuario hace una consulta navegando a la sección correspondiente, se verifica si ya esta guardada esa consulta. De ser así, se devuelve ese resultado, evitándose una nueva petición y lográndose un balance adecuando de lecturas de la BD.

### Page Error404

Se encarga de mostrar el característico _error 404_ si la ruta navegada no coincide con una válida. Proporcina un botón para navegar a Home.

### Componente ScrollToTop

Es un componente construido en base a la documentación oficial de **React Router** y posee un efecto que se dispara con cada cambio del `pathname` obtenido del hook `useLocation()`

### Componente ButtonScroll

Es un botón con posición `fixed` que aparece en la parte inferior derecha de la pantalla. Posee estado para controlar el despliegue u ocultamiento de sus opciones al apretarlo y mediante eventos, lleva a la parte superior o inferior del documento. Se utiliza el método del objeto `window` llamado `scrollTo()` al igual que en el componente **ScrollTop**, solo que esta vez en ambas direcciones del eje vertical del documento.

### CartContext

Sirve para mantener el estado de la compra del usuario. Generé un componente **CartContextProvider** que hace el papel de un provider personalizado para el contexto `CartContext`.

Incorpora distintas funciones que permiten consultar un ítem del carrito, verificar si determinado producto está en el carrito, agregar, remover y actualizar productos (su cantidad), vaciar el carrito y guardar/obtener el mismo desde el **storage**.

Dentro de la función addToCart, verifica si el producto se encuentra ya en el carrito. En caso de no encontrarse, lo agrega directamente y devuelve el valor de la cantidad agregada. Esta cantidad es posteriormente utilizada dentro del ItemDetail para mediante renderizado condicional mostrar un mensaje consecuente.

En caso de que el producto ya exista, hace una validación de si la cantidad existente más la que se pretende agregar es menor o igual al stock del producto. En caso de serlo, agrega esa cantidad enviada por el usuario a la ya existente (evitándose duplicar el producto) y retorna la cantidad agregada, que el ItemDetail maneja idénticamente al caso anterior. De lo contrario, no agrega nada y devuelve el valor negativo por el que se superaría el stock en caso de agregarse la cantidad pretendida.

Las funcionalidades `checkInRange` y `checkCartLength` están vinculadas al guardado del carrito por parte del usuario de manera permanente. Son útiles para limitar el tamaño del carrito a 10 productos **diferentes** (no limita la cantidad de unidades por producto) y para verificar que una vez recuperado un carrito con cantidades por encima de los valores actuales de stock, se ajusten sus valores dentro de la disponibilidad actual para permitir continuar con el checkout. . El límite de 10 productos **diferentes**, se debe a la máxima capacidad de consulta simultanea por ids a la base de datos utilizada en el proyecto, **Firestore**. Esta posee un método de consulta para traer todos los documentos cuyos campos coincidan con los valores de un array, pero este array no puede superar la longitud de 10.

Finalmente posee una función que se ejecuta por única vez en el `useState` para determinar su valor inicial. Si se encuentra en el `sessionStorage` una variable "myMammothCart" con un arreglo de productos y cantidades, setea el valor inicial con el de esta variable. Caso contrario, se seta en un arreglo vacío `[]`.

### Componente CartWidget

Se subscribe al contexto del carrito (CartContext) para poder leer la cantidad total de ítems que se encuentran a cada momento con cada operación del usuario.

Hace uso de un **hook personalizado** `usePrevious` junto a `useState` y `useEffect` para desarrollar la lógica vinculada a la animación del mismo. Con el hook usePrevious (que contiene el uso del hook `useRef`), se mantiene almacenado el valor anterior del contador, sin que ese seteo conlleve a una nueva renderización como lo haría el uso de un estado para almacenarlo.

Ese valor previo del contador se compara con el actual en un efecto, y dependiendo del resultado, se setea por un determinado tiempo una animación de entrada (si el contador aumenta) o una de salida (si el contador disminuye). También el valor a mostrase es almacenado en un estado separado, ya que para que la animación sea correcta, es necesario actualizarlo al momento en la animación de entrada, o luego de finalizada la animación en el caso de tratarse de la de salida. Los temporizadores son limpiados en el retorno del useEffect.

### Componente Cart

Se subscribe al contexto del carrito (CartContext) y extrae del mismo numerosos datos (valores y métodos) a fin de representar el contenido del carrito con toda la selección del usuario. En caso de no haber ningún ítem aún, se muestra el componente **EmptyCart**. Éste informa de la situación y se va a encargar de chequear si se encuentra algún carrito guardado por el usuario.

#### Componente CartDetail

Contiene otros componentes anidados para dividir mejor la UI y la información se muestra por el paso de las props a sus componentes hijos. Props que recibe del componente contenedor Cart.

En la parte superior contiene un botón para vaciar el carrito. Luego se muestra una tabla con el detalle de toda la selección del usuario. En esta tabla aparece:

- Botón para eliminar por completo el producto del carrito
- La imagen del producto que al clickear en ella lleva al detalle del mismo por si se quiere consultar información extra al respecto.
- El título del producto
- El componente **ItemCount**, que permite cambiar hacia arriba o abajo la cantidad ya seleccionada. Este componente cuenta con toda la lógica de validaciones que ya se mencionó y ahora añade una nueva. Si al pretender cambiar la cantidad desde el carrito, dicha cantidad no coincide con la que originalmente fue establecida, se habilita un botón de actualizar. Al clickear sobre este botón, se actualiza dicho producto del carrito y se recalculan los valores de subtotales y total del importe. Lo hago así para evitar que mientras se “va” hacia la nueva cantidad pretendida, no existan renderizados y cálculos innecesarios hasta llegar al momento en que el usuario acepta ese cambio.
- Precio subtotal por producto
- Precio total de la selección
- Botón guardar carrito (se hablará más adelante)
- Botón confirmar mi orden

#### Componente EmptyCart

Como se menciono antes, este componente informa de que el carrito se encuentra vacío y permite la navegación a la “Home Page” a través de un botón en su parte inferior.
También se encarga de chequear en su montaje, si hay algún carrito guardado por el usuario manualmente, y de ser así, muestra un mensaje junto a un botón que permite proceder a la carga del mismo

#### Guardado del carrito

A lo largo de la operación normal de compra el carrito se guarda automáticamente en el `sessionStorage`, ya que resulta más conveniente para este modo automático.

Aparte de este guardado por defecto, se da la posibilidad al usuario de guardar permanentemente su carrito para ser cargado más tarde cuando lo considere oportuno. Para esto se hace uso del `localStorage`

Esta tarea se lleva a cabo entre los componentes Cart, CartDetail y EmpyCart junto al CartContext. Cuando se clickea en guardar carrito, se llama a la función del context para almacenar el mismo en el localStorage. Luego al entrar en el Emptycart, se chequea si hay uno guardado y se notifica de ser cierto, presentando un botón para tal fin.

Cuando se acepta recuperar un carrito, se procede a una validación del mismo con la base de datos recorriendo cada producto del carrito guardado. Se traen los productos a fin de verificar si aún siguen siendo válidos. De ser así, se toman los precios vigentes y luego se analiza su stock vs la cantidad que se había seleccionado al momento de guardarlo.

Se generan distintas situaciones posibles que son informadas a través de un **Modal** de **React Bootstrap**:

- En caso de que todos posean stock mayor ha seleccionado, se cargan directamente
- En caso de que alguno de ellos posea un stock por debajo de la selección, se notifica y se pide que se actualice ese valor a uno coherente con la disponibilidad. Este producto se muestra con una alerta del ItemCount, que hasta que no se solucione no permite avanzar con el checkout, desapareciendo el botón del mismo y dando lugar a un warning. Tampoco se muestra el precio total, ni el del item fuera de rango, ya que no sería correcto.
- En caso en que alguno ya no posea stock, se elimina directamente del carrito y se notifica de esto
- Casos donde suceden las dos situaciones más arriba mencionadas, son informados con un mensaje diferente a fin que el usuario sepa de los dos eventos
- Casos en que ningún ítem quede disponible de los que tenía seleccionados al guardar, también es notificado con un mensaje personalizado

#### Page MyAccount y Register

Mediante el uso de formularios de componentes controlados, y conectando la información de los mismos con **Firebase Auth**, se procede a registrar a un usuario o iniciar/salir sesión del mismo. En caso de algún tipo de error, se muestra el mismo que retorna firebase al usuario. Estos formularios poseen las validaciones respectivas, y sus correspondientes mensajes en caso de no cumplir con alguna de ellas.

Los datos del usuario logueado son guardados en el contexto UserContext para poder acceder a él desde distintos lugares y generar diversas funcionalidades.

Por ejemplo, en el botón “mi cuenta”, se produce el cambio del ícono, por un avatar con la primera inicial de nombre del usuario logueado. También se producen efectos de cambio de color de background en el componente Myacccount, y se muestran mensajes e información personalizada para ese usuario.

También, se evita pasar al checkout si el usuario no está registrado y ha iniciado sesión. Para validar mejor esta situación ante el posible ingreso directo a dicha página (por ejemplo, guardada en favoritos), generé el componente `PrivateRoute` asociado al `Route` de **React-router-dom**. En él verifico si el usuario se encuentra logueado y lo redirijo a la page MyAccount, en donde de ser el caso válido, va a poder ir directo al checkout mediante el link de un mensaje personalizado. También en la page Checkout, realizo una validación extra en donde se redirige al componente Cart en caso de que no hayan productos para proceder a un checkout o los mismos estén pendientes de actualizarse (por la carga de un carrito que se encuentra fuera de rango con la disponibilidad actual).

### UserContext

Sirve para mantener el estado de autenticación del usuario y manejar su historial de favoritos y órdenes. Generé un componente **UserContextProvider** que hace el papel de un provider personalizado para el contexto `UserContext`.

Este componente hace uso de tres hooks personalizados `useFirebaseAuth`, `useUserOrders` y `useUserFavs` que de manera independiente contienen la lógica asociada al manejo del estado de autenticación, la consulta del historial de órdenes del usuario, y por último la consulta y manejo de sus productos favoritos.

#### Page Checkout

Se muestra la información previa a generar la orden de compra y efectivizarse el pago.

A la izquierda, aparece un resumen de los productos a comprar, con sus cantidades, precios e importe total. Luego de ello la opción de envío a domicilio con su respectivo costo asociado, o la opción de retiro por sucursal.

A la derecha, se encuentra un formulario que se puede dividir en 3 secciones:

- Datos personales: Donde el usuario completará con sus datos, salvo la casilla de email en donde se completa con el del usuario logueado y se deshabilita su edición. También se oculta la casilla de dirección y CP en caso que se elija retiro por sucursal.
- Selector de cuotas: Se da la opción al usuario de realizar el pago en diferente cantidad de cuotas con sus respectivos intereses y montos finales
- Datos de la tarjeta de crédito

Este formulario posee las validaciones respectivas, y sus correspondientes mensajes en caso de no cumplir con alguna de ellas.

Desde la parte inferior, se puede por optar regresar al carrito o confirmar la orden, dandose lugar al proceso de validación descripto en secciones anteriores.

### Componente UserStuffContainer

Es el encargado de mostrar información asociada a cada usuario. Existe un componente `MyAccountAlert` en donde aparte de mostrarse el nombre del usuario, se muestra según corresponda: información del estado de compra permitiendo acceder directamente al checkout, aviso de si hay un carrito guardado manualmente por el usuario y aviso si el carrito se encuentra fuera de rango y es necesario actualizarlo con la disponibilidad actual.

Por otro lado ofrece la posibilidad de listar todos los productos favoritos que fue seleccionando el usuario (componente `FavsTable`), permitiendo desde éstos acceder directamente a cada uno de ellos y de ahí poder escoger la cantidad deseada con valores actualizados del stock disponible y precio. También se permite eliminar un determinado favorito, los cuales se setean desde el detalle de cada producto.

Por último, se puede consultar el historial de compras del usuario, ordenadas por fecha de cada orden (componente `OrdersTable`). Desde cada fila de esta tabla, es posible entrar al detalle de cada una de ellas, que es exhibida en un componente modal.

### Componentes Modales (CartModal, LoaderModal, OrderModal, SummaryOrderModal, TermsModal y UserModal )

Son todos modales de **React Bootstrap** con diferentes diseños y tipo de contenido.

Todos son manejados por el hook personalizado `useSetModal` y se renderizan en un `div` fuera del `root` como suele suceder con los modales y el uso de portales.

Se hace uso de un archivo `modalMessages.js` en donde se almacenan los diferentes tipos de mensajes a presentar de acuerdo al tipo de modal. Aparecen en diferentes situaciones a lo largo del uso de la App, como puede ser mostrar mensajes relacionados al carrito de compras, generación de orden de compra, mensajes relacionados a la autenticación del usuario, términos y condiciones, detalle de las órdenes, etc.

En el caso de `SummaryOrderModal`, dentro del mismo se muestra un resumen detallado de una determinada compra del usuario que es pedida a demanda a la BD. Aparece la fecha de compra, el tipo de envío elegido, un detalle con fotos, descripción, precio y cantidades de los productos, la fecha de compra, el desglose de los subtotales y costos financieros, el plan de pago y el importe total.

### Hooks personalizados

Listado a modo de resumen ya que se mencionan en cada sección específica

- `useCategories`: Hace uso de los hooks `useState` y `useEffect`. Maneja la lógica de la petición de la categorías a la base de datos, para luego hidratar al NavBar con la data obtenida.

- `useConfirmOrder`: Hace uso de los hooks `useState` y `useRef` y de otras funciones importadas y también declaradas dentro del mismo hook. Maneja la lógica de las validaciones post checkout que se detallaron más arriba.

- `useDollar`: Hace uso de los hooks `useState` y `useEffect`. Maneja la lógica de la petición del valor del dólar a una API, para luego hidratar al componente InfoDollar con la data obtenida.

- `useFilters`: Hace uso del hook `useState` y diversas funciones contenidas en el archivo `productsFilter.js` de la carpeta `utils`. Contiene las funcionalidades para el manejo de los filtros dentro del SearchItemListContainer

- `useFirebaseAuth`: Hace uso de los hooks `useState` y `useEffect`. Se encarga de establecer una escucha para el cambio de estado del logueo del usuario mediante una funcionalidad de firebase. La situación de logueo es guardada en un estado.

- `useModal`: Hace uso del hook `useState` junto a unas funciones callback. Sirve para manejar la lógica en común a las ventanas modales.

- `usePrevious`: Hace uso de los hooks `useRef`y `useEffect`. Sirve para guardar en una referencia, una "instantánea" de un estado previo, sin la necesidad de re-renders al cambiar este valor de referencia.

- `useSearch`: Hace uso de los hooks `useState`, `useEffect`, `useParams`, `useLocation`, `useContext` y de algunas funciones contenidas en la carpeta `utils`. Contiene la lógica completa relacionada a la petición a la base de datos de los productos que son consultados. Maneja el estado de loading y de error.

- `useSetForm`: Hace uso del hook `useState`. Contiene la lógica común al manejo de formularios de componentes controlados.

- `useSubscription`: Hace uso del hook `useState`. Contiene la lógica para la consulta y posterior registro del email en la base de datos para recibir el newsletter.

- `useUserFavs`: Hace uso de los hooks `useState`, `useEffect` y de otras funciones importadas y también declaradas dentro del mismo hook. Contiene la lógica relativa al seteo de los favoritos del usuario y su sincronización con Firestore.

- `useUserOrders`: Hace uso del hook `useState`. Contiene la lógica relativa a la petición del listado de ordenes históricas del usuario almacendas en Firestore.

### React.memo

Para no sobre optimizar innecesariamente, aplique **React.memo** al componente `Item` (tarjeta de productos), que en mi App es quién puede llegar a consumir más recursos al realizarse renderizados innecesario, ya que forma parte de un listado que puede ser largo y que contiene imágenes.

Utilizo una función comparadora de las `prevProps` y `nextProps` para determinar cuando solamente debería volver a renderizarse. Probé los resultados las devTools de React y el cambio de cantidad de renderizados es muy significativo, sobre todo al ordenar y/o filtrar las mismas tarjetas por precio, marca, etc

---

## Dependencias

Aparte de las dependencias base vistas en la cursada, utilice unas pocas más que considero de valor para el desarrollo y producción.

- **Node-sass:** Considero a este preprocesador de css muy útil en cuanto a las herramientas que brinda a la hora de generar las hojas de estilos para los componentes y aplicación.

- **React-Bootstrap:** Como herramienta para el maquetado del sitio. Adopté esta opción frente al Bootstrap convencional, ya que según la documentación oficial es lo recomendado para React. Los métodos y eventos que usan jQuery se realizan imperativamente manipulando directamente el DOM. “Por el contrario, React usa actualizaciones del estado para actualizar el DOM virtual. De esta manera, React-Bootstrap proporciona una solución más confiable al incorporar la funcionalidad Bootstrap en el DOM virtual de React”.

  Simplifica notablemente la escritura y cantidad de líneas de código. Dado que **React-Bootstrap** está construido con **React JavaScript**, el estado se puede pasar dentro de los componentes de React-Bootstrap como una prop. También facilita la gestión del estado, ya que las actualizaciones se realizan utilizando el estado de React en lugar de manipular directamente el estado del DOM.
