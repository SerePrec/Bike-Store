import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router";
import { Form } from "react-bootstrap";
import ItemList from "../ItemList";
import PillBadge from "../PillBadge";
import PriceRangeFilter from "../PriceRangeFilter";
import PropertyListFilter from "../PropertyListFilter";
import SortBar from "../SortBar";
import TypicButton from "../TypicButton";
import filtersIcon from "../../assets/img/filters.png";
import times from "../../assets/img/times-circle.svg";
import "./SearchItemListContainer.scss";
import {
  productsFilter,
  mainSelect,
  propertyList,
  setPriceLimits
} from "../../services/productsFilter";

//TODO:
import productsServer from "../../services/productos.json";

const initialFilters = {
  sort: "p",
  onlyOff: false,
  categories: [],
  brands: [],
  minPriceSel: 0,
  maxPriceSel: +Infinity
};

const SearchItemListContainer = () => {
  const [products, setProducts] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [filters, setFilters] = useState(initialFilters);
  const [clean, setClean] = useState(0);
  const [hide, setHide] = useState(true);
  let { catId } = useParams();
  let { search } = useLocation();

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
        let query = new URLSearchParams(search);
        let searchText = query.get("q").toLowerCase();
        productsFiltered = res.filter(
          elem => elem.title.toLowerCase().indexOf(searchText) !== -1
        );
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
  }, [search]);

  const handleChangeFilters = e => {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    if (name === "onlyOff") {
      setFilters({ ...filters, [name]: value, brands: [] });
    } else {
      setFilters({ ...filters, [name]: value });
    }
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

  const handleChangeCategories = e => {
    const target = e.target;
    const value = target.checked;
    const name = target.name;
    if (value) {
      const categories = [...filters.categories, name];
      setFilters({ ...filters, categories, brands: [] });
    } else {
      const categories = filters.categories.filter(elem => elem !== name);
      setFilters({ ...filters, categories, brands: [] });
    }
  };

  const setPriceRange = (priceRangesSel, e) => {
    if (e && e.key && e.key !== "ArrowLeft" && e.key !== "ArrowRight") return;
    const { minPriceSel, maxPriceSel } = priceRangesSel;
    setFilters({ ...filters, minPriceSel, maxPriceSel });
  };

  const cleanFilters = () => {
    setFilters({ ...filters, onlyOff: false, brands: [], categories: [] });
    setClean(cl => cl + 1);
  };

  let mainSelection = null;
  let filteredProducts = null;
  let brands = null;
  let categories = null;
  if (products) {
    categories = propertyList(products, "category");
    mainSelection = mainSelect(products, filters);
    brands = propertyList(mainSelection, "brand");
    filteredProducts = productsFilter(mainSelection, filters);
  }

  return (
    <div className={`container-xl searchShowRoom ${isLoading && "loading"}`}>
      {/* <div>
        <h3>{catId.toUpperCase()}</h3>
        {!isLoading && products && (
          <PillBadge variant="secondary">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </PillBadge>
        )}
      </div> */}

      <div>
        <h3>Su Búsqueda "{new URLSearchParams(search).get("q")}"</h3>
        {!isLoading && products && (
          <PillBadge variant="secondary">
            {products.length} {products.length === 1 ? "producto" : "productos"}
          </PillBadge>
        )}
      </div>

      <div className="row mx-0 mr-sm-n3">
        <div className="col-sm-3 col-xl-2 filtersCol">
          <h3
            onClick={() => {
              setHide(hide => !hide);
            }}
          >
            Filtros
            <img src={filtersIcon} alt="" />
          </h3>
          <div className={`row filtersContainer ${hide ? "hide" : ""}`}>
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
              <PropertyListFilter
                title="CATEGORIAS"
                filterProp={filters.categories}
                valuesToList={categories}
                handleChangeProp={handleChangeCategories}
                buttonClass="black"
              />
              <PropertyListFilter
                title="MARCAS"
                filterProp={filters.brands}
                valuesToList={brands}
                handleChangeProp={handleChangeBrands}
              />
              {mainSelection && mainSelection.length > 1 && (
                <PriceRangeFilter
                  priceRange={setPriceLimits(mainSelection)}
                  setPriceRange={setPriceRange}
                  clean={clean}
                />
              )}
              <TypicButton className="mt-4 soft" onClick={cleanFilters}>
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

export default SearchItemListContainer;
