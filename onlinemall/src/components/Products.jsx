import React from 'react';
import {useQuery} from '@tanstack/react-query';
import { getProducts } from '../api/firebase';
import ProductCard from './ProductCard';

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
        <ul>
            {/* products이 있다면 products 컴포넌트로 map으로 ProductCard에 전달 */} {/* 고유의 key 값은 products.id */}
            {products && products.map(product => (
                <ProductCard key={products.id} product={product} />
            ))}
        </ul>
    </>;
}