import React from 'react';
import {useNavigate} from 'react-router-dom';

// product을 props으로 받아옴
export default function ProductCard({
    // product에 접근 - 인자로 정리
    product,
    // 가져오는 값은 id, 이미지, 제목, 카테고리, 가격
    product: {id, image, title, category, price}, // product을 낱개로 풀어서 가져올 수 있음
}) {
    const naviate = useNavigate();
    return (
        <li onClick={() => {
            // naviate함수를 이용해서 원하는 경로를 지정 - 제품 페이지로
            // state는 해당 데이터. value값도 product으로 생략
            naviate(`/products/${id}`, { state: {product} }); // product에 접근이 안되므로 위에 접근 가능하게
        }} className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-105'>
            {/* 이미지 */}
            <img className='w-full' src={image} alt={title} />
            {/* 메타 데이터 정보 */}
            <div className='mt-2 px-2 text-lg s flex justify-between items-content'>
                {/* 제목 */}
                <h3 className='truncate'>{title}</h3>
                {/* 한국 원화 표시가 된 가격 */}
                <p>{`₩${price}`}</p>
            </div>
            <p className='mb-2 px-2 text-gray-600'>{category}</p>
        </li>
    );
}