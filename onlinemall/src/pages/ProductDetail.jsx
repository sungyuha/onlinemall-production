import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/UI/Button';
import {useAuthContext} from '../context/AuthContext';
import { addOrUpdateToCart } from '../api/firebase';

export default function ProductDetail() {
  // 사용자안에 있는 uid
  const {uid} = useAuthContext();
  const {
    // 전달 받은 state를 react-router-dom에서 product으로 낱개로 풀어서 가져옴
    state: {
      product: {id, image, title, description, categroy, price, options}
    }
  } = useLocation(); // useLocation를 통해서 받아올 수 있음

  // 옵션이 있다면 제일 첫 번째 값을 선택
  const [selected, setSelected] = useState(options && options[0]);

  const handleSelected = (e) => {
    setSelected(e.target.value);
  }

  const handleClick = (e) => {
    // 장바구니에 추가
    // 장바구니에 추가할 정보 들 중  옵션은 배열이 아닌 선택 된 // quantity는 수량 
    const product = {id, image, title, price, option: selected, quantity: 1};
    // firebase에서 호출
    addOrUpdateToCart(uid, product);
  };

  return (
    // <div>Product Details</div>
    <>
      <p className='mx-12 mt-4 text-gray-750'>{categroy}</p>
      <section className='flex flex-col md:flex-row p-4'> {/* 미디엄 사이즈 부터는 컬럼으로 일렬로 조회*/}
        {/* 상품 이미지 */}
        <img className='w-full px-4 basis-7/12' src={image} alt={title} /> {/* 일렬로 들어왔을 때 basis를 7/12 */}
        {/* 텍스트가 있는 태그 */}
        <div className='w-full basis-5/12 flex-col p-4'>
          {/* 상품 제목.타이틀 */}
          <h2 className='text-3xl font-blod py-2'>{title}</h2>
          {/* 상품 가격 */}
          <p className='text-2xl font-blod py-2 border-b border-gary-450'>₩{price}</p>
          <p className='py-4 text-lg'>{description}</p>
          <div className='flex items-center'>
            <label className='text-brand font-blod' htmlFor='select'>옵션:</label>
            <select id='select' className='p-2 m-4 flex-1 border-2 border-dashed border-brand outlin-none' // 선택했을 때 아웃라인이 없게
            onChange={handleSelected} value={selected}>
              {/* 옵션이 있다면 사용자가 마음대로 선택 가능하게. 배열로 받아서 선택가능하게 */}
              {options && options.map((option, index) => (
                  // 옵션의 경우에는 변경사항이 없는 예외적으로 배열에 index 사용 가능
                  <option key={index}>{option}</option>
                ))}
            </select>
          </div>
          {/* 장바구나 추가 버튼 */}
          <Button text="장바구니에 추가" onClick={handleClick} />
        </div>
      </section>
    </>
  );
};
