import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyBY03bne3z1amrBJ4pOPH8E_PLaI4iD5AQ",
  authDomain: "sound-of-code-2da59.firebaseapp.com",
  projectId: "sound-of-code-2da59",
  storageBucket: "sound-of-code-2da59.appspot.com",
  messagingSenderId: "755947657406",
  appId: "1:755947657406:web:65824572640699f19526ef",
  measurementId: "G-Y4GQL5TTRF",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
