import React, {useState} from 'react';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';

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
      return;
    }
    // 그 나머지의 경우네는. 이전의 product 값을 받아와서
    setProjduct((product) => ({...product, [name]:value})); // 새로운 오브젝트인 product와 입력 폼에서 변경이 발생한 name의 key에 value를 할당해줌
  };
  // onSubmit 버튼을 누르면
  const handleChange = (e) => {
    e.preventDefault();

    // Submit이 되었을 때
    // 선택한 파일을 먼저 업로드 한 다음에 
    uploadImage(file)
    // url 전달
    .then(url => {
      // 새로운 제품 등록
      console.log(url);
      // Firebase에 새로운 제품 데이터 저장(+추가)
      addNewProduct(product, url); // addNewProduct 호출해줌
      
      //제품의 사진을 Cloudinary에 업로드 하고 URL 정보
    })
  };

  return (
    <section>
      {/* 파일이 있다면 선택 된 URL을 file에 전달 */}
      {file && <img src={URL.createObjectURL(file)} alt='파일' />}
      <form onSubmit={handleSubmit}>
        <h4>New Products</h4>
        <input type='file' accept='image/*' name='file' required onChange={handleChange} />
        {/* title이 없다면 '' 텅 빈 문자열 */}
        <input type='text' name='title' value={product.title ?? ''} placeholder='제품명' required onChange={handleChange} />
      </form>
    </section>
  );
}
