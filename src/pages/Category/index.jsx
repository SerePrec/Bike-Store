import React from "react";
import ItemListContainer from "../../components/ItemListContainer";

const Category = ({ categories }) => {
  return (
    <main>
      <ItemListContainer categories={categories} />
    </main>
  );
};

export default Category;
