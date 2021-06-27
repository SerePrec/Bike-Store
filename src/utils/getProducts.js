//TODO:
import productsServer from "../utils/productos.json";

export let temp;

export const getProducts = () =>
  new Promise((resolve, reject) => {
    temp = setTimeout(() => {
      resolve(productsServer);
      // reject({
      //   title: "Error de Carga",
      //   msg1: "Intenta recargar la página o regresa más tarde.",
      //   msg2: "Disculpe las molestias."
      // });
    }, 2000);
  });
