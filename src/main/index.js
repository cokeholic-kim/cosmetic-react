import axios from 'axios';
import React from 'react';
import { Link } from 'react-router-dom';
import ProductList from '../components/ProductList';
import useAsync from '../customHook/useAsync'
import './index.css';

async function productFetch(){
    const response = await axios.get("http://localhost:8080/products");
    return response.data
}

const MainPage = () => {
    const state = useAsync(productFetch,[])
    const{loading,error,data}=state;
    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null
    console.log(data)
    return (
        <div className='main'>
            <div className='visual'>
                <img src ="images/banner1.jpg" alt="배너이미지1"/>
            </div>
            <div className='product'>
                <h2>신상품</h2>
                <ul>
                    {data.map(pro=>
                    <ProductList key={pro.p_id} p_id={pro.p_id} p_name={pro.p_name} p_price={pro.p_price}/>)}
                </ul>
            </div>
        </div>
    );
};

export default MainPage;