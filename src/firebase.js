import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getFirestore, collection, doc, setDoc } from "firebase/firestore";


import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAX4OS_w7P2eqOtWdqEimTLJPqC6PAAP4E",
    authDomain: "reduxx-15bf1.firebaseapp.com",
    projectId: "reduxx-15bf1",
    storageBucket: "reduxx-15bf1.appspot.com",
    messagingSenderId: "616837811376",
    appId: "1:616837811376:web:69cd14784c3b1fcced7f75",
    measurementId: "G-FT8GFJ1Y84"
};


const app = initializeApp(firebaseConfig)
const db = getFirestore(app)


const citiesRef = collection(db, "cities");

setDoc(doc(citiesRef, "SF"), {
    name: "San Francisco", state: "CA", country: "USA",
    capital: false, population: 860000,
    regions: ["west_coast", "norcal"]
});
setDoc(doc(citiesRef, "LA"), {
    name: "Los Angeles", state: "CA", country: "USA",
    capital: false, population: 3900000,
    regions: ["west_coast", "socal"]
});
setDoc(doc(citiesRef, "DC"), {
    name: "Washington, D.C.", state: null, country: "USA",
    capital: true, population: 680000,
    regions: ["east_coast"]
});
setDoc(doc(citiesRef, "TOK"), {
    name: "Tokyo", state: null, country: "Japan",
    capital: true, population: 9000000,
    regions: ["kanto", "honshu"]
});
setDoc(doc(citiesRef, "BJ"), {
    name: "Beijing", state: null, country: "China",
    capital: true, population: 21500000,
    regions: ["jingjinji", "hebei"]
});