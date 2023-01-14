import { initializeApp } from "firebase/app";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_FIREBASEURL,
    projectId: process.env.REACT_APP_FIREBASE_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

export function login() {
    signInWithPopup(auth, provider)
    .then((result) => {
    // 유저 정보 출력
    const user = result.user;
    console.log(user);
    // 에러가 발생할 때
    }).catch(console.error);
}