import { useState } from "react";
import {
  productsFilter,
  mainSelect,
  propertyList,
  setPriceLimits
} from "../services/productsFilter.js";

export const initialFilters = {
  sort: "p",
  onlyOff: false,
  categories: [],
  brands: [],
  minPriceSel: 0,
  maxPriceSel: +Infinity
};

export const useFilters = products => {
  const [filters, setFilters] = useState(initialFilters);
  const [clean, setClean] = useState(0);
  const [hide, setHide] = useState(true);

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

  let mainSelection = null,
    filteredProducts = null,
    brands = null,
    categories = null,
    priceLimits = null;

  if (products) {
    categories = propertyList(products, "category");
    mainSelection = mainSelect(products, filters);
    brands = propertyList(mainSelection, "brand");
    filteredProducts = productsFilter(mainSelection, filters);
    priceLimits = setPriceLimits(mainSelection);
  }

  return {
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
  };
};
