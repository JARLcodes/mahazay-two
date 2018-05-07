import * as firebase from 'firebase';
import 'firebase/firestore';

export const firebaseConfigs = {
  apiKey: "AIzaSyCTEp2GTWkl3r3P3-gCuz45sN89ycD7Duo",
  authDomain: "mahazay-c248c.firebaseapp.com",
  databaseURL: "https://mahazay-c248c.firebaseio.com",
  projectId: "mahazay-c248c",
  storageBucket: "mahazay-c248c.appspot.com",
  messagingSenderId: "255815640961"
};


firebase.initializeApp(firebaseConfigs);
const firestore = firebase.firestore();
const settings = { timestampsInSnapshots: true };
firestore.settings(settings);
export const db = firestore;

// export const admin = require('firebase-admin');
// admin.initializeApp();