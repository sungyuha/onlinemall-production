import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";

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
    return signInWithPopup(auth, provider).catch(console.error);
    // .then((result) => {
    // // 유저 정보 출력
    // const user = result.user;
    // console.log(user);
    // // 로그인한 사용하자가 있다면
    // return user;
    // 에러가 발생할 때
    // }).catch(console.error);
}

export function logout() {
    signOut(auth).catch(console.error);
}

// 특정한 컴포넌트에서 사용자가 로그인 했을 때, 사용자의 정보가 변경 되었을 때
export function onUserStateChange(callback) {
    onAuthStateChanged(auth, (user) => {
        //유저 정보가 변경 되는 이벤트가 발생 -> 콜백함수를 호출
        callback(user);

        // 1. 사용자가 있는 경우에 (로그인한 경우)
        console.log(user);
        // 2. 사용자가 어드민 권한을 가지고 있는지 확인
        // 3. {...user, isAdmin: trun/false} -> 어드민이라면 : isAdmin
    });
}