// Import the functions you need from the SDKs you need

// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// import firebase from 'firebase/app';
// import 'firebase/storage';

// import { initializeApp } from 'firebase/app';
// import { getStorage } from 'firebase/storage';

import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';




// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCjtAfkdSUcNCFuZPgDuLd8uvKiiTqZdZQ",
  authDomain: "batik-management-app.firebaseapp.com",
  projectId: "batik-management-app",
  storageBucket: "batik-management-app.appspot.com",
  messagingSenderId: "394267431875",
  appId: "1:394267431875:web:7af61babc451cde2b42376",
  measurementId: "G-WLCWQQ3F2W"
};

// Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


// firebase.initializeApp(firebaseConfig);
// const storage = firebase.storage();

// export { storage, firebase as default };



const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage, app };