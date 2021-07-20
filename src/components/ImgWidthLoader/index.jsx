import React, { useState } from "react";
import imgBlank from "../../assets/img/blank.gif";
import "./ImgWidthLoader.scss";

const ImgWidthLoader = ({ className, title, pictureURL }) => {
  const [imgLoad, setImgLoad] = useState(false);
  const handleLoad = () => {
    if (!imgLoad) {
      setImgLoad(true);
    }
  };

  return (
    <img
      className={`imgWidthLoader ${className || ""}`}
      onLoad={handleLoad}
      src={imgLoad ? pictureURL : imgBlank}
      alt={title}
    />
  );
};

export default ImgWidthLoader;
