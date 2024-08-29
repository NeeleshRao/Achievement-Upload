import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";
const env_var=import.meta.env
const firebaseConfig = {
    apiKey:env_var.VITE_REACT_APP_APIKEY,
    authDomain: env_var.VITE_REACT_APP_AUTH_DOMAIN,
    projectId: env_var.VITE_REACT_APP_PROJECT_ID,
    storageBucket: env_var.VITE_REACT_APP_STORAGE_ID,
    messagingSenderId: env_var.VITE_REACT_APP_MESSAGE_SENDER_ID,
    appId: env_var.VITE_REACT_APP_ID
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth=getAuth(app);
