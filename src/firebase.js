import React, { useContext, useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
// import { UserContext } from './components/UserContext';




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

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
// const auth = getAuth(app)

export { storage, app };


export const authLogin = async(email, password) => {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in
      const user = userCredential.user;
      return user;
    })
    .catch((error) => {
      return Promise.reject(error); // Mengembalikan janji (promise) yang ditolak (rejected)
    });
};



export const authLogout = async () => {
  // const {setUserAndUpdateStorage} = useContext(UserContext)
  const auth = getAuth();
  signOut(auth).then(() => {
    // Sign-out successful.
    // setUserAndUpdateStorage(null)
    console.log("berhasil")
    // localStorage.removeItem('userDataContext')
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
};
