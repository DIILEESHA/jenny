// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  serverTimestamp,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHJ79szntSLyeKkGPhsjL6ZgX74OE6P-I",
  authDomain: "jen4-9bc69.firebaseapp.com",
  projectId: "jen4-9bc69",
  storageBucket: "jen4-9bc69.firebasestorage.app",
  messagingSenderId: "184261426540",
  appId: "1:184261426540:web:f17923f64107cc879d4749",
  measurementId: "G-SJ6PRHZDGN"
};

// initialize firebase app
const app = initializeApp(firebaseConfig);

// export firestore helpers
const db = getFirestore(app);

/**
 * Save an RSVP to Firestore
 * @param {Object} data - the RSVP data to save
 * @returns {Promise<DocumentReference>}
 */
export async function saveRSVP(data) {
  const docRef = await addDoc(collection(db, "rsvps"), {
    ...data,
    createdAt: serverTimestamp(),
  });
  return docRef;
}

export { db };
