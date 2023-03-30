import React from 'react';

// product을 props으로 받아옴
export default function ProductCard({
    product: {id, image, title, category, price}, // product을 낱개로 풀어서 가져올 수 있음
}) {
    return (
        <li className='rounded-lg shadow-md overflow-hidden cursor-porint'>
            {/* 이미지 */}
            <img className='w-full' src={image} alt={title} />
            {/* 메타 데이터 정보 */}
            <div>
                {/* 제목 */}
                <h3>{title}</h3>
                {/* 한국 원화 표시가 된 가격 */}
                <p>{`₩price`}</p> 
            </div>
        </li>
    )
}