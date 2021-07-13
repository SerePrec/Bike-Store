import { getFirestore } from "../firebase";
import productsFirebase from "../utils/prodFirebase.json";

const itemsCollection = getFirestore().collection("items");

productsFirebase.forEach(elem => itemsCollection.add(elem));
