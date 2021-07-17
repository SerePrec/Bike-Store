import React, { useState } from "react";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { getAuth, getFirestore } from "../firebase";
export const UserContext = React.createContext(null);

const UserContextProvider = ({ children }) => {
  const { authUser } = useFirebaseAuth(getAuth);
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <UserContext.Provider
      value={{ authUser, isLoading, orders, getUsersOrders }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
