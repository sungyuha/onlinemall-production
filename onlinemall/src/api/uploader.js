// 비동기 함수로
export async function uploadImage(file) {
    const data = new FormData();
    // 전달 받은 파일
    data.append('file', file);
    // 업로드
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    // URL
    fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        // 데이터 전달
        method: 'post',
        // NewProduct 폼 데이터
        body: data
    })
}