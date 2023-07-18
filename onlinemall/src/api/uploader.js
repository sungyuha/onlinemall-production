// 비동기 함수로
export async function uploadImage(file) {
    const data = new FormData();
    // 전달 받은 파일
    data.append('file', file);
    // 업로드
    data.append('upload_preset', process.env.REACT_APP_CLOUDINARY_PRESET);
    // URL
    return fetch(process.env.REACT_APP_CLOUDINARY_URL, {
        // 데이터 전달
        method: 'post',
        // NewProduct 폼 데이터
        body: data
    })
    // 결과(res)가 받아와지면 res를 json으로 변환, 그리고 데이터 url를 리턴해줌
    .then(res => res.json()
    .then(data => data.url));
}