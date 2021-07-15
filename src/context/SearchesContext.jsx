import React, { useState } from "react";
export const SearchesContext = React.createContext({});

const SearchesContextProvider = ({ children, defaultValue = {} }) => {
  const [searchesCache, setSearchesCache] = useState(defaultValue);

  const addSearch = (type, results) => {
    const aux = { ...searchesCache, [type]: results };
    setSearchesCache(aux);
  };

  const getSearch = type => {
    if (searchesCache[type]) {
      return searchesCache[type];
    } else if (searchesCache.all) {
      if (type === "home") {
        return searchesCache.all.filter(elem => elem.home === true);
      } else {
        return searchesCache.all.filter(elem => elem.category === type);
      }
    } else {
      return false;
    }
  };

  return (
    <SearchesContext.Provider
      value={{
        getSearch,
        addSearch
      }}
    >
      {children}
    </SearchesContext.Provider>
  );
};

export default SearchesContextProvider;
