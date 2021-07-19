import { useEffect, useState } from "react";
import { getAuth } from "../firebase";

export const useFirebaseAuth = () => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unlisten = getAuth().onAuthStateChanged(authUser => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
    return () => {
      unlisten();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { authUser };
};
