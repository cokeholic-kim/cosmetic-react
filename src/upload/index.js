import axios from 'axios';
import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'
import { API_URL } from '../config/apiurl';


const UploadPage = () => {
    const navigate=useNavigate()
    const [ formData,setFormData] = useState({ //form안에 입력된데이터들을받아줄상태값
        p_name:"",
        p_price:"",
        p_img:"",
        p_desc:"",
        p_quantity:""
    })
    const onChange = (e)=>{
        const {name,value} = e.target;
        setFormData({
            ...formData,
            [name]:value
        })
    }
    const onReset =()=>{
        setFormData({
            p_name:"",
            p_price:"",
            p_img:"",
            p_desc:"",
            p_quantity:""    
        })
    }
    const onChangeImage = (e)=>{
        const {name}= e.target;
        // 폼 태그 생성
        const imageFormData = new FormData();
        // 폼 태그에 속성 추가하기
        imageFormData.append(name,e.target.files[0]);
        //이미지 업로드 요청(서버로 이미지파일 업로드 요청)
        axios.post(`${API_URL}/upload`,imageFormData,{
            Headers:{'content-type':'multipart/form-data'}
        }).then(res=>{
            setFormData({
                ...formData,
                p_img:res.data.imageURL
            })
        })
        .catch(e=>{
            console.log(e)
        })
    }
    const onSubmit = (e)=>{
        //form에 연결된 이벤트를 제거
        e.preventDefault()
        // 입력이 다 되어있는지 체크
        if(formData.p_name && formData.p_price && formData.p_img && formData.p_desc && formData.p_quantity){
            insertProduct();
        }
    }
    function insertProduct(){
        // 서버에 post요청
        axios.post(`${API_URL}/addProduct`,formData)
        .then(res=>{
            console.log(res); //콘솔에 응답출력
            navigate('/'); //메인화면으로 이동
        })
        .catch(e=>{
            console.log(e)
        })
    }
    return (
        <div className='upload'>
            <h2>제품등록하기</h2>
            <form onSubmit={onSubmit}>
                <table>
                    <thead></thead>
                    <tbody>
                    <tr>
                        <td>상품이름</td>
                        <td>
                            <input type="text" name="p_name" value={formData.p_name} onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>이미지</td>
                        <td>
                            <input type="file" name="file"  onChange={onChangeImage}/>
                            { formData.p_img && <img src={`${API_URL}/upload/${formData.p_img}`} alt=""/>}
                        </td>
                    </tr>
                    <tr>
                        <td>상품가격</td>
                        <td>
                            <input type="number" name="p_price" value={formData.p_price} onChange={onChange}/>
                            
                        </td>
                    </tr>
                    <tr>
                        <td>상품수량</td>
                        <td>
                            <input type="number" name="p_quantity" value={formData.p_quantity} onChange={onChange}/>
                        </td>
                    </tr>
                    <tr>
                        <td>상세설명</td>
                        <td>
                            <textarea name="p_desc" onChange={onChange} value={formData.p_desc}>
                                {formData.p_desc}
                            </textarea>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={2}>
                            <button type='submit'>등록</button>
                            <button type='reset' onClick={onReset}>취소</button>
                        </td>
                    </tr>
                   </tbody>
                    <tfoot></tfoot>
                </table>
            </form>
        </div>
    );
};

export default UploadPage ;