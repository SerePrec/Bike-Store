import React from "react";
import { priceFormat } from "../../utils/priceFormat";

const ResumeRow = ({ product, qty }) => {
  const { title, price, discount, pictureURL } = product;

  return (
    <tr>
      <td>
        <img
          src={process.env.PUBLIC_URL + `/img/${pictureURL}`}
          className="card-img-top"
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
