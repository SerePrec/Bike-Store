import { useState, useEffect } from "react";
import { getFirestore } from "../firebase";

export const useCategories = () => {
  const [categories, setCategories] = useState(null);

  // useEffect(() => {
  //   const getCategories = fetch("/data/categories.json").then(res => {
  //     return res.json();
  //   });

  //   getCategories
  //     .then(res => {
  //       console.log(res);
  //       setCategories(res);
  //     })
  //     .catch(err => {
  //       setCategories(null);
  //       console.log("Error pidiendo categorías en NavBar:", err);
  //     });
  // }, []);

  useEffect(() => {
    const db = getFirestore();
    const categoriesCollection = db.collection("categories");
    categoriesCollection
      .orderBy("index")
      .get()
      .then(querySnapshot => {
        const res = querySnapshot.docs.map(doc => doc.data());
        console.log(res);
        setCategories(res);
      })
      .catch(err => {
        console.log("Error pidiendo categorías en NavBar:", err);
      });
  }, []);

  return { categories, setCategories };
};
