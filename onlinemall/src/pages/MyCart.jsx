import React from 'react';
import {getCart} from '../api/firebase';
import {useQuery} from '@tanstack/react-query';
import {useAuthContext} from '../context/AuthContext';
import CartItem from '../components/CartItem';
import PriceCard from '../components/PriceCard';
import {BsFillPlusCircleFill} from 'react-icons/bs';
import {FaEquals} from 'react-icons/fa';

const SHIPPING = 3000; // 배송비

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

  // 가격 총액
  // totalPrice가 products에 있다면 reduce를 통해서 가격을 더 해줌. 가격만 더하는게 아니고 장바구니에 동일한 제품이 2개 이상 있을 수 있으니 quantity까지 곱해서 계속 더해줌
  const totalPrice = products && products.reduce((prev, currnet) => prev + parseInt(currnet.price) * currnet.quantity, 0);
  
  return (
    // 로그인 후 장바구니 버튼 누르면
    <section className='p-8 flex flex-col'>
      <p className='text-2xl text-center font-bold pb-4 border-b border-gray-300'>내 장바구니</p>
      {/* 장바구니 안에 아무것도 담겨 있지 않다면 */}
      {!hasProducts && <p>장바구니에 상품이 없습니다.</p>}
      {/* 장바구니 안에 상품이 있다면 */}
      {hasProducts && ( 
        <>
          <ul className='border-gray-300 mb-8 p-4 px-8'>
            {/* 모든 제품의 정보를 보여줌 */}
            {/* products이 있다면 products을 map할건데 각 각의 제품을 CartItem 으로 만들어서 보여줌 */}
            {products && products.map((product) => (
              <CartItem key={product.id} product={product} uid={uid} /> /* CartIte에 uid를 props으로 전달 함 */
            ))}
          </ul>
          {/* 상품 총 가격 */}
          <div className='flex justify-between items-center mb-5 px-2 md:px-8 lg:px-16'>
            <PriceCard text='상품 총액' price={totalPrice} />
            <BsFillPlusCircleFill />
            <PriceCard text='배송액' price={SHIPPING} /> {/* SHIPPING은 배송비 변수 */}
            <FaEquals test='총 가격' price={totalPrice + SHIPPING} />
          </div>
        </>
      )}  
    </section>
  );
};
