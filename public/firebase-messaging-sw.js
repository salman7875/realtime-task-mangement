import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAXpqqoCCk3DjK7x0cf4N5lh4XoH-oJv7E",
  authDomain: "shopping-cart-a0ed0.firebaseapp.com",
  projectId: "shopping-cart-a0ed0",
  storageBucket: "shopping-cart-a0ed0.appspot.com",
  messagingSenderId: "811659679512",
  appId: "1:811659679512:web:b5711834d5b1d6af9fb06d",
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.getMessaging();
