export const URLDOLAR =
  "https://www.dolarsi.com/api/api.php?type=valoresprincipales";

// Recorre el array devuelto por el sitio dolarsi.com y obtiene la cotización del Dolar Oficial
export function dolarOficial(vectorDolar) {
  for (const valor of vectorDolar) {
    if (valor.casa.nombre === "Dolar Oficial") {
      //lo paso a número decimal, pero debo convertir las "," en "." para que lo tome
      const dolarCompra = parseFloat(valor.casa.compra.replace(",", "."));
      const dolarVenta = parseFloat(valor.casa.venta.replace(",", "."));
      sessionStorage.setItem("dolar", dolarVenta);
      return { dolarCompra, dolarVenta };
    }
  }
}
