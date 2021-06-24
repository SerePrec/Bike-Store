import React, { useEffect } from "react";
import { useFilters, initialFilters } from "../../hooks/useFilters";
import { useSearch } from "../../hooks/useSearch";
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

const SearchItemListContainer = () => {
  const { products, isLoading, isError, catId, search, pathname } = useSearch();
  const {
    filters,
    setFilters,
    clean,
    hide,
    setHide,
    handleChangeFilters,
    handleChangeBrands,
    handleChangeCategories,
    setPriceRange,
    cleanFilters,
    categories,
    mainSelection,
    brands,
    filteredProducts,
    priceLimits
  } = useFilters(products);

  useEffect(() => {
    setFilters(initialFilters);
  }, [catId, search, setFilters]);

  return (
    <div className={`container-xl searchShowRoom ${isLoading && "loading"}`}>
      {pathname === "/search" ? (
        <div>
          <h3>Su Búsqueda "{new URLSearchParams(search).get("q")}"</h3>
          {!isLoading && products && (
            <PillBadge variant="secondary">
              {products.length}{" "}
              {products.length === 1 ? "producto" : "productos"}
            </PillBadge>
          )}
        </div>
      ) : (
        <div>
          <h3>{catId.toUpperCase()}</h3>
          {!isLoading && products && (
            <PillBadge variant="secondary">
              {products.length}{" "}
              {products.length === 1 ? "producto" : "productos"}
            </PillBadge>
          )}
        </div>
      )}
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
              {pathname === "/search" && (
                <PropertyListFilter
                  title="CATEGORIAS"
                  filterProp={filters.categories}
                  valuesToList={categories}
                  handleChangeProp={handleChangeCategories}
                  buttonClass="black"
                />
              )}
              <PropertyListFilter
                title="MARCAS"
                filterProp={filters.brands}
                valuesToList={brands}
                handleChangeProp={handleChangeBrands}
              />
              {mainSelection && mainSelection.length > 1 && (
                <PriceRangeFilter
                  priceRange={priceLimits}
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
