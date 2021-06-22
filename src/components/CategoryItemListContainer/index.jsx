import React, { useState, useEffect } from "react";
import { useParams } from "react-router";
import { Form } from "react-bootstrap";
import BrandListFilter from "../BrandListFilter";
import ItemList from "../ItemList";
import PillBadge from "../PillBadge";
import PriceRangeFilter from "../PriceRangeFilter";
import SortBar from "../SortBar";
import TypicButton from "../TypicButton";
import filtersIcon from "../../assets/img/filters.png";
import times from "../../assets/img/times-circle.svg";
import "./CategoryItemListContainer.scss";
import {
  productsFilter,
  mainSelect,
  brandList,
  setPriceLimits
} from "../../services/productsFilter";

//TODO:
import productsServer from "../../services/productos.json";

const initialFilters = {
  sort: "p",
  onlyOff: false,
  brands: [],
  minPriceSel: 0,
  maxPriceSel: +Infinity
};

const CategoryItemListContainer = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [clean, setClean] = useState(0);
  let { catId } = useParams();

  useEffect(() => {
    let temp;
    setIsLoading(true);
    setFilters(initialFilters);
    const getProducts = () =>
      new Promise((resolve, reject) => {
        temp = setTimeout(() => {
          resolve(productsServer);
          // reject({
          //   title: "Error de Carga",
          //   msg1: "Intenta recargar la página o regresa más tarde.",
          //   msg2: "Disculpe las molestias."
          // });
        }, 2000);
      });
    getProducts()
      .then(res => {
        let productsFiltered;
        productsFiltered = res.filter(elem => elem.category === catId);
        if (productsFiltered.length === 0) {
          return Promise.reject({
            title: "Categoría Inexistente o Sin Productos",
            msg1: "Por favor verifique la dirección de su enlace.",
            msg2: "Disculpe las molestias."
          });
        }
        setProducts(productsFiltered);
        setIsError(false);
      })
      .catch(err => {
        setProducts(null);
        setIsError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });

    return () => {
      clearInterval(temp);
    };
  }, [catId]);

  const handleChangeFilters = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFilters({ ...filters, [name]: value });
  };

  const handleChangeBrands = e => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;
    if (value) {
      const brands = [...filters.brands, name];
      setFilters({ ...filters, brands });
    } else {
      const brands = filters.brands.filter(elem => elem !== name);
      setFilters({ ...filters, brands });
    }
  };

  const setPriceRange = (priceRangesSel, e) => {
    if (e && e.key && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const { minPriceSel, maxPriceSel } = priceRangesSel;
    setFilters({ ...filters, minPriceSel, maxPriceSel });
  };

  const cleanFilters = () => {
    setFilters({ ...filters, onlyOff: false, brands: [] });
    setClean(cl => cl + 1);
  };

  let mainSelection = null;
  let filteredProducts = null;
  let brands = null;
  if (products) {
    mainSelection = mainSelect(products, filters);
    brands = brandList(mainSelection);
    filteredProducts = productsFilter(mainSelection, filters);
  }

  return (
    <div className={`container-xl categoryShowRoom ${isLoading && "loading"}`}>
      <div>
        <h3>{catId.toUpperCase()}</h3>
        {!isLoading && products && (
          <PillBadge variant="secondary">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </PillBadge>
        )}
      </div>
      <div className="row mx-0 mr-sm-n3">
        <div className="col-sm-3 col-xl-2 mb-4 filtersCol">
          <h3>
            Filtros
            <img src={filtersIcon} alt="" />
          </h3>
          <div className="row filtersContainer">
            <div className="col-sm-12 px-1">
              <Form.Group controlId="highlightsCheck" className="mb-3">
                <Form.Check
                  name="onlyOff"
                  type="checkbox"
                  checked={filters.onlyOff}
                  label="Solo Ofertas"
                  onChange={handleChangeFilters}
                />
              </Form.Group>
              <BrandListFilter
                filters={filters}
                brands={brands}
                handleChangeBrands={handleChangeBrands}
              />
              {products && (
                <PriceRangeFilter
                  priceRange={setPriceLimits(mainSelection)}
                  setPriceRange={setPriceRange}
                  clean={clean}
                />
              )}
              <TypicButton className="mt-4" onClick={cleanFilters}>
                LIMPIAR FILTROS
                <img src={times} alt="" />
              </TypicButton>
            </div>
          </div>
        </div>
        <div className="col-sm-9 col-xl-10 colProducts">
          <SortBar
            isLoading={isLoading}
            filteredProducts={filteredProducts}
            filters={filters}
            handleChange={handleChangeFilters}
          />
          <ItemList
            isLoading={isLoading}
            isError={isError}
            products={filteredProducts}
            filters
          />
        </div>
      </div>
    </div>
  );
};

export default CategoryItemListContainer;
