import React from "react";
import { useFirebaseAuth } from "../hooks/useFirebaseAuth";
import { getAuth } from "../firebase";
export const UserContext = React.createContext(null);

const UserContextProvider = ({ children }) => {
  const { authUser } = useFirebaseAuth(getAuth);

  return (
    <UserContext.Provider value={{ authUser }}>{children}</UserContext.Provider>
  );
};

export default UserContextProvider;
