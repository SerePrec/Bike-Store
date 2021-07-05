import { getFirestore } from "../firebase";
import productsFirebase from "../utils/prodFirebase.json";

const itemsCollection = getFirestore().collection("items");

productsFirebase.forEach(elem => itemsCollection.add(elem));

//********** Pedir por ids ***********
//************************************

//const coll = getFirestore().collection("items");

// prueba traer ids
// coll
//   .where(firebase.firestore.FieldPath.documentId(), "in", [
//     "0X5EPQbDZ0C70bALuwjP",
//     "456",
//     "1IG8QKXJEVZkJmsOt7uh"
//   ])
//   .get()
//   .then(querySnapshot => {
//     console.log(querySnapshot);
//     querySnapshot.forEach(doc => {
//       // doc.data() is never undefined for query doc snapshots
//       console.log(doc.id, " => ", doc.data());
//     });
//   })
//   .catch(error => {
//     console.log("Error getting documents: ", error);
//   });
