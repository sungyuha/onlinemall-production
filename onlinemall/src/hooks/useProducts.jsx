import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProducts as fetchProducts, addNewProduct } from '../api/firebase';

export default function useProducts() {
    const queryClient = useQueryClient();

    // useQuery로 key와 콜백함수 전달. 인자와 호출하는게 동일하므로 getProducts의 참조값만 전달해줌
    // 캐싱 key 값은 'products'
    // getProducts로 데이터 읽어옴 -> 이름을 ProductsQuery로 변경
    const ProductsQuery = useQuery(['products'], fetchProducts, {
        staleTime: 1000 * 60,
    }); 

    // useMutation를 사용하려면 콜백함수를 만들어줘야 함
    const addProduct = useMutation(
        // product, url를 낱개로 인자로 전달 해줌
        // addNewProduct(product, url)으로 전달 받음
        ({product, url}) => addNewProduct(product, url),
        {
            // Mutation의 업데이트가 성공하면
            onSuccess: () => queryClient.invalidateQueries(['products']), // ['proudcts']이라는 key를 가진 캐시
        }
    );

    return {ProductsQuery, addProduct};
};