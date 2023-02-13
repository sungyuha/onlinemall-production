import { useContext, createContext } from "react";

const AuthContext = createContext();

// children를 받아옴
export function AuthContextProvider({children}) {

    return <AuthContext.Provider>
        {/* children 를 받아옴 */}
        {children}
    </AuthContext.Provider>
}

export function useAuthContext() {
    return useContext(AuthContext) ;
}