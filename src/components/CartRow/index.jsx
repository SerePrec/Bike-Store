import React from "react";
import { Link } from "react-router-dom";
import ImgWidthLoader from "../ImgWidthLoader";
import ItemCount from "../ItemCount";
import { priceFormat } from "../../utils/priceFormat";
import times from "../../assets/img/times-circle.svg";

const CartRow = ({ product, qty, removeFromCart, updateFromCart }) => {
  const { id, title, price, discount, pictureURL, stock } = product;

  return (
    <tr>
      <td>
        <img src={times} alt="Eliminar" onClick={() => removeFromCart(id)} />
      </td>
      <td>
        <Link to={`/item/${id}`}>
          <ImgWidthLoader
            className="card-img-top"
            pictureURL={pictureURL}
            alt={title}
          />
        </Link>
      </td>
      <td>
        <p>{title}</p>
        <p>
          <b>${priceFormat(price * (1 - discount / 100))}</b>
          {discount !== 0 && <del>${priceFormat(price)}</del>}
        </p>
        <p>
          <b>
            SUBTOTAL: $
            {qty > stock
              ? " - - -,- -"
              : priceFormat(price * (1 - discount / 100) * qty)}
          </b>
        </p>
      </td>
      <td className="text-center">
        <ItemCount
          stock={stock}
          initial={qty}
          onAdd={qty => updateFromCart(id, qty)}
          inCart
        />
      </td>
      <td className="text-right font-weight-bold">
        $
        {qty > stock
          ? " - - -,- -"
          : priceFormat(price * (1 - discount / 100) * qty)}
      </td>
    </tr>
  );
};

export default CartRow;
