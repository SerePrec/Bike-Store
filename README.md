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

A continuación, hago un punteo de algunos temas referidos a la lógica funcional que implemente y escogí para la programación de los componentes. Siguen el orden de aparición en que se fueron planteando las entregas de los **desafíos** de la cursada

- Estructura de archivos
- Componente NavBar
- Componente BrandBanner
- Componente ItemCount
- Componente InfoMessage
- Promises y asincronía
- Componente Item
- Componente ItemListContainer
- Componente Loader
- Componente InfoDollar
- Componente ItemDetail
- Page Home y Category
- Page ItemDetailcontainer
- Page Error404

- ScrollToTop TODO: (efecto. React-router)
- ButtonScroll TODO: (estado y eventos)
- Reestructuración ItemListContainner (Home/Categor/Search) TODO:
- SearchForm TODO: (estado y evento)

### Estructura de archivos

Luego de crear la App con **React-Create-App**, se procedió a "limpiar" tanto la carpeta `public` como la carpeta `src` de los archivos iniciales de ejemplo que provee la app. Se eliminaron archivos innecesarios y modificaron el contenido de otros, adaptándolos a mi proyecto.

Salvo las imágenes en cantidad (para poder realizar rutas dinámicas de manera más simple) y archivos json para simular peticiones fetch, que se colocaron en la carpeta `public`, el resto de los archivos del proyecto se ubicaron el la carpeta `src`. En la carpeta public, también se ubicó el archivo `_redirects` que sirve para posibilitar el redireccionamiento a la home page desde el servidor (en mi caso voy generando deploys en **Netlify** a medida que voy avanzando en el proyecto) cuando se piden otras rutas que se generaron con el uso de **React-Router**.

La carpeta `src` se compone de otras subcarpetas para organizar todos los archivos del proyecto:

- `assets`: Dentro de ella se encuentran (en otras subcarpetas), los archivos de imágenes y auxiliares de scss
- `components`: Ubico todos los componentes de la app, excepto los que son considerados como "pages", que son los componentes contenedores de cada "página" renderizada por el ruteo.

  Cada componente posee su propia carpeta, y dentro de la misma se ubica su archivo JSX (`index.jsx`) junto con el SCSS (`NombreDelComponente.scss`) en caso de tenerlo

- `hooks`: Contiene mis hooks personalizados

- `pages`: Como mencioné anteriormente, aquí pongo los componentes contenedores encargados de renderizar y manejar el estado de las "paginas" ruteadas

- `services`: Aquí coloco archivos js que sirven como utilidades para el proyecto y luego son llamados por el componente que los requiere. Constantes, Funciones, etc.

### Componente NavBar

Esta maquetado con **React-Bootstrap** y presenta la siguiente funcionalidad:

- Logo de la marca: al clickear en el, navega a home.
- Buscador: Permite realizar la búsqueda de productos por su marca o descripción.
- Mi cuenta: Para permitir el logueo del usuario.
- CartWidget: Muestra la cantidad de elementos del carrito y navega al carrito de compras
- Barra de categorías: Se genera dinámicamente en base a la respuesta de una petición a nuestra base de datos. Si bien se utiliza un componente de React-Bootstrap para representar cada link, mediante la prop `as={NavLink}`, se le dice que haga uso del componente **NavLink** de **React-Router** para su representación.

### Componente BrandBanner

Sirve para representar el banner de marcas de la home page. Toma por props un array de objetos con los datos de cada ítem de marca (dirección web del sitio de la marca, imagen y nombre) y luego los mapea generando el banner mencionado.

### Componente Itemcount

- Decidí poner un input controlado por React para tener un mejor manejo de la situación y validaciones.
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

Por último, también puse una validación que no muestre los controles si el stock es cero. Sólo alerta que no hay disponible y deshabilita el botón

### Componente InfoMessage

Es llamado por ItemCount y muestra los mensajes emergentes relacionados a problemas en la introducción de la cantidad a agregar al carrito. Toma por props el mensaje, el estilo de dicho mensaje y el tipo de animación a realizar.

### Promises y asincronía

Utilicé 2 promesas. Una es la que pide el desafió que resuelva en 2seg los productos desde un archivo estático. La otra es para simular (dentro de cada ítem) la carga en tiempo aleatorio de las imágenes. En este caso hice un random entre 0 y 2seg.

En ambos casos utilicé loaders, que se encuentran activos mientras se realiza la petición y desaparecen luego de la respuesta.

Para el caso de la promesa principal de los productos, generé un posible manejo del error, y lo dejé preparado como para probarlo (debajo del resolve hay un reject comentado para alternar y probar). En este componente del ItemListContainer hay 3 “estados”. Los productos, el loading y el error. Entonces en base a si la respuesta es correcta o errónea, muestro el listado de productos o un mensaje de error.

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

Este componente también maneja el estado de `isLoading` junto con `isError`, para mediante conditional render, administrar entre las vistas del catálogo de productos, un loader y un posible mensaje de error en caso de no encontrar la categoría o producirse un error de comunicación con la base de datos.

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

### Page Home y Category

Se encargan de mostrar la landing page y la page correspondiente a la categoría seleccionada o ruteada respectivamente.

Ambas, aparte de mostrar componentes específicos al layout de cada vista, llaman al componente contenedor ItemListContainer, que se encarga como se vio anteriormente de manejar la lógica de representación de los productos correspondientes.

### Page ItemDetailcontainer

Es un componente contenedor encargado de administrar la lógica de estado relacionada al producto del que se quiere mostrar su detalle.

Se encarga de hacer la petición de los datos de ese producto en base a los parámetros de _id_ obtenidos de la ruta asociada mediante el uso de `useParams()` de **react-router**

Como sucedía con el ItemListContainer, también maneja el estado de `isLoading` junto con `isError`, para mediante conditional render, administrar entre las vistas del catálogo de productos, un loader y un posible mensaje de error en caso de no encontrar el producto o producirse un error de comunicación con la base de datos.

### Page Error404

Se encarga de mostrar el característico _error 404_ si la ruta navegada no coincide con una válida.

---

## Dependencias

Aparte de las dependencias base vistas en la cursada, utilice unas pocas más que considero de valor para el desarrollo y producción.

- **Node-sass:** Considero a este preprocesador de css muy útil en cuanto a las herramientas que brinda a la hora de generar las hojas de estilos para los componentes y aplicación.

- **React-Bootstrap:** Como herramienta para el maquetado del sitio. Adopté esta opción frente al Bootstrap convencional, ya que según la documentación oficial es lo recomendado para React. Los métodos y eventos que usan jQuery se realizan imperativamente manipulando directamente el DOM. “Por el contrario, React usa actualizaciones del estado para actualizar el DOM virtual. De esta manera, React-Bootstrap proporciona una solución más confiable al incorporar la funcionalidad Bootstrap en el DOM virtual de React”.

  Simplifica notablemente la escritura y cantidad de líneas de código. Dado que **React-Bootstrap** está construido con **React JavaScript**, el estado se puede pasar dentro de los componentes de React-Bootstrap como una prop. También facilita la gestión del estado, ya que las actualizaciones se realizan utilizando el estado de React en lugar de manipular directamente el estado del DOM.

- **React-transition-group:** Instalé esta librería con el fin de realizar animaciones de entrada y salida de componentes de manera declarativa y compatibles con la manipulación del DOM virtual de React. Es recomendada por la documentación oficial de React para realizar animaciones. Aún no he hecho uso de la misma, pero la estuve probando y seguramente la utilicé para el final del proyecto, de lo contrario, quitaré la dependencia.
