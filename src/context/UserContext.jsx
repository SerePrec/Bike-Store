import React, { useState } from "react";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { useUserOrders } from "../hooks/useUserOrders";
import { useUserFavs } from "../hooks/useUserFavs";
export const UserContext = React.createContext(null);

const UserContextProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { authUser } = useFirebaseAuth();
  const { orders, getUsersOrders } = useUserOrders({ authUser, setIsLoading });
  const { favs, checkIsFav, setFav, removeFav } = useUserFavs({
    authUser,
    setIsLoading
  });

  return (
    <UserContext.Provider
      value={{
        authUser,
        isLoading,
        orders,
        getUsersOrders,
        favs,
        checkIsFav,
        setFav,
        removeFav
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
