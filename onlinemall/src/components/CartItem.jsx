import React from "react";

export default function CartItem({product, product: {id, image, title, option, quantity, price}}) {
    return (
        <li>
            {/* 처음에는 상품 이미지 */}
            <img src={image} alt={title} />
            {/* 상품 정보 */}
            <div>
                <p>{title}</p>
                <p>{option}</p>
            </div>
        </li>
    )
}