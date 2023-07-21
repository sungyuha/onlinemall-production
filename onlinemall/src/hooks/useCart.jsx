import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getCart } from '../api/firebase';
import { useAuthContext } from "../context/AuthContext";

export default function useCart() {
    // useAuthContext로 현재 사용자의 uid를 받아옴
    const {uid} = useAuthContext();
    // queryClient 정의
    const queryClient = useQueryClient();
    /* 
    1) Cart를 읽어오는건 caryQuery로 useQuery 사용
    2) carts 인데 사용자별로 캐싱이 이루어지도록 uid 설정
    3) 그런데 사용자가 로그인을 하지 않으면 쿼리가 실행되지 않도록 enabled 옵션 사용
    */
    const caryQuery = useQuery(['carts', uid || ''], () => getCart(uid), {
        enabled: !!uid,
    });

    const addOrUpdareItem = useMutation();

    return (
        <div>
            {/* 장바구니 관련 firebase 처리 모아놓은 useCart */}
        </div>
    );
};