import { initializeApp } from "firebase/app";
import { v4 as uuid } from 'uuid';
import { 
    getAuth, 
    signInWithPopup, 
    GoogleAuthProvider,
    signOut,
    onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, set, get, remove } from "firebase/database";

// firebase SDK -> 오류 사항 : firebase 버젼이 안맞아서 발생 => 현재는 오류 해결 완료
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
// 구글 로그인 캐시 초기화
provider.setCustomParameters({
    prompt: 'select_account',
});
const database = getDatabase(app);

export function login() {
    signInWithPopup(auth, provider).catch(console.error);
    /* .then((result) => {
    // 유저 정보 출력
    const user = result.user;
    console.log(user);
    // 로그인한 사용하자가 있다면
    return user;
    // 에러가 발생할 때
    }).catch(console.error); */
}

// 로그아웃
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
            const isAdmin = admins.includes(user.uid);
            // 사용자에 있는 모든 정보를 낱개로 풀고, isAdmin이라는 정보도 전달
            return {...user, isAdmin}
        }
        return user;
    });
}

// 제품 등록
export async function addNewProduct(product, imageUrl){ // async 붙여서 비동기로, product으로 제품의 정보 받아오고, imageUrl를 인자로 받아옴
    // 고유한 아이디
    const id = uuid();
    // 제품 고유 번호. set 데이터 받음
    return set(ref(database, `products/${id}`), {
        // 모든 키의 product 정보를 복사
        ...product,
        id,
        // 문자열로 받아서 number로 저장해주기 위해. product의 price를 Int 형태로 변환 -> 그래야 숫자로 DB에 저장
        price: parseInt(product.price),
        image: imageUrl,
        // 배열 형태로 저장
        options: product.options.split(','),
    });
}

// 상품 불러오기(조회)
export async function getProducts() {
    return get(ref(database, 'products'))
    .then(snapshot => {
        // 만약에 snapshot이 존재한다면
        if(snapshot.exists()){
            // 자바스크립트의 Object.values를 이용해서 snapshot이 가지고 있는 객체 불어옴 ex) 제품의 정보, id키 값
            return Object.values(snapshot.val());
        }
        // snapshot이 없다면 빈 배열을 리턴해줌
        return [];
    });
}

// 사용자에 대한 카트(장바구니)
export async function getCart(userId) {
    // carts안에 사용자의 아이디 == userId를 가져옴
    return get(ref(database, `carts/${userId}`))
    .then((snapshot) => {
        // 데이터 읽어옴. 만약에 없다면 텅 빈 오브젝트 사용
        const items = snapshot.val() || {};
        return Object.values(items);
    });
}

// 장바구니에 추가 & 변경할 때
export async function addOrUpdateToCart(userId, product) { // product에는 제품의 가격 & 카트에 추가하는 수량 정보가 들어있음
    // carts안에 사용자의 아이디 == userId
    return set(ref(database, `carts/${userId}/${product.id}`), product);
}

// 카드에 담긴 정보 삭제
export async function removeFromCart(userId, productId) {
    return remove(ref(database, `carts/${userId}/${productId}`));
}