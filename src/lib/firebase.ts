import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCaDzOaEeq1uTVfscUL0NhaHTvGVivTJJ8",
  authDomain: "payment-details-4062b.firebaseapp.com",
  projectId: "payment-details-4062b",
  storageBucket: "payment-details-4062b.firebasestorage.app",
  messagingSenderId: "565173717313",
  appId: "1:565173717313:web:5671aabda492d3647539c0",
  measurementId: "G-3YDKHQGF12"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage = getStorage(app);

export { app, analytics, storage };
