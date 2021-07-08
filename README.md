# Mammoth Bike Store App

Este proyecto forma parte del trabajo final correspondiente al curso de React JS dictado por CoderHouse.

Se trata del desarrollo de una tienda virtual para una bicicletería (Mammoth).

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
- Componente NavBar
- Componente BrandBanner
- Promises y asincronía
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
- Page Error404
- Componente ScrollToTop
- Componente ButtonScroll
- CartContext
- Componente CartWidget
- Componente Cart (CartDetail y EmptyCart)
- Hooks personalizados

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

### Componente NavBar

Esta maquetado con **React-Bootstrap** y presenta la siguiente funcionalidad:

- Logo de la marca: al clickear en el, navega a home.
- Buscador: Permite realizar la búsqueda de productos por su marca o descripción.
- Mi cuenta: Para permitir el logueo del usuario.
- CartWidget: Muestra la cantidad de elementos del carrito y navega al carrito de compras
- Barra de categorías: Se genera dinámicamente en base a la respuesta de una petición a nuestra base de datos. Esta lógica se extrajo en el `useCategories`. Si bien se utiliza un componente de React-Bootstrap para representar cada link, mediante la prop `as={NavLink}`, se le dice que haga uso del componente **NavLink** de **React-Router** para su representación.

### Componente BrandBanner

Sirve para representar el banner de marcas de la home page. Toma por props un array de objetos con los datos de cada ítem de marca (dirección web del sitio de la marca, imagen y nombre) y luego los mapea generando el banner mencionado.

### Promises y asincronía

Utilicé 2 promesas. Una es la que pide el desafió que resuelva en 2seg los productos desde un archivo estático. La otra es para simular (dentro de cada ítem) la carga en tiempo aleatorio de las imágenes. En este caso hice un random entre 0 y 2seg.

En ambos casos utilicé loaders, que se encuentran activos mientras se realiza la petición y desaparecen luego de la respuesta.

Para el caso de la promesa principal de los productos, generé un posible manejo del error, y lo dejé preparado como para probarlo (debajo del resolve hay un reject comentado para alternar y probar). En este componente del ItemListContainer hay 3 “estados”. Los productos, el loading y el error. Entonces en base a si la respuesta es correcta o errónea, muestro el listado de productos o un mensaje de error.

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

Este componente consume el CartContext y determina si el producto que representa se encuentra ya en el carrito. De ser así, muestra la información de la cantidad del producto que ya se encuentra seleccionada en el carrito.

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

Cuando se acepta recuperar un carrito, se procede a una validación del mismo con la base de datos recorriendo cada producto del carrito guardado. Se traen los productos a fin de verificar si aún siguen siendo válidos. De ser así, se toman los precios vigentes y luego se analiza su stock vs la cantidad que se había seleccionado al momento de guardarlo. En caso de tener suficiente stock, se procede a cargarlo, de lo contrario se rechaza la carga de ese ítem. Finalmente se muestra un mensaje a través de un **Modal** de **React Bootstrap** informando si se pudieron cargar todos los productos con éxito, sólo alguno de ellos, o ninguno.

### Hooks personalizados

Listado a modo de resumen ya que se mencionan en cada sección específica

- `useCategories`: Hace uso de los hooks `useState` y `useEffect`. Maneja la lógica de la petición de la categorías a la base de datos, para luego hidratar al NavBar con la data obtenida.

- `useDollar`: Hace uso de los hooks `useState` y `useEffect`. Maneja la lógica de la petición del valor del dólar a una API, para luego hidratar al componente InfoDollar con la data obtenida.

- `useFilters`: Hace uso del hook `useState` y diversas funciones contenidas en el archivo `productsFilter.js` de la carpeta `utils`. Contiene las funcionalidades para el manejo de los filtros dentro del SearchItemListContainer

- `useSearch`: Hace uso de los hooks `useState`, `useEffect`, `useParams`, `useLocation` y de algunas funciones contenidas en la carpeta `utils`. Contiene la lógica completa relacionada a la petición a la base de datos de los productos que son consultados. Maneja el estado de loading y de error.

---

## Dependencias

Aparte de las dependencias base vistas en la cursada, utilice unas pocas más que considero de valor para el desarrollo y producción.

- **Node-sass:** Considero a este preprocesador de css muy útil en cuanto a las herramientas que brinda a la hora de generar las hojas de estilos para los componentes y aplicación.

- **React-Bootstrap:** Como herramienta para el maquetado del sitio. Adopté esta opción frente al Bootstrap convencional, ya que según la documentación oficial es lo recomendado para React. Los métodos y eventos que usan jQuery se realizan imperativamente manipulando directamente el DOM. “Por el contrario, React usa actualizaciones del estado para actualizar el DOM virtual. De esta manera, React-Bootstrap proporciona una solución más confiable al incorporar la funcionalidad Bootstrap en el DOM virtual de React”.

  Simplifica notablemente la escritura y cantidad de líneas de código. Dado que **React-Bootstrap** está construido con **React JavaScript**, el estado se puede pasar dentro de los componentes de React-Bootstrap como una prop. También facilita la gestión del estado, ya que las actualizaciones se realizan utilizando el estado de React en lugar de manipular directamente el estado del DOM.

- **React-transition-group:** Instalé esta librería con el fin de realizar animaciones de entrada y salida de componentes de manera declarativa y compatibles con la manipulación del DOM virtual de React. Es recomendada por la documentación oficial de React para realizar animaciones. Aún no he hecho uso de la misma, pero la estuve probando y seguramente la utilicé para el final del proyecto, de lo contrario, quitaré la dependencia.
