import { initializeApp } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.9.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDkXJAYIgQn-NhMLAr-lXTULnaWvX-BTUw",
  authDomain: "venue-booking-8f9c2.firebaseapp.com",
  projectId: "venue-booking-8f9c2",
  storageBucket: "venue-booking-8f9c2.firebasestorage.app",
  messagingSenderId: "465519724635",
  appId: "1:465519724635:web:fca46f2d13e80d0d43577e",
  measurementId: "G-BK90CPE7HQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc };
