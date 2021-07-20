import React, { useState } from "react";
import imgBlank from "../../assets/img/blank.gif";
import { priceFormat } from "../../utils/priceFormat";

const ResumeRow = ({ product, qty }) => {
  const { title, price, discount, pictureURL } = product;
  const [imgLoad, setImgLoad] = useState(false);
  const handleLoad = () => {
    setImgLoad(true);
  };

  return (
    <tr>
      <td>
        <img
          src={imgLoad ? pictureURL : imgBlank}
          className="card-img-top"
          alt={title}
          onLoad={handleLoad}
        />
      </td>
      <td>
        <p>{title}</p>
      </td>
      <td className="text-center">{qty}x</td>
      <td className="text-right font-weight-bold">
        ${priceFormat(price * (1 - discount / 100))}
      </td>
    </tr>
  );
};

export default ResumeRow;
