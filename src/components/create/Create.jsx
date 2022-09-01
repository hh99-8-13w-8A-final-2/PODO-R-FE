import React, { useState } from 'react';
import axios from 'axios';
import Select from 'react-select'
import { useForm, Controller  } from "react-hook-form";
import styled from 'styled-components';


const Create = () => {
    const []
    const onSubmit = async () => {
        const form = document.getElementById('myForm');
        const formdata = new FormData(form)
        
       console.log([...formdata])
       /* try {
            const res = await axios.post("http://localhost:3001/reviews",formdata,{})
            console.log(res)
        } catch (err) {
            console.log(err)
        } */
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
        { value: '-1', label: '구역 없음' },
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
                <input type="checkbox" id='operaGrass' name='operaGrass' />
                <label htmlFor="operaGrass">#오페라글라스필수</label>
            </StCheckbox>
            <div>
                <textarea name="reviewContent" id="reviewContent" cols="30" rows="10" placeholder='내용을 입력하세요.'></textarea>
            </div>
            <div>
                <input type="text" placeholder='태그를 입력하세요.'/>
            </div>
            <button>제출</button>
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
