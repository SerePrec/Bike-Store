import React from "react";
import "./App.scss";
import BannerMarcas from "./components/BannerMarcas/BannerMarcas";
import Carrusel from "./components/Carrusel/Carrusel";
import Footer from "./components/Footer/Footer";
import ItemListContainer from "./components/ItemListContainer/ItemListContainer";
import NavBar from "./components/NavBar/NavBar";

function App() {
  const greeting = `Destacados Del Mes`;
  const leyenda = `Los productos que nuestros clientes eligen`;
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <Carrusel />
        <BannerMarcas />
        <ItemListContainer greeting={greeting} leyenda={leyenda} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
