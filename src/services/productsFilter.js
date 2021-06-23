function productsSort(sortType, arrayToSort) {
  //procesa la opción seleccionada de orden en el select y llama a la función de orden respectiva
  let func;
  switch (sortType) {
    case "p":
      func = sortHighlight;
      break;

    case "a":
      func = sortAZ;
      break;

    case "z":
      func = sortZA;
      break;

    case "-":
      func = sortLowerPrice;
      break;

    case "+":
      func = sortHigherPrice;
      break;

    case "d-":
      func = sortLowerDiscount;
      break;

    case "d+":
      func = sortHigherDiscount;
      break;

    default:
      break;
  }
  arrayToSort.sort(func);
}

const sortHighlight = (a, b) => {
  // Función de ordenamiento destacados primero, luego alfabetico de marca y descripción (a-Z)
  if (a.highlight === b.highlight) {
    if (a.brand.localeCompare(b.brand) === 0) {
      return a.title.localeCompare(b.title);
    }
    return a.brand.localeCompare(b.brand);
  }
  return b.highlight - a.highlight; // en este caso true toma el valor de 1 y false el de 0
};

const sortAZ = (a, b) => {
  // Función de ordenamiento alfabético (a-Z) por marca y descripción
  if (a.brand.localeCompare(b.brand) === 0) {
    return a.title.localeCompare(b.title);
  }
  return a.brand.localeCompare(b.brand);
};

const sortZA = (a, b) => {
  // Función de ordenamiento alfabético (Z-a) por marca y descripción
  if (b.brand.localeCompare(a.brand) === 0) {
    return b.title.localeCompare(a.title);
  }
  return b.brand.localeCompare(a.brand);
};

const sortLowerPrice = (a, b) => {
  // Función de ordenamiento por menor precio y por marca (a-Z)
  if (
    a.price * (1 - a.discount / 100) - b.price * (1 - b.discount / 100) ===
    0
  ) {
    if (a.brand.localeCompare(b.brand) === 0) {
      return a.title.localeCompare(b.title);
    }
    return a.brand.localeCompare(b.brand);
  }
  return a.price * (1 - a.discount / 100) - b.price * (1 - b.discount / 100);
};

const sortHigherPrice = (a, b) => {
  // Función de ordenamiento por mayor precio y por marca (a-Z)
  if (
    b.price * (1 - b.discount / 100) - a.price * (1 - a.discount / 100) ===
    0
  ) {
    if (a.brand.localeCompare(b.brand) === 0) {
      return a.title.localeCompare(b.title);
    }
    return a.brand.localeCompare(b.brand);
  }
  return b.price * (1 - b.discount / 100) - a.price * (1 - a.discount / 100);
};

const sortLowerDiscount = (a, b) => {
  // Función de ordenamiento por menor descuento y por marca (a-Z)
  if (a.discount - b.discount === 0) {
    if (a.brand.localeCompare(b.brand) === 0) {
      return a.title.localeCompare(b.title);
    }
    return a.brand.localeCompare(b.brand);
  }
  return a.discount - b.discount;
};

const sortHigherDiscount = (a, b) => {
  // Función de ordenamiento por mayor descuento y por marca (a-Z)
  if (b.discount - a.discount === 0) {
    if (a.brand.localeCompare(b.brand) === 0) {
      return a.title.localeCompare(b.title);
    }
    return a.brand.localeCompare(b.brand);
  }
  return b.discount - a.discount;
};

function filterProp(arrayToFilter, propToFilter, matchArray) {
  // filtra los productos del array pasado en funcion de un array de marcas
  let propFilteredProducts = [];
  if (matchArray.length === 0) {
    propFilteredProducts = arrayToFilter;
  } else {
    propFilteredProducts = arrayToFilter.filter(elem => {
      for (const selectedProp of matchArray) {
        if (elem[propToFilter].toLowerCase() === selectedProp.toLowerCase()) {
          return true;
        }
      }
      return false;
    });
  }
  return propFilteredProducts;
}

export const setPriceLimits = prodsArray => {
  // Controla la selección del rango de precios por el usuario y colocar su valor en los input respectivos

  let minPrice = +Infinity;
  let maxPrice = -Infinity;
  let price;
  for (const product of prodsArray) {
    // se obtiene el precio máximo y mínimo del vector a procesar
    price = product.price * (1 - product.discount / 100);
    if (price > maxPrice) maxPrice = price;
    if (price < minPrice) minPrice = price;
  }
  return { minPrice, maxPrice };
};

export const filterPriceRange = (prodsToFilter, filters) => {
  // filtra el vector pasado según el rango de precio elegido.
  // se crea y se devuelve un vector auxiliar, para no sobreescribir el vector pasado
  // y poder seguir operando posteriormente con el mismo si se van cambiando solo los rangos de precio
  let auxArray = prodsToFilter.filter(prod =>
    Boolean(
      prod.price * (1 - prod.discount / 100) >= filters.minPriceSel &&
        prod.price * (1 - prod.discount / 100) <= filters.maxPriceSel
    )
  );
  return auxArray;
};

export const productsFilter = (prodsToFilter, filters) => {
  prodsToFilter = filterProp(prodsToFilter, "brand", filters.brands);
  prodsToFilter = filterPriceRange(prodsToFilter, filters);
  productsSort(filters.sort, prodsToFilter);
  return prodsToFilter;
};

export const mainSelect = (products, filters) => {
  let mainSelectedProducts = [...products];
  mainSelectedProducts = filterProp(
    mainSelectedProducts,
    "category",
    filters.categories
  );
  if (filters.onlyOff) {
    mainSelectedProducts = mainSelectedProducts.filter(
      prod => prod.discount !== 0
    );
  }
  return mainSelectedProducts;
};

export const propertyList = (arrayToProcess, propToList) => {
  // Encuentra las marcas y los productos dentro de cada una de ellas que
  //corresponden a la selección madre (Filtro de Busqueda por palabra, categoria o destacado) del usuario
  let valueList = [];
  let value;
  for (const elem of arrayToProcess) {
    value = elem[propToList];
    let match = valueList.find(elem => elem.name === value.toLowerCase());
    if (match) {
      // si ya existía la marca en el array, le suma una unidad
      match.qty++;
    } else {
      // sino, agrega la marca al listado
      valueList.push({ name: value.toLowerCase(), qty: 1 });
    }
  }
  valueList.sort((a, b) => a.name.localeCompare(b.name));
  return valueList;
};
