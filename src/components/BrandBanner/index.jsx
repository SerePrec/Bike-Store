import React from "react";
import BrandItem from "../BrandItem";
import "./BrandBanner.scss";

const BrandBanner = ({ brands }) => {
  return (
    <div className="brands">
      {brands.map(brand => (
        <BrandItem key={brand.alt} brand={brand} />
      ))}
    </div>
  );
};

export default BrandBanner;
