import React,{useState} from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../components/UI/Button';

export default function ProductDetail() {
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
  }

  return (
    // <div>Product Details</div>
    <section>
      <p>{categroy}</p>
      {/* 상품 이미지 */}
      <img src={image} alt={title} />
      <div>
        {/* 상품 제목.타이틀 */}
        <h2>{title}</h2>
        {/* 상품 가격 */}
        <p>₩{price}</p>
        <p>{description}</p>
        <p>옵션:</p>
        <select onChange={handleSelected} value={selected}>
          {/* 옵션이 있다면 사용자가 마음대로 선택 가능하게. 배열로 받아서 선택가능하게 */}
          {options && options.map((option, index) => (
              // 옵션의 경우에는 변경사항이 없는 예외적으로 배열에 index 사용 가능
              <option key={index}>{option}</option>
            ))}
        </select>
        {/* 장바구나 추가 버튼 */}
        <Button text="장바구니에 추가" onClick={handleClick} />
      </div>
    </section>
  )
}
