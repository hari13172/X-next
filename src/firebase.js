// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey:  process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "x-next-424707.firebaseapp.com",
  projectId: "x-next-424707",
  storageBucket: "x-next-424707.appspot.com",
  messagingSenderId: "890849230218",
  appId: "1:890849230218:web:e0d2787124bc83ffed9c73",
  measurementId: "G-NZE4P7ZVB1"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);