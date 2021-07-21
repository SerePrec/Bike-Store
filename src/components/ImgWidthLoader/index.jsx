import React, { useState } from "react";
import imgBlank from "../../assets/img/blank.gif";
import "./ImgWidthLoader.scss";

const ImgWidthLoader = ({ className, title, pictureURL }) => {
  const [imgLoad, setImgLoad] = useState(false);
  const handleLoad = () => {
    setImgLoad(true);
  };

  return (
    <>
      <img
        className={`imgWidthLoader ${className || ""}`}
        src={imgLoad ? pictureURL : imgBlank}
        alt={title}
      />
      {!imgLoad && (
        <img
          onLoad={handleLoad}
          src={pictureURL}
          style={{ display: "none" }}
          alt=""
        />
      )}
    </>
  );
};

export default ImgWidthLoader;
