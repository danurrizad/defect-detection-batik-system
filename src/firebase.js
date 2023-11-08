import { getStorage } from 'firebase/storage';
import { initializeApp } from 'firebase/app';
import 'firebase/auth';
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";





// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
  measurementId: import.meta.env.VITE_MEASUREMENT_ID
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
    localStorage.removeItem('userDataContext')
    // setUserAndUpdateStorage(null)
    console.log("berhasil")
  }).catch((error) => {
    // An error happened.
    console.log(error)
  });
};


// export const verifikasiEmail = async(email) =>{
//   const actionCodeSettings = {
//     // URL you want to redirect back to. The domain (www.example.com) for this
//     // URL must be in the authorized domains list in the Firebase Console.
//     url: 'https://www.example.com/finishSignUp?cartId=1234',
//     // This must be true.
//     handleCodeInApp: true,
//     iOS: {
//       bundleId: 'com.example.ios'
//     },
//     android: {
//       packageName: 'com.example.android',
//       installApp: true,
//       minimumVersion: '12'
//     },
//     dynamicLinkDomain: 'example.page.link'
//   };
//   const auth = getAuth();
//   sendSignInLinkToEmail(auth, email, actionCodeSettings)
//     .then(() => {
//       // The link was successfully sent. Inform the user.
//       // Save the email locally so you don't need to ask the user for it again
//       // if they open the link on the same device.
//       window.localStorage.setItem('emailForSignIn', email);
//       // ...
//     })
//     .catch((error) => {
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       console.log(errorCode)
//       console.log(errorMessage)
//       // ...
//     });
// }

// export const emailVerification = () =>{
//   const users = getAuth().currentUser;
//   console.log(users)
//     if (users) {
//       users.sendEmailVerification()
//         .then(() => {
//           // Email verifikasi telah dikirimkan
//           setVerificationSent(true);
//         })
//         .catch(error => {
//           // Terjadi kesalahan dalam mengirim email verifikasi
//           console.error(error);
//         });
//     } else {
//       // Pengguna tidak ditemukan. Mungkin mereka belum masuk.
//       console.log('Pengguna tidak ditemukan.');
//     }
// }

// export const daftarAkunDanVerifikasi = (email, password) =>{

// }
