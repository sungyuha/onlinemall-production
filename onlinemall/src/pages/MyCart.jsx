import React from 'react';
import {getCart} from '../api/firebase';
import {useQuery} from '@tanstack/react-query';
import {useAuthContext} from '../context/AuthContext';
import CartItem from '../components/CartItem';

export default function MyCart() {
  // 사용자안에 있는 uid
  const {uid} = useAuthContext();

  // useQuery 의 키는 carts, 함수는 getCart에 uid 전달
  const {isLoading, data: products} = useQuery(['carts'], () => getCart(uid));

  // 만약에 isLoading이라면 바로 return 
  if(isLoading) 
    return (
      <p>Loading</p>
    );

  // 로딩이 아닌 경우
  // hasProducts == 제품이 있는지 검사
  const hasProducts = products && products.length > 0;

  return (
    // 로그인 후 장바구니 버튼 누르면
    <section>
      <p>내 장바구니</p>
      {/* 장바구니 안에 아무것도 담겨 있지 않다면 */}
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {/* 장바구니 안에 상품이 있다면 */}
      {hasProducts && ( 
        <>
          <ul>
            {/* 모든 제품의 정보를 보여줌 */}
            {/* products이 있다면 products을 map할건데 각 각의 제품을 CartItem 으로 만들어서 보여줌 */}
            {products && products.map((product) => (
              <CartItem key={product.id} product={product} />
            ))}
          </ul>
        </>
      )}  
    </section>
  )
}
