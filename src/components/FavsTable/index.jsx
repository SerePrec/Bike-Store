import React from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import ImgWidthLoader from "../ImgWidthLoader";
import trashIcon from "../../assets/img/trash.svg";
import "./FavsTable.scss";

const FavsTable = ({ favs, removeFav }) => {
  return (
    <Table className="favsTable" striped>
      <thead className="table-dark">
        <tr>
          <th colSpan={3}>TU LISTA DE FAVORITOS</th>
        </tr>
      </thead>
      <tbody>
        {favs.map(elem => {
          return (
            <tr key={elem.favId}>
              <td>
                <Link to={`/item/${elem.favId}`}>
                  <ImgWidthLoader
                    className="card-img-top"
                    pictureURL={elem.pictureURL}
                    alt={elem.title}
                  />
                </Link>
              </td>
              <td>{elem.title}</td>
              <td>
                <img
                  src={trashIcon}
                  alt="Eliminar"
                  onClick={() => removeFav(elem.favId)}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default FavsTable;
