import { useState, useEffect } from "react";
import { getFirestore } from "../firebase";

export const useCategories = () => {
  const [categories, setCategories] = useState(null);

  useEffect(() => {
    const db = getFirestore();
    const categoriesCollection = db.collection("categories");
    categoriesCollection
      .orderBy("index")
      .get()
      .then(querySnapshot => {
        const res = querySnapshot.docs.map(doc => doc.data());
        setCategories(res);
      })
      .catch(err => {
        console.log("Error pidiendo categorías en NavBar:", err);
      });
  }, []);

  return { categories, setCategories };
};
