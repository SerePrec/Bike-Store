import { useState } from "react";
import { getFirestore } from "../firebase";
import { infoModalMessages } from "../utils/modalMessages";

export const useSubscription = ({
  handleShowUserModal,
  setContentUserModal,
  setForm
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const subscribe = (e, form) => {
    e.preventDefault();
    setIsLoading(true);

    const db = getFirestore();
    const subsCollection = db.collection("subscriptions");
    const email = form.email.trim();
    const query = subsCollection.where("email", "==", email);
    query
      .get()
      .then(querySnapshot => {
        if (querySnapshot.size === 0) {
          return subsCollection
            .add({ email })
            .then(() => {
              setContentUserModal({
                ...infoModalMessages[2],
                msg2: form.email
              });
            })
            .catch(error => {
              setContentUserModal(infoModalMessages[4]);
              console.error("Error agregando email a base de datos: ", error);
            });
        } else {
          setContentUserModal({
            ...infoModalMessages[3],
            msg2: form.email
          });
        }
      })
      .catch(error => {
        setContentUserModal(infoModalMessages[4]);
        console.error(
          "Error consultando existencia de email de newsletter: ",
          error
        );
      })
      .finally(() => {
        setIsLoading(false);
        handleShowUserModal();
        setForm({ email: "", subscribe: false });
      });
  };

  return { isLoading, subscribe };
};
