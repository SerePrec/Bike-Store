import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Table } from "react-bootstrap";
import trashIcon from "../../assets/img/trash.svg";
import imgBlank from "../../assets/img/blank.gif";
import "./FavsTable.scss";

const FavsTable = ({ favs, removeFav }) => {
  const [imgLoad, setImgLoad] = useState(false);
  const handleLoad = () => {
    setImgLoad(true);
  };

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
                  <img
                    src={imgLoad ? elem.pictureURL : imgBlank}
                    className="card-img-top"
                    alt={elem.title}
                    onLoad={handleLoad}
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
