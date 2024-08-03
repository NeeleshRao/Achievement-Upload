
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyCHuVV4Kq2xUtsCl_D16h8HpxMlkwwxvEw",
    authDomain: "achievement-upload.firebaseapp.com",
    projectId: "achievement-upload",
    storageBucket: "achievement-upload.appspot.com",
    messagingSenderId: "141468184592",
    appId: "1:141468184592:web:9cb2f34e9d057c9a15da95"
};


const app = initializeApp(firebaseConfig);
export const firestore = getFirestore(app);
export const storage = getStorage(app);