import React from "react";
import BrandBanner from "../../components/BrandBanner";
import ItemListContainer from "../../components/ItemListContainer";
import LandingCarousel from "../../components/LandingCarousel";
import InfoBar from "../../components/InfoBar";
import InfoDollar from "../../components/InfoDollar";
import { BRANDS } from "../../services/brands";

const Home = ({ dollar }) => {
  const greeting = `Destacados Del Mes`;
  const legend = `Los productos que nuestros clientes eligen`;
  return (
    <>
      <LandingCarousel />
      <BrandBanner brands={BRANDS} />
      <InfoBar title="HOME">
        <InfoDollar dollar={dollar} />
      </InfoBar>
      <ItemListContainer greeting={greeting} legend={legend} />
    </>
  );
};

export default Home;
