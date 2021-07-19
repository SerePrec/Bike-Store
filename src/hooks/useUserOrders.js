import { useState } from "react";
import { getFirestore } from "../firebase";

export const useUserOrders = ({ authUser, setIsLoading }) => {
  const [orders, setOrders] = useState([]);
  const getUsersOrders = () => {
    setIsLoading(true);
    const db = getFirestore();
    const userOrders = db
      .collection("users")
      .doc(authUser.uid)
      .collection("orders")
      .orderBy("date", "desc");
    userOrders
      .get()
      .then(querySnapshot => {
        setOrders(querySnapshot.docs.map(doc => doc.data()));
      })
      .catch(error => {
        console.error("Error obteniendo ordenes: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return { orders, getUsersOrders };
};
