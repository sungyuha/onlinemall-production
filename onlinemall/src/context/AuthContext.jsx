import { useState, useEffect, useContext, createContext } from "react";
import { login, logout, onUserStateChange } from '../api/firebase';

const AuthContext = createContext();

// children를 받아옴
export function AuthContextProvider({children}) {
    // 처음에는 사용자가 없으므로 아무것도 설정하지 않음 -> useState();
    const [user, setUser] = useState();

    useEffect(() => {
        // firebase에 있는 콜백함수 호출
        // 로그안한 사용자의 세션이 남아있으면 정상적인 유저의 객체가 전달 됨
        /*onUserStateChange((user) => {
        //user의 정보를 전달 받음
        console.log(user);
        // 유저의 객체가 남아있으면 우리의 컴포넌트에 상태를 업데이트
        setUser(user);
        //   // 로그아웃 하면 사용자 정보가 없어서 null 값이 전달 됨
        })*/

        // 인자가 동일해서 참조값만 전달
        onUserStateChange(user => {
            console.log(user);
            setUser(user);
        });
    }, []);

        /*const handleLogin = () => {
        // firebase에 있는 로그인 함수 호출
        login();
    }; */

    /* const handleLogout = () => {
        // firebase에 있는 로그아웃 함수 호출
        logout();
    }; */

    // 자식 컴포넌트에 접근 가능한 user // 모든 자식 컨포넌트에는 사용자(user)의 정보와 login, logout 함수까지 접근 가능
    return <AuthContext.Provider value={{user, login, logout}}> {/* firebase 참조값인 login & logout 연결, 함수 생략 가능 */}
        {/* children 를 받아옴 */}
        {children}
    </AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext);
}