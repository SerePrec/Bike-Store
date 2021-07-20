import React from "react";
import ImgWidthLoader from "../ImgWidthLoader";
import { priceFormat } from "../../utils/priceFormat";

const ResumeRow = ({ product, qty }) => {
  const { title, price, discount, pictureURL } = product;

  return (
    <tr>
      <td>
        <ImgWidthLoader
          className="card-img-top"
          pictureURL={pictureURL}
          alt={title}
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
