import React, { useState } from 'react';
import axios from 'axios';
import { useForm, Controller  } from "react-hook-form";
import styled from 'styled-components';
import Tag from './Tag';
import ImageAdd from './ImageAdd';
import SelectSeat from './SelectSeat';
import RadioSelect from './RadioSelect';
import CheckboxSelect from './CheckboxSelect';
import customAxios from '../../shared/customAxios'
import { useLocation, useNavigate } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Create = () => {
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(3,1).toString()
    const navigate = useNavigate();
    const [tagList, setTagList] =useState([]);
    const imgfiles = []; // 이미지 파일

    const onSubmit = async () => {
        //이미지 업로드 
        const imgFormdata = new FormData();
        //imgFormdata.append('image',imgfiles)
        for(let i = 0; i < imgfiles.length; i++){
            imgFormdata.append('image',imgfiles[i])
        }
        // 폼 데이터
        const form = document.getElementById('myForm');
        const formdata = new FormData(form);
        formdata.append('tags',tagList)
        
        for (let key of imgFormdata.keys()) {
            console.log(key);
     }
        for (let value of imgFormdata.values()) {
            console.log(value);
      }
        
       try {
            const jsonType ={"Content-Type": "application/json"}
            const multipartType ={"Content-Type": "multipart/form-data"}
            const res1 = await axios.post('http://3.39.240.159/api/image/upload',imgFormdata,{headers:multipartType});
            //이미지 
            
            const obj = {};
            formdata.forEach(function (value, key){
                obj[key] = value;
            })
            obj.imgUrls = res1.data.imageUrl

            const json = JSON.stringify(obj)
            console.log(json)
            await axios.post(`http://3.39.240.159/api/musicals/${musicalId}/reviews`,json, {headers:jsonType});
            navigate(-1)
        } catch (err) {
            console.log(err)
        }
    }

    const {handleSubmit, formState:{errors}, watch} = useForm();
    
    return (
        <StForm id='myForm' onSubmit={handleSubmit(onSubmit, watch)}>
            <h4>좌석정보</h4>
            <SelectSeat />
            <RadioSelect/>
            <CheckboxSelect/>
            <div>
                <textarea name="reviewContent" id="reviewContent" cols="30" rows="10" placeholder='내용을 입력하세요.'></textarea>
            </div>
            <ImageAdd imgfiles={imgfiles}/>
            <Tag setTagList={setTagList} tagList={tagList}/>
            <div className='button'>
                <button type='submit' >등록</button>
            </div>
            <ToastContainer />
        </StForm>
    );
};

export default Create;

const StForm = styled.form`
width: 70%;
margin: 0 auto;
    h4{
        color: var(--gray-2);
        font-size: 18px;
        margin: 40px 0 20px;
    }
    textarea{
        width: 100%;
        height: 250px;
        font-size: 16px;
    }
    input {
        font-size: 16px;
    }
    .file {
        margin-top: 10px;
        input{
            width: 100%;
        }
    }
    
    .button{
        text-align: center;
        button{
            padding: 10px 40px;
            border-radius: 8px;
            margin: 40px 10px 0 ;
            color:var(--gray-2);
            background-color: var(--black);
            border: 1px solid var(--gray-2);
            cursor: pointer;
            transition: all .3s;
            &:hover{
                background-color: var(--maincolor-1);
                color:var(--white);
                border-color:var(--maincolor-1);
            }
        }
    }
`
