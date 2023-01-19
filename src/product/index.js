import React from 'react';
import { useParams } from 'react-router-dom';
import './index.css'

const ProductPage = () => {
    const {p_id} = useParams();


    return (
        <div className='productDetail'>
            <h2>기초스킨케어 세트</h2>
            <div className='productImg'>
                <img src={`../images/cosmetic${p_id}.JPG`} alt="" />
            </div>
            <div>
                <p>스킨케어 주간 베스트</p>
                <p>헤라 스킨</p>
                <p>가격 : 65,000</p>
                <p>무료배송</p>
            </div>
        </div>
    );
};

export default ProductPage;