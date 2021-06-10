import React from "react";
import BrandBanner from "../../components/BrandBanner";
import ItemListContainer from "../../components/ItemListContainer";
import LandingCarousel from "../../components/LandingCarousel";
import { BRANDS } from "../../services/brands";

const Home = () => {
  const greeting = `Destacados Del Mes`;
  const legend = `Los productos que nuestros clientes eligen`;
  return (
    <main>
      <LandingCarousel />
      <BrandBanner brands={BRANDS} />
      <ItemListContainer greeting={greeting} legend={legend} />
    </main>
  );
};

export default Home;
