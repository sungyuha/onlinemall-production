import React from "react";

export default function Banner() {
    return <section className='h-96 bg-yellow-900 relative'>
        {/* width와 height full 사이즈, background-cover */}
        <div className='w-full h-full bg-cover bg-hanner opacity-85' />
        <div className='absolute w-full top-32 text-center text-gray-100'>
            <h2 className='text-6xl'>shoppy 상품</h2>
            <p className='text-2xl'>베스트 상품</p>
        </div>
    </section>;
}