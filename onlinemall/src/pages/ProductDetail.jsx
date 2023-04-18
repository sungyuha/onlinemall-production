import React from 'react';
import { useLocation } from 'react-router-dom';

export default function ProductDetail() {
  const {
    // 전달 받은 state를 react-router-dom에서 product으로 낱개로 풀어서 가져옴
    state: {
      product: {id, image, title, description, categroy, price, options}
    }
  } = useLocation(); // useLocation를 통해서 받아올 수 있음
  return (
    <div>Product Details</div>
  )
}
