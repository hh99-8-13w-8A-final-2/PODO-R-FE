import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import { useForm, Controller  } from "react-hook-form";
import styled from 'styled-components';
import axios from 'axios';
import {useLocation} from "react-router-dom";
const SelectSeat = () => {

    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(3,1).toString()

    const {register, formState:{errors}, control, watch} = useForm({
        defaultValues: {
            floor : '1F'
        }
    });
    const [Data, setData] = useState([]); //좌석 정보
    const [Data1,setData1] =useState([]); //1층 섹션, row 정보
    const [Data2,setData2] =useState([]); //2층 섹션, row 정보
    const [Data3,setData3] =useState([]); //3층 섹션, row 정보
    const [Data4,setData4] =useState([]); //발코니 섹션, row 정보
    const floorOptions =[]; //층 select에 넣어주는 값
    const sectionOptions =[]; //구역 select에 넣어주는 값
    const rowOptions =[]; //열 select에 넣어주는 값
    const [selectFloor, setSelectFloor] = useState({value : '0'}); //선택한 층
    const [selectSection, setSelectSection] = useState({value : '0'}); //선택한 구역
    const [selectRow, setSelectRow] = useState({value : '0'}); //선택한 열
    const onChangeSelect = () =>{
        setSelectFloor(watch("floor"))
    }
    const URI = {
        BASE : process.env.REACT_APP_BASE_URI
      }
    
    const getSeat = async() => {
        const res = await axios.get(`${URI.BASE}/${musicalId}/seats`)
        const data = res.data // 전체 좌석정보
        
        setData(data)
        for(var i in data){
            if(i === '0'){
                const data = res.data[i].sections
                setData1(data)
                
            }else if(i === '1'){
                const data = res.data[i].sections
                setData2(data)
            }else if(i === '2'){
                const data = res.data[i].sections
                setData3(data)
            }else{
                const data = res.data[i].section
                setData4(data)
            }
        }
    }; 
    useEffect(()=>{
        getSeat();
        //console.log('http://3.39.240.159/api/musicals/1/reviews',query)
    },[]);

    for (var floor in Data){
        const data1 = Data[floor]
        floorOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
    }
    if (watch("floor").value === "1층"){
        for (var section in Data1){
            const data1 = Data1[section]
            if(data1.section === "0"){
                sectionOptions.push({"value" : "0" , "label":"구역 없음"})
            }else{
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
        if(watch("section") !== undefined){
            const rowdata = Data1.findIndex( (e) => e.section === watch("section").value)
            if(rowdata !== -1){
                for(var rows in Data1[rowdata].rows){
                    const data1 = Data1[rowdata].rows[rows]
                    if(data1 === "0"){
                        rowOptions.push({"value" : "0" , "label":"열 없음"})
                    }else{
                        if(Object.values(data1).length === 1){
                            rowOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
                        }else{
                            rowOptions.push({"value" : Object.values(data1)[0]+Object.values(data1)[1] , "label" : Object.values(data1)[0]+Object.values(data1)[1]})
                        }
                    } 
                }
            }
        }
    }else if (watch("floor").value === "2층"){
        for (var section in Data2){
            const data1 = Data2[section]
            if(data1.section === "0"){
                sectionOptions.push({"value" : "0" , "label":"구역 없음"})
            }else{
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
        if(watch("section") !== undefined){
            const rowdata = Data1.findIndex( (e) => e.section === watch("section").value)
            if(rowdata !== -1){
                for(var rows in Data1[rowdata].rows){
                    const data1 = Data1[rowdata].rows[rows]
                    if(data1 === "0"){
                        rowOptions.push({"value" : "0" , "label":"열 없음"})
                    }else{
                        if(Object.values(data1).length === 1){
                            rowOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
                        }else{
                            rowOptions.push({"value" : Object.values(data1)[0]+Object.values(data1)[1] , "label" : Object.values(data1)[0]+Object.values(data1)[1]})
                        }
                    }
                }
            }
        }
    }else if (watch("floor").value === "3층"){
        for (var section in Data3){
            const data1 = Data3[section]
            if(data1.section === "0"){
                sectionOptions.push({"value" : "0" , "label":"구역 없음"})
            }else{
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
        if(watch("section") !== undefined){
            const rowdata = Data1.findIndex( (e) => e.section === watch("section").value)
            if(rowdata !== -1){
                for(var rows in Data1[rowdata].rows){
                    const data1 = Data1[rowdata].rows[rows]
                    if(data1 === "0"){
                        rowOptions.push({"value" : "0" , "label":"열 없음"})
                    }else{
                        if(Object.values(data1).length === 1){
                            rowOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
                        }else{
                            rowOptions.push({"value" : Object.values(data1)[0]+Object.values(data1)[1] , "label" : Object.values(data1)[0]+Object.values(data1)[1]})
                        }
                    } 
                }
            }
        }
    }else if (watch("floor").value === "발코니"){
        for (var section in Data4){
            const data1 = setData4[section]
            if(data1.section === "0"){
                sectionOptions.push({"value" : "0" , "label":"구역 없음"})
            }else{
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
        if(watch("section") !== undefined){
            const rowdata = Data1.findIndex( (e) => e.section === watch("section").value)
            if(rowdata !== -1){
                for(var rows in Data1[rowdata].rows){
                    const data1 = Data1[rowdata].rows[rows]
                    if(data1 === "0"){
                        rowOptions.push({"value" : "0" , "label":"열 없음"})
                    }else{
                        if(Object.values(data1).length === 1){
                            rowOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
                        }else{
                            rowOptions.push({"value" : Object.values(data1)[0]+Object.values(data1)[1] , "label" : Object.values(data1)[0]+Object.values(data1)[1]})
                        }
                    } 
                }
            }
        }
    }
    else{} 
    const greadeOptions = [
        { value: 'VIP', label: 'VIP' },
        { value: 'OP', label: 'OP' },
        { value: 'R', label: 'R' },
        { value: 'S', label: 'S' },
        { value: 'A', label: 'A ' }
      ]
    return (
        <StTopSelectDiv> 
                <div>
                    <Controller name="grade" control={control} rules={{required: "필수로 선택하셔야합니다."}}
                    render={({ field }) => <Select name='grade' placeholder='좌석등급'  theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)'},})} {...field} options={greadeOptions} />} />
                    <p className='error'>{errors.grade && errors.grade?.message}</p>
                </div>
                <div>
                    <Controller name="floor"  control={control} rules={{required: "필수로 선택하셔야합니다."}}
                    render={({ field }) => <Select placeholder='층' onChange={onChangeSelect} name="floor"  theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)'},})} {...field} options={floorOptions} />} />
                    <p className='error'>{errors.floor && errors.floor?.message}</p>
                </div>
                <div>
                    <Controller name="section" control={control} rules={{required: "필수로 선택하셔야합니다."}}
                    render={({ field }) => <Select placeholder='구역' onChange={setSelectSection} name="section"  theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)'},})} {...field} options={sectionOptions} />} />
                    <p className='error'>{errors.section && errors.section?.message}</p>
                </div>
                <div>
                    <Controller name="row" control={control} rules={{required: "필수로 선택하셔야합니다."}}
                    render={({ field }) => <Select placeholder='열' onChange={setSelectRow} name="row"  theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)'},})} {...field} options={rowOptions} />} />
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