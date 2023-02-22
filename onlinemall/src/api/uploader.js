// 비동기 함수로
export async function uploadImage(file) {
    const data = new FormData();
    // 전달 받은 파일
    data.append('file', file);
    // 업로드
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
}