import admin from "firebase-admin";

const admin_ = () => {
  try {
    const config = {
      credential: admin.credential.applicationDefault(),
      databaseURL: process.env.FIREBASE_DATABASE,
    };
    admin.initializeApp(config);
  } catch (error) {
    console.log(error);
  }
  return admin;
};

export default admin_;
