import React from "react";
import BrandBanner from "./components/BrandBanner";
import LandingCarousel from "./components/LandingCarousel";
import Footer from "./components/Footer";
import ItemListContainer from "./components/ItemListContainer";
import NavBar from "./components/NavBar";
import { BRANDS } from "./services/brands";
import "./App.scss";

function App() {
  const greeting = `Destacados Del Mes`;
  const legend = `Los productos que nuestros clientes eligen`;
  return (
    <div className="App">
      <header>
        <NavBar />
      </header>
      <main>
        <LandingCarousel />
        <BrandBanner brands={BRANDS} />
        <ItemListContainer greeting={greeting} legend={legend} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
