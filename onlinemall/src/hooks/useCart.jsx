import { useQueryClient } from "@tanstack/react-query";
import {useAuthContext} from "../context/AuthContext";

export default function useCart() {
    // useAuthContext로 현재 사용자의 uid를 받아옴
    const {uid} = useAuthContext();
    // queryClient 정의
    const queryClient = useQueryClient();
    return (
        <div>
            
        </div>
    );
};