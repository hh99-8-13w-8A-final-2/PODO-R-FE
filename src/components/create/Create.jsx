import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select'
import { useForm, Controller  } from "react-hook-form";
import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImages } from '@fortawesome/free-regular-svg-icons';
 

const Create = () => {
    const [tagList, setTagList] =useState([]);
    //const [imgList, setImgList] =useState([]);
    const [showImages, setShowImages] = useState([]);


    const handleAddImages = (event) => {
        const imageLists = event.target.files;
        let imageUrlLists = [...showImages];
    
        for (let i = 0; i < imageLists.length; i++) {
          const currentImageUrl = URL.createObjectURL(imageLists[i]);
          imageUrlLists.push(currentImageUrl);
        }
    
        if (imageUrlLists.length > 4) {
          imageUrlLists = imageUrlLists.slice(0, 4);
        }
    
        setShowImages(imageUrlLists);
        console.log(imageUrlLists)
      };
      const handleDeleteImage = (id) => {
        setShowImages(showImages.filter((_, index) => index !== id));
      };

    /* const addImage = (e) =>{
        const SelectImageList = e.target.files;
        const ImgUrlList = [...imgList];
        for(let i = 0 ; i < SelectImageList.length; i++){
            const ImgUrl = URL.createObjectURLI(SelectImageList[i]);
            ImgUrlList.push(ImgUrl);
        }
        if (ImgUrlList.length > 4) {
            ImgUrlList = ImgUrlList.slice(0, 4);
          }
        setImgList(ImgUrlList)
        console.log("a")
    } */

    const handelKeyDown = (e) =>{
        if(e.keyCode !== 32) return
        const value = e.target.value
        if(!value.trim())return
        setTagList([...tagList, value])
        e.target.value = ''
    }

    const removeTag = (index)=>{
        setTagList(tagList.filter((el, i) => i !== index))
    }
    const onSubmit = async () => {
        const form = document.getElementById('myForm');
        const formdata = new FormData(form);
        formdata.append('imgUrl','https://file2.nocutnews.co.kr/newsroom/image/2022/06/23/202206230913355962_0.jpg')
        for (let value of formdata.values()) {
            console.log(value);
          }

        //formdata.append('tag',tagList)
        
       try {
            const header ={
                "Content-Type": `application/json`
            }
            const res = await axios.post("http://3.39.240.159/api/musicals/1/reviews",JSON.stringify(formdata),{headers:header})
            console.log(res)
        } catch (err) {
            console.log(err)
        }
    }

    const {register, handleSubmit, formState:{errors}, watch, control} = useForm();
    const greadeOptions = [
        { value: 'VIP', label: 'VIP' },
        { value: 'R', label: 'R' },
        { value: 'S', label: 'S' },
        { value: 'A', label: 'A' }
      ]
    const floorOptions = [
        { value: '1F', label: '1F' },
        { value: '2F', label: '2F' },
        { value: '3F', label: '3F' }
      ]
    const sectionOptions = [
        { value: null, label: '구역 없음' },
        { value: 'A', label: 'A' },
        { value: 'B', label: 'B' },
        { value: 'C', label: 'C' }
      ]
    const rowOptions = [
        { value: '-1', label: '열 없음' },
        { value: '1', label: '1' },
        { value: '2', label: '2' },
        { value: '3', label: '3' },
        { value: '4', label: '4' },
        { value: '5', label: '5' }
      ]
     
    return (

        <StForm id='myForm' onSubmit={handleSubmit(onSubmit, watch)}>
            <h4>좌석정보</h4>
            <StTopSelectDiv> 
                <div>
                    <Controller name="greade" control={control} rules={{required: "필수로 선택하셔야합니다."}}
                    render={({ field }) => <Select placeholder='좌석등급' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-1)', primary: 'var(--maincolor-1)'},})} {...field} options={greadeOptions} />} />
                    <p className='error'>{errors.greade && errors.greade?.message}</p>
                </div>
                <div>
                    <Controller name="floor" control={control} rules={{required: "필수로 선택하셔야합니다."}}
                    render={({ field }) => <Select placeholder='층' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-1)', primary: 'var(--maincolor-1)'},})} {...field} options={floorOptions} />} />
                    <p className='error'>{errors.floor && errors.floor?.message}</p>
                </div>
                <div>
                    <Controller name="section" control={control} rules={{required: "필수로 선택하셔야합니다."}}
                    render={({ field }) => <Select placeholder='구역' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-1)', primary: 'var(--maincolor-1)'},})} {...field} options={sectionOptions} />} />
                    <p className='error'>{errors.section && errors.section?.message}</p>
                </div>
                <div>
                    <Controller name="row" control={control} rules={{required: "필수로 선택하셔야합니다."}}
                    render={({ field }) => <Select placeholder='열' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-1)', primary: 'var(--maincolor-1)'},})} {...field} options={rowOptions} />} />
                    <p className='error'>{errors.row && errors.row?.message}</p>
                 </div>
                 <div>
                    <input type="number" placeholder='좌석번호' {...register("seat", { min: 1, max: 300 })} />  
                    {errors.seat && errors.seat.type === "max" && <p className='error'> 300이하의 숫자로 입력해주세요. </p>}
                    {errors.seat && errors.seat.type === "max" && <p className='error'> 필수로 선택하셔야합니다. </p>}
                </div>
            </StTopSelectDiv>
            <StRadioDiv>
                <div>
                    <h4>단차</h4>
                    <div className='radio'>
                        <div>
                            <input type="radio" id="gap1" name="gap" value="1"/><label htmlFor="gap1"> <span></span> 나쁨</label>
                        </div>
                        <div>
                            <input type="radio" id="gap2" name="gap" value="2" defaultChecked/><label htmlFor="gap2"> <span></span> 보통</label>
                        </div>
                        <div>
                            <input type="radio" id="gap3" name="gap" value="3"/><label htmlFor="gap3"><span></span> 좋음</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>시야</h4>
                    <div className='radio'>
                        <div>
                            <input type="radio" id="sight1" name="sight" value="1"/><label htmlFor="sight1"> <span></span> 나쁨</label>
                        </div>
                        <div>
                            <input type="radio" id="sight2" name="sight" value="2" defaultChecked/><label htmlFor="sight2"> <span></span> 보통</label>
                        </div>
                        <div>
                            <input type="radio" id="sight3" name="sight" value="3"/><label htmlFor="sight3"><span></span> 좋음</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>음향</h4>
                    <div className='radio'>
                       <div>
                            <input type="radio" id="sound1" name="sound" value="1"/><label htmlFor="sound1"> <span></span> 나쁨</label>
                        </div>
                        <div>
                            <input type="radio" id="sound2" name="sound" value="2" defaultChecked/><label htmlFor="sound2"> <span></span> 보통</label>
                        </div>
                        <div>
                            <input type="radio" id="sound3" name="sound" value="3"/><label htmlFor="sound3"><span></span> 좋음</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h4>조명</h4>
                    <div className='radio'>
                        <div>
                            <input type="radio" id="light1" name="light" value="1"/><label htmlFor="light1"> <span></span> 나쁨</label>
                        </div>
                        <div>
                            <input type="radio" id="light2" name="light" value="2" defaultChecked/><label htmlFor="light2"> <span></span> 보통</label>
                        </div>
                        <div>
                            <input type="radio" id="light3" name="light" value="3"/><label htmlFor="light3"><span></span> 좋음</label>
                        </div>
                    </div>
                </div>
            </StRadioDiv>
            <StCheckbox>
                <h4>추가선택</h4>
                <input type="checkbox" id='block' name='block' />
                <label htmlFor="block">#시야방해있음</label>
                <input type="checkbox" id='operaGrass' name='operaGrass'/>
                <label htmlFor="operaGrass">#오페라글라스필수</label>
            </StCheckbox>
            <div>
                <textarea name="reviewContent" id="reviewContent" cols="30" rows="10" placeholder='내용을 입력하세요.'></textarea>
            </div>
            <h4>사진 추가</h4>
            {/* <div className='image'>
                <label htmlFor="input-file" className='imageAdd'  onChange={handleAddImages}>
                    <input type="file" id="input-file" name='imgUrls' multiple style={{display:'none'}}/>
                    <span><FontAwesomeIcon icon={faImages}></FontAwesomeIcon></span>
                </label>
                {showImages.map((image, id) => (
                    <div key={id} className='imageList' style={{background:`url(${image}) center center / cover no-repeat`}}>
                    <span onClick={() => handleDeleteImage(id)}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></span>
                    </div>
                ))}
            </div> */}
            <div>
            <h4>태그 입력</h4>
            <StTagDiv>
                <input onKeyDown={handelKeyDown} type="text"  placeholder='스페이스바를 눌러 태그를 입력하세요.'/>
            </StTagDiv>
            <StTagDiv>
            {tagList.map((tag, index) => (
                    <div key={tag} className='tagObject'>
                        <span key={tag}>{tag}</span>
                        <span  onClick={()=>removeTag(index)}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></span>
                    </div>
                ))}
            </StTagDiv>
            </div>
            <div className='button'>
                
                <button onClick={onSubmit}>등록</button>
            </div>
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
    .image{
        display: flex;
    }
    .imageAdd{
        width: 100px;
        height: 100px;
        background-color: var(--gray-3);
        border-radius: 8px;
        span{
            color: var(--gray-2);
            display: block;
            width: 100%;
            text-align: center;
            line-height: 100px;
            font-size: 18px;            
        }
    }
    .imageList{
        width: 100px;
        height: 100px;
        background-color: var(--gray-3);
        border-radius: 8px;
        margin-left: 10px;
        position: relative;
        span:last-of-type{
            position: absolute;
            top: 5px;
            right: 5px;
            font-size: 12px;
            color: var(--gray-2);
            background-color: var(--black);
            padding: 1px 4px;
            border-radius: 10px;
            transition: all .3s;
            &:hover{
                background-color: var(--gray-3);
            }
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

const StTopSelectDiv = styled.div`
    display: flex;
    >div{
        width: 20%;
        margin-right: 20px;
        box-sizing: border-box;
        z-index: 4;
        .error {
            margin-top: 5px;
        }
        >div{
            >div{
                background-color: var(--black);
                border-radius: 10px;
                color: var(--white);
                border: 1px solid var(--white);
                >div>div{
                    color: var(--white);
                }
            }
           
        }
    }
    .css-1okebmr-indicatorSeparator{
        background-color: transparent;
    }
`
const StRadioDiv=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    >div{
        width: 18%;
    }
    .radio{
        display: flex;
        justify-content: space-between;
        >div{
            label{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            span{
                margin-bottom: 10px;
                text-align: center;
                z-index: 2;
                &::after{
                    content:'';
                    display: block;
                    width: 4em;
                    height: 2px;
                    background-color:var(--gray-3);
                    margin: 50%;
                    transform: translate(7px, -50%);
                }
            }
        }
        >div:last-of-type{
            span::after{
                display: none;
            }
        }
    }
    input[type="radio"] {
        display:none;
    }
    input[type="radio"] + label span {
        display:inline-block;
        width: 14px;
        height: 14px;
        border-radius: 12px;
        transition: all .3s;
        background-color: var(--gray-3);
    }
    input[type="radio"]:checked + label{
        color: var(--maincolor-1);
    }
    input[type="radio"]:checked + label span {
        background-color: var(--maincolor-1);
        
    }
    label{
        color: var(--gray-2);
    }
`
const StCheckbox =styled.div`
margin-bottom: 40px;
h4{
    margin-bottom: 30px;
}
label {
    margin-right: 20px;
    padding: 8px 15px;
    border-radius:20px;
    box-sizing: border-box;
}
    input[type="checkbox"] {
        display:none;
    }
    input[type="checkbox"] + label{
        color: var(--gray-2);
        border: 1px solid var(--gray-2);
        transition: all .3s;
    }
    input[type="checkbox"]:checked + label{
        color: var(--white);
        background-color: var(--maincolor-1);
        border: 1px solid var(--maincolor-1);
    }
`

const StTagDiv = styled.div`
    margin-top: 10px;
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    gap:2px;
    .tagObject{
        background-color: var(--black);
        border: 1px solid var(--gray-2);
        color: var(--gray-2);
        display: inline-block;
        padding: 8px 15px;
        border-radius: 20px;
        margin-left: 5px;
        margin-top: 5px;
        >span:first-of-type{
         line-height: 20px;
        }
        >span:first-of-type::before{
            content: '#';
        }
        >span:last-of-type{
            color: var(--white);
            margin-left: 8px;
            background-color: var(--gray-3);
            padding: .04em .4em;
            border-radius:20px ;
            font-size: 14px;
            transition: all .3s;
            cursor: pointer;
            &:hover{
                background-color:var(--gray-2);
            }
        }
    }
    input {
        flex-grow: 1;
        outline: none;
        background-color: var(--gray-3);
    }
`