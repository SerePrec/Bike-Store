import React from "react";
import BrandBanner from "../../components/BrandBanner";
import InfoBar from "../../components/InfoBar";
import InfoDollar from "../../components/InfoDollar";
import HomeItemListContainer from "../../components/HomeItemListContainer";
import LandingCarousel from "../../components/LandingCarousel";
import { BRANDS } from "../../utils/brands";

const Home = ({ dollar }) => {
  return (
    <main>
      <LandingCarousel />
      <BrandBanner brands={BRANDS} />
      <InfoBar title="HOME">
        <InfoDollar dollar={dollar} />
      </InfoBar>
      <HomeItemListContainer
        greeting={`Destacados Del Mes`}
        legend={`Los productos que nuestros clientes eligen`}
      />
    </main>
  );
};

export default Home;
