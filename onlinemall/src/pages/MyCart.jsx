import React from 'react';
import {getCart} from '../api/firebase';
import {useQuery} from '@tanstack/react-query';
import {useAuthContext} from '../context/AuthContext';

export default function MyCart() {
  // 사용자안에 있는 uid
  const {uid} = useAuthContext();

  // useQuery 의 키는 carts, 함수는 getCart에 uid 전달
  const {isLoading, data: produtes} = useQuery(['carts'], () => getCart(uid));

  // 만약에 isLoading이라면 바로 return 
  if(isLoading)return <p>Loading</p>;

  // 로딩이 아닌 경우

  return (
    // 로그인 후 장바구니 버튼 누르면
    <div>My Cart</div>
  )
}
