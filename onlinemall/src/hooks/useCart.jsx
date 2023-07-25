import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { addOrUpdateToCart, getCart, removeFromCart } from '../api/firebase';
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
    const cartQuery = useQuery(['carts', uid || ''], () => getCart(uid), {
        enabled: !!uid,
    });

    // 중요!! 
    const addOrUpdateItem = useMutation(
        // 내부적으로는 firebase에서 제공해주는 함수 사용
        (product) => addOrUpdateToCart(uid, product),
        {
            onSuccess: () => {
                // 모든 cart의 캐싱을 하는게 아니라 carts이면서 로그인한 사용자 uid가 맞으면 쿼리 무효화하도록
                queryClient.invalidateQueries(['carts', uid]);
            },
        }
    );
    
    // 중요!!
    const removeItem = useMutation((id) => removeFromCart(uid, id), {
        onSuccess: () => {
            queryClient.invalidateQueries(['carts', uid]);
        },
    });

    return { cartQuery, addOrUpdateItem, removeItem };
};