import { useState, useEffect } from "react";
import { URLDOLLAR, dolarOficial } from "../services/dolar";

export const useDollar = () => {
  const [dollar, setDollar] = useState(null);

  useEffect(() => {
    window
      .fetch(URLDOLLAR)
      .then(res => res.json())
      .then(data => setDollar(dolarOficial(data)))
      .catch(err => console.log("Error petición del dolar:", err));
  }, []);

  return { dollar, setDollar };
};
