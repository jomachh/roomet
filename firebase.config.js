import firebase from "firebase";
import "@firebase/firestore";
import "@firebase/auth";

const fb = () => {
  try {
    const config = {
      apiKey: process.env.FIREBASEAPIKEY,
      authDomain: process.env.FIREBASEAUTHDOMAIN,
      databaseURL: process.env.FIREBASEDATABASE,
      projectId: process.env.FIREBASEPROJECTID,
      storageBucket: process.env.FIREBASESTORAGEBUCKET,
      messagingSenderId: process.env.FIREBASESENDERID,
      appId: process.env.FIREBASEAPPID,
      measurementId: process.env.FIREBASEMEASUREMENTID,
    };
    firebase.initializeApp(config);
  } catch (err) {
    if (!/already exist/.test(err.message)) {
      console.error("Firebase initialization error", err.stack);
    }
  }

  return firebase;
};

export default fb;
