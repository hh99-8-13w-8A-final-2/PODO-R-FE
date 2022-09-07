import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { useForm, Controller  } from "react-hook-form";
import styled from 'styled-components';



const SelectSeat = () => {
    const {register, formState:{errors}, control} = useForm();

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
        { value: 'null', label: '구역 없음' },
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
    );
};

export default SelectSeat;

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