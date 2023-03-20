import React from 'react';
import {useQuery} from '@tanstack/react-query';
import { getProducts } from '../api/firebase';

export default function Products() {
    const {
        isLoading, 
        error, 
        data: products,
        // useQuery로 key와 콜백함수 전달. 인자와 호출하는게 동일하므로 getProducts의 참조값만 전달해줌
        // 캐싱 key 값은 'products'
    } = useQuery(['products'], getProducts);

    return <>
        {/* 로딩중이면 */}
        {isLoading && <p>Loading...</p>}
        {/* 에러가 발생하면 */}
        {error && <p>{error}</p>}
    </>;
}