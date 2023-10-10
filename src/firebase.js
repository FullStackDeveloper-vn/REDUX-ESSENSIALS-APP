import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getFirestore, serverTimestamp, Timestamp, updateDoc, addDoc, query, where, collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";

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

const docData = {
    stringExample: "Hello world!",
    booleanExample: true,
    numberExample: 3.14159265,
    dateExample: Timestamp.fromDate(new Date("December 10, 1815")),
    arrayExample: [5, true, "hello"],
    nullExample: null,
    objectExample: {
        a: 5,
        b: {
            nested: "foo"
        }
    }
};


async function xxx() {
    const frankDocRef = doc(db, "users", "frank");
    await setDoc(frankDocRef, {
        name: "Frank",
        favorites: { food: "Pizza", color: "Blue", subject: "recess" },
        age: 12
    });
    await updateDoc(frankDocRef, {
        "age": 133,
        "favorites.color": "Red"
    });
};

xxx()


