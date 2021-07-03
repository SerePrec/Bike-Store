import React from "react";
import "./PictureHeader.scss";

const PictureHeader = ({ title, imgClass }) => {
  return (
    <div className={`pictureHeader ${imgClass || ""}`}>
      <div className="gradient"></div>
      <h1>{title && title.toUpperCase()}</h1>
    </div>
  );
};

export default PictureHeader;
