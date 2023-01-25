import axios from 'axios';
import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import useAsync from '../customHook/useAsync';
import './index.css'



async function productFetch(id){
    const response = await axios.get(`http://localhost:8080/products/${id}`);
    return response.data
}

const ProductPage = () => {
    const navigate = useNavigate();
    const {p_id} = useParams();
    const state = useAsync(()=>productFetch(p_id),[]);
    const {loading,error,data} = state;

    // 삭제하기
    const onDelete = ()=>{
        axios.delete(`http://localhost:8080/delProduct/${p_id}`) //get,post,delete,patch
        .then(result=>{
            console.log("삭제되었습니다.")
            navigate('/')
        })
        .catch(error=>{
            console.log(error)
        })
    }

    if (loading) return <div>로딩중</div>
    if (error) return <div>에러발생</div>
    if (!data) return null
    const [Product] = data
    return (
        <div className='productDetail'>
            <h2>기초스킨케어 세트</h2>
            <div className='productImg'>
                <img src={`../images/cosmetic${Product.p_id}.JPG`} alt="" />
                <img src = {`http://localhost:8080/upload/${Product.p_img}`} alt=""/>
            </div>
            <div>
                <p>스킨케어 주간 베스트</p>
                <p>{Product.p_name}</p>
                <p>가격 : {Product.p_price}</p>
                <p>무료배송</p>
            </div>
            <div>
                <button onClick={onDelete}>삭제</button>
            </div>
        </div>
    );
};

export default ProductPage;