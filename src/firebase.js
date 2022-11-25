import { getStorage } from "firebase/storage";
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";

// Copy and paste this into your JavaScript code to initialize the Firebase SDK.
// You will also need to load the Firebase SDK.
// See https://firebase.google.com/docs/web/setup for more details.

// export const storageApp = firebase.initializeApp({
//   projectId: "test-for-womanup",
//   appId: "1:435163723676:web:41b5a4a94d2ccf0743ba59",
//   storageBucket: "test-for-womanup.appspot.com",

//   apiKey: "AIzaSyA6x7Q_jJ3p5MHHG2p-Z-au6E6NaghWkRY",
//   authDomain: "test-for-womanup.firebaseapp.com",
//   messagingSenderId: "435163723676",
// });

const firebaseConfig = {
  apiKey: "AIzaSyA6x7Q_jJ3p5MHHG2p-Z-au6E6NaghWkRY",
  authDomain: "test-for-womanup.firebaseapp.com",
  projectId: "test-for-womanup",
  storageBucket: "test-for-womanup.appspot.com",
  locationId: "us-central",
  messagingSenderId: "435163723676",
  appId: "1:435163723676:web:5be8c615403f5f6343ba59",
};

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const db = getFirestore(app);
