import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA9LTby5suHOTO0WJMMvSMl4h3b8b4Edb8",
  authDomain: "mr-pasta-5075d.firebaseapp.com",
  projectId: "mr-pasta-5075d",
  storageBucket: "mr-pasta-5075d.firebasestorage.app",
  messagingSenderId: "909769675036",
  appId: "1:909769675036:web:684a84e1d321e7f5d0ead9",
  measurementId: "G-CTWWRRXZ8V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
