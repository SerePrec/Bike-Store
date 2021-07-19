import { useState, useEffect } from "react";
import { getFirestore, firestoreTimeStamp } from "../firebase";

export const useUserFavs = ({ authUser, setIsLoading }) => {
  const [favs, setFavs] = useState([]);

  const getFav = id => {
    return favs.find(elem => elem.favId === id);
  };

  const checkIsFav = id => {
    return id === undefined ? undefined : getFav(id) !== undefined;
  };

  const addFav = product => {
    setIsLoading(true);
    const { id, title, pictureURL } = product;
    const db = getFirestore();
    const userFav = db
      .collection("users")
      .doc(authUser.uid)
      .collection("favs")
      .doc(id);

    const favData = {
      favId: id,
      title,
      pictureURL,
      date: firestoreTimeStamp(new Date())
    };

    userFav
      .set(favData)
      .then(() => {
        setFavs([...favs, favData]);
      })
      .catch(error => {
        console.error("Error guardando favorito en usuario: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const removeFav = id => {
    setIsLoading(true);
    const db = getFirestore();
    const userFav = db
      .collection("users")
      .doc(authUser.uid)
      .collection("favs")
      .doc(id);

    userFav
      .delete()
      .then(() => {
        const updatedFavs = favs.filter(elem => elem.favId !== id);
        setFavs(updatedFavs);
      })
      .catch(error => {
        console.error("Error borrando favorito en usuario: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const setFav = product => {
    if (!authUser) return;

    if (checkIsFav(product.id)) {
      removeFav(product.id);
    } else {
      addFav(product);
    }
  };

  useEffect(() => {
    if (!(authUser && authUser.uid)) {
      if (favs.length !== 0) {
        setFavs([]);
      }
      return;
    }
    setIsLoading(true);
    const db = getFirestore();
    const userFavs = db
      .collection("users")
      .doc(authUser.uid)
      .collection("favs")
      .orderBy("date", "desc");
    userFavs
      .get()
      .then(querySnapshot => {
        setFavs(querySnapshot.docs.map(doc => doc.data()));
      })
      .catch(error => {
        console.error("Error obteniendo favoritos: ", error);
      })
      .finally(() => {
        setIsLoading(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authUser]);

  return { favs, checkIsFav, setFav, removeFav };
};
