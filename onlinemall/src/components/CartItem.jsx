import React from "react";
import {AiOutlinePlusSquare, AiOutlineMinusSquare} from 'react-icons/ai';
import {RiDeleteBin5Fill} from 'react-icons/ri';
import { addOrUpdateToCart } from "../api/firebase";

export default function CartItem({
    product, product: {id, image, title, option, quantity, price},
    uid,
}) {
    
    // 함수가 호출이 되면 
    const handleMinus = () => {
        // 1개만 있을 때 
        if(quantity <2) return;
        // 1개 이상인 경우
        addOrUpdateToCart(); // firebase에 만들어둔 api
    }
    const handlePlus = () => {

    }
    const handleDelte = () => {

    }

    return (
        <li>
            {/* 처음에는 상품 이미지 */}
            <img src={image} alt={title} />
            {/* 상품 정보 */}
            <div>
                <p>{title}</p>
                <p>{option}</p>
                <div>
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