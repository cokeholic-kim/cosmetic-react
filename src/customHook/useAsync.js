import React, { useEffect, useReducer } from 'react';
//1.상태초기화
const initialState = {
    loading:false,
    data:null,
    error:null,
}
//2.리듀서 함수구현
//로딩중일때 상태
//데이터를 성공적으로 받았을때 상태
//에러일때 상태
function reducer(state,action){
    switch(action.type){
        case "LOADING":
            return{
                loading:true,
                data:null,
                error:null,
            }
        case "SUCCESS":
            return{
                loading:false,
                data:action.data,
                error:null,
            }
        case "ERROR":
            return{
                loading:false,
                data:null,
                error:action.error,
            }
        default:
            return state;
    }
}


const useAsync = (callback,deps=[]) => {
    const [state,dispatch] = useReducer(reducer,initialState);
    //데이터 요청 함수
    const fetchData = async ()=>{
        //로딩의 value를 true로 업데이트
        dispatch({
            type:"LOADING"
        });
        // try catch 에러 처리 구문 ,,데이터를 요청하는 과정은 에러발생할 확률이 높음
        try{
            //axios에서 받는 함수가 들어감 useAsync를 사용하는 컴포넌트에서 각각 다른 주소를 넣어서 보내줌
            const data = await callback(); 
            dispatch({
                type:"SUCCESS",
                data  //data : data 인데 같으니까 생략가능함
            })
        }
        catch(e){
            dispatch({
                type:"ERROR",
                error:e
            })
        }
    }
    useEffect(()=>{
        fetchData();
    },deps)
    return state;
};

export default useAsync;