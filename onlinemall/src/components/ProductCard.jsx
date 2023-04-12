import React from 'react';

// product을 props으로 받아옴
export default function ProductCard({
    // 가져오는 값은 id, 이미지, 제목, 카테고리, 가격
    product: {id, image, title, category, price}, // product을 낱개로 풀어서 가져올 수 있음
}) {
    return (
        <li className='rounded-lg shadow-md overflow-hidden cursor-pointer transition-all hover:scale-100'>
            {/* 이미지 */}
            <img className='w-full' src={image} alt={title} />
            {/* 메타 데이터 정보 */}
            <div className='mt-2 px-2 text-lg s flex justify-between items-content'>
                {/* 제목 */}
                <h3 className='truncate'>{title}</h3>
                {/* 한국 원화 표시가 된 가격 */}
                <p className='mb-2 px-2 text-gray-600'>{`₩${price}`}</p> 
            </div>
        </li>
    )
}