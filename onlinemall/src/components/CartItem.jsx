import React from "react";
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import { addOrUpdateToCart, removeFromCart } from "../api/firebase";

export default function CartItem({
    product, product: {id, image, title, option, quantity, price},
    uid,
}) {
    
    // 함수가 호출이 되면 
    const handleMinus = () => {
        // 1개만 있을 때 
        if(quantity <2) return;
        // 1개 이상인 경우 // firebase에 만들어둔 api //사용하려면 uid를 전달 받아야 함. MyCart에서 props으로 전달 받음
        addOrUpdateToCart(uid, {...product, quantity: quantity - 1 }); // 사용자의 제품을 업데이트
    }
    const handlePlus = () => {
        // 제품 업데이트 되는데 quantity만 변경 // 가지고 있는 quantity에서 플러스 1을 해줘
        addOrUpdateToCart(uid, {...product, quantity: quantity + 1 });
    }
    const handleDelte = () => {
        // 삭제 할 제품 호출
        removeFromCart(uid, id);
    }

    return (
        <li className='flex justify-between my-2 items-center'>
            {/* 처음에는 상품 이미지 */}
            <img className='w-24 md:w-48 rounded-lg' src={image} alt={title} />
            {/* 상품 정보 */}
            <div className='flex-1 flex justify-between ml-4'>
                <div className='basis-3/5'>
                    <p className='text-lg'>{title}</p>
                    <p className='text-xl font-bold text-brand'>{option}</p>
                    <p>₩{price}</p>
                </div>
                <div className='text-2xl flex items-center'>
                    {/* 수량 아이콘 */}
                    <AiOutlineMinusSquare onClick={handleMinus} /> {/* 마이너스 */}
                    <span>{quantity}</span>
                    <AiOutlinePlusSquare onClick={handlePlus} /> {/* 플러스 */}
                    <RiDeleteBin5Fill onClick={handleDelte} /> {/* 삭제 */}
                </div>
            </div>
        </li>
    )
}