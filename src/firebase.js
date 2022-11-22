import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA6x7Q_jJ3p5MHHG2p-Z-au6E6NaghWkRY",
  authDomain: "test-for-womanup.firebaseapp.com",
  projectId: "test-for-womanup",
  storageBucket: "test-for-womanup.appspot.com",
  messagingSenderId: "435163723676",
  appId: "1:435163723676:web:5be8c615403f5f6343ba59",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
