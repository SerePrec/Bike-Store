import { useEffect, useState } from "react";

export const useFirebaseAuth = firebaseAuth => {
  const [authUser, setAuthUser] = useState(null);

  useEffect(() => {
    const unlisten = firebaseAuth().onAuthStateChanged(authUser => {
      authUser ? setAuthUser(authUser) : setAuthUser(null);
    });
    return () => {
      unlisten();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { authUser };
};
