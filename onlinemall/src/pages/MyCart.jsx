import React from 'react';
import {getCart} from '../api/firebase';
import {useQuery} from '@tanstack/react-query';
import {useAuthContext} from '../context/AuthContext';

export default function MyCart() {
  return (
    // 로그인 후 장바구니 버튼 누르면
    <div>My Cart</div>
  )
}
