import React from "react";

// {user} 안에 유저 정보 데이터 받아옴
export default function User({user: {photoURL, displayName}}) {
    return (
        <div className='flex items-center'>
            <img 
                className='w-10 h-10 rounded-full mr-2' 
                src={photoURL} 
                alt={displayName} 
            />
            {/* 반응형 / 사이즈가 미디엄이 되면 displayName이 숨어있지 말고 나타남 */}
            <span className='hidden md:block'>{displayName}</span>
        </div> 
    );
};