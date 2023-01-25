import React from 'react';
import { Link } from 'react-router-dom';

const ProductList = ({p_id,p_price,p_name,p_img}) => {
    return (
        <Link to={`/detailView/${p_id}`}>
            <li>
                <img src={`../${p_img}`} alt=""/>
                <img src = {`http://localhost:8080/upload/${p_img}`} alt=""/>
                <h3>{p_name}</h3>
                <p>{p_price}원</p>
                <p>간단한 설명입니다.</p>
            </li>
        </Link>
    );
};

export default ProductList;