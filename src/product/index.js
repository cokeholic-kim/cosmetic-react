import axios from 'axios';
import React from 'react';
import { useParams } from 'react-router-dom';
import useAsync from '../customHook/useAsync';
import './index.css'



async function productFetch(id){
    const response = await axios.get(`http://localhost:8080/products/${id}`);
    return response.data
}

const ProductPage = () => {
    const {p_id} = useParams();
    const state = useAsync(()=>productFetch(p_id),[]);
    const {loading,error,data} = state;
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null
    const [Product] = data
    return (
        <div className='productDetail'>
            <h2>기초스킨케어 세트</h2>
            <div className='productImg'>
                <img src={`../images/cosmetic${Product.p_id}.JPG`} alt="" />
            </div>
            <div>
                <p>스킨케어 주간 베스트</p>
                <p>{Product.p_name}</p>
                <p>가격 : {Product.p_price}</p>
                <p>무료배송</p>
            </div>
        </div>
    );
};

export default ProductPage;