import React, {useSteate} from 'react';

export default function NewProduct() {

  const [product, setProjduct] = useSteate({});
  const handleSubmit = (e) => {
    // 
    const {name, value, files} = e.target;
    // 이전의 product 값을 받아와서 
    setProjduct((product) => ({...product, [name]:value})); // 새로운 오브젝트인 product와 입력 폼에서 변경이 발생한 name의 key에 value를 할당해줌
  };
  const handleChange = (e) => {
    
  };

  return (
    <section>
      <form onSubmit={handleSubmit}>
        <h4>New Products</h4>
        <input type='file' accept='image/*' name='file' required onChange={handleChange} />
      </form>
    </section>
  );
}
