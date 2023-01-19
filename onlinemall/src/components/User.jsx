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
            <span className='hidden md:block'>{displayName}</span>
        </div> 
    );
};