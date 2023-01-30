import { initializeApp } from "firebase/app";
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get } from "firebase/database";

// firebase SDK
const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_FIREBASE_DB_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
provider.setCustomParameters({
    prompt: 'select_account',
});
const database = getDatabase(app);

export function login() {
    signInWithPopup(auth, provider).catch(console.error);
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
    onAuthStateChanged(auth, async (user) => {
        // 1. 사용자가 있는 경우에 (로그인한 경우)
        const updatedUser = user ? await adminUser(user) : null;
        //유저 정보가 변경 되는 이벤트가 발생 -> 콜백함수를 호출
        // console.log(user);
        callback(updatedUser);
    });
}

// 어드민유저라는 함수를 만들어서 인자인 user를 전달 받음
async function adminUser(user) {
    // 2. 사용자가 어드민 권한을 가지고 있는지 확인
    // 3. {...user, isAdmin: trun/false} -> 어드민이라면 : isAdmin

    // 데이터는 초기화한 database와 admins를 가져옴
    // 여기서 데이터는 then로 전달 받고, 정상적으로 가져와진다면 snapshot으로 가져옴
    return get(ref(database, 'admins')) //
    .then((snapshot) => {
        // 만약에 snapshot이 존재 한다면 
        if(snapshot.exists()) {
            // snapshot의 val를 통해서 정보를 읽어옴
            const admins = snapshot.val();
            // console.log(admins);
            const isAdmin = admins.include(user.uid);
            // 사용자에 있는 모든 정보를 낱개로 풀고, isAdmin이라는 정보도 전달
            return {...user, isAdmin}
        }
        return user;
    });
}