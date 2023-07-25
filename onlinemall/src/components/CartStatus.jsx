import React from "react";
import {AiOutlineShoppingCart} from 'react-icons/ai';
//import {getCart} from '../api/firebase';
//import {useQuery} from '@tanstack/react-query';
//import {useAuthContext} from '../context/AuthContext';
import useCart from '../hooks/useCart';

export default function CartStatus() {
    const {
        // cartQuery에 데이터를 낱개로 가져옴
        cartQuery: { data: products },
    } = useCart();

    /* // 사용자안에 있는 uid
    // const {uid} = useAuthContext(); */

    /* // useQuery 의 키는 carts, 함수는 getCart에 uid 전달
    // const {data: products} = useQuery(['carts'], () => getCart(uid)); */
    return (
        <div className='relative'>
            {/* 카트 아이콘 */}
            <AiOutlineShoppingCart className='text-4xl'/>
            {/* produtes이 있다면 p태그 안에 produtes.length가 출력 됨 */}
            {products && (
                <p className='w-6 h-6 text-center bg-brand text-white fond-blod rounded-full absolute -top-1 -right-2' >
                    {products.length}
                </p>
            )}
        </div>
    );
};