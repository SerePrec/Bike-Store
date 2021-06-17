import { useState, useEffect } from "react";

export const useCategories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const getCategories = fetch("/data/categories.json").then(res => {
      return res.json();
    });

    getCategories
      .then(res => {
        setCategories(res);
      })
      .catch(err => {
        setCategories(null);
        console.log("Error pidiendo categorías en NavBar:", err);
      });
  }, []);

  return { categories, setCategories };
};
