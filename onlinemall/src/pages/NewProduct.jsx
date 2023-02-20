import React, {useState} from 'react';

export default function NewProduct() {

  const [product, setProjduct] = useState({});
  // image 상태값
  const [file, setFile] = useState();

  const handleSubmit = (e) => {
    const {name, value, files} = e.target;
    // 만약에 input의 이름이 파일의 경우에는
    if(name === 'file') {
      // 이미지를 하나만 선택 된 첫 번째만 setFile를 해줌
      setFile(files && files[0]);
    }

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
