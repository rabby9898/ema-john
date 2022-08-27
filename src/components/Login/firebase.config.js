import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyA7gEuVbg-nVTLdsuNhPEc2ZRqs62XNY2g",
    authDomain: "first-auth-projects.firebaseapp.com",
    projectId: "first-auth-projects",
    storageBucket: "first-auth-projects.appspot.com",
    messagingSenderId: "297022204376",
    appId: "1:297022204376:web:adb8edc92a50cd6670aaad"
  };
  const app = initializeApp(firebaseConfig);
  export const authentication = getAuth(app);