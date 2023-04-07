import React from "react";

export default function Banner() {
    return <section className='h-96 bg-yellow-900 relative'>
        {/* <div> 상품 설명 </div> */}
        <div className='absolute w-full top-32 text-center text-gray-100'>
            <h2>shoppy 상품</h2>
            <p>베스트 상품</p>
            
        </div>
    </section>;
}