import React from "react";
import { AiOutlineShoppingCart} from 'react-icons/ai';
import {getCart} from '../api/firebase';
import {useQuery} from '@tanstack/react-query';

export default function CartStatus() {
    // useQuery 의 키는 carts, 함수는 getCart
    const {data: produtes} = useQuery(['carts'], getCart);
    return (
        <div>
            {/* 카트 아이콘 */}
            <AiOutlineShoppingCart/>
        </div>
    )
    
}