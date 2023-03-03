import React, {useState} from 'react';
import { uploadImage } from '../api/uploader';
import { addNewProduct } from '../api/firebase';
import Button from '../components/UI/Button';
// import '../index.css';

export default function NewProduct() {

  const [product, setProjduct] = useState({});
  // image 상태값
  const [file, setFile] = useState();
  // 업로드중인지 확인
  const [isUploading, setISUploading] = useState(false);
  // 업로드 업로드 성공했을 때 메시지 전송
  const [success, setSuccess] = useState();

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
    setISUploading(true);

    // Submit이 되었을 때
    // 선택한 파일을 먼저 업로드 한 다음에 
    uploadImage(file) // 
    // url 전달
    .then(url => {
      // 새로운 제품 등록
      console.log(url);
      // Firebase에 새로운 제품 데이터 저장(+추가)
      addNewProduct(product, url) // addNewProduct 호출해줌
      // addNewProduct이 성공이게 된다면
      .then(() => {
        // 성공한 결과 값 - 문구
        setSuccess('성공적으로 제품이 추가되었습니다.');
        setTimeout(() => {
          // 일정시간이 지나면 setSuccess를 null 값으로 초기회 - 4초
          setSuccess(null);
        }, 4000);
        });
      
      //제품의 사진을 Cloudinary에 업로드 하고 URL 정보
    })
    // 업로드가 완료되면 실패or성공해도
    .finally(() => setISUploading(false));
  };

  return (
    <section className='w-full text-center'>
      <h2 className='text-2xl font-bold my-4'>새로운 제품 등록</h2>
      {/* 제품이 성공적으로 등록이 완료 되면 */}
      {success && <p className='my-2'>✅ {success}</p>}
      {/* 파일이 있다면 선택 된 URL을 file에 전달 */}
      {file && <img className='w-96 mx-auto mb-2' src={URL.createObjectURL(file)} alt='파일' />}
      <form className='flex flex-col px-12' onSubmit={handleSubmit}>
        <h4>New Products</h4>
        <input className='p-4 online-none border border-gray-300 my-1' type='file' accept='image/*' name='file' placeholder='제품명' required onChange={handleChange} />
        {/* title이 없다면 '' 텅 빈 문자열 */}
        <input className='p-4 online-none border border-gray-300 my-1' type='text' name='title' value={product.title ?? ''} placeholder='옵션들(콤마(,)로 구분)' required onChange={handleChange} />
        {/* 업로드 중이면 버튼 비활섷롸(=disabled) */}
        <Button text={isUploading ? '업로드중..' : '제품 등록하기'} disabled={isUploading} />
      </form>
    </section>
  );
}
