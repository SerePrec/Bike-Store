import React from "react";
import BrandBanner from "../../components/BrandBanner";
import InfoBar from "../../components/InfoBar";
import InfoDollar from "../../components/InfoDollar";
import ItemListContainer from "../../components/ItemListContainer";
import LandingCarousel from "../../components/LandingCarousel";
import { BRANDS } from "../../services/brands";

const Home = ({ dollar }) => {
  return (
    <main>
      <LandingCarousel />
      <BrandBanner brands={BRANDS} />
      <InfoBar title="HOME">
        <InfoDollar dollar={dollar} />
      </InfoBar>
      <ItemListContainer
        greeting={`Destacados Del Mes`}
        legend={`Los productos que nuestros clientes eligen`}
        home
      />
    </main>
  );
};

export default Home;
