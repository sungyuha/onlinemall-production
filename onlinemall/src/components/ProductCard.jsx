import React from 'react';

// product을 props으로 받아옴
export default function ProductCard({
    product: {id, image, title, category, price}, // product을 낱개로 풀어서 가져올 수 있음
}) {
    return (
        <div>ProductCard</div>
    );
}