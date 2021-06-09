import React from "react";

const BrandItem = ({ brand }) => {
  const { href, src, alt } = brand;
  return (
    <>
      <a href={href} target="_blank" rel="noreferrer">
        <img src={src} alt={alt} />
      </a>
    </>
  );
};

export default BrandItem;
