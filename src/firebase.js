import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore";
import { getFirestore, query, where, collection, doc, setDoc, getDoc, getDocs } from "firebase/firestore";


// import { getAnalytics } from "firebase/analytics";
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

// const docRef = doc(db, "cities", "SF");
// (async () => {
//     const docSnap = await getDoc(docRef);
//     if (docSnap.exists()) {
//         console.log("Document data:", docSnap.data());
//     } else {
//         // docSnap.data() will be undefined in this case
//         console.log("No such document!");
//     }
// })()

const q = query(collection(db, "cities"));

(async () => {
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
    });
})()
