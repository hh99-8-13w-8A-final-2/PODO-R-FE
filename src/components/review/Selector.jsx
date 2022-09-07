import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import serach from '../../assets/img/serach.svg'
import styled from 'styled-components';
import Review from '../../components/review/Review';
import { useNavigate, useSearchParams, createSearchParams } from "react-router-dom";
import gap from '../../assets/img/gap.svg'
import view from '../../assets/img/view.svg'
import sound from '../../assets/img/sound.svg'
import light from '../../assets/img/light.svg'
import up_small from '../../assets/img/up_small.svg'
import axios from 'axios';


const Selector = () => {
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const query = Object.fromEntries([...params]);
    const [Data, setData] = useState([]); //좌석 정보
    const [Data1,setData1] =useState([]); //1층 섹션, row 정보
    const [Data2,setData2] =useState([]); //2층 섹션, row 정보
    const [Data3,setData3] =useState([]); //3층 섹션, row 정보
    const floorOptions =[]; //층 정보 
    const sectionOptions =[]; //층 정보 
    const rowOptions =[]; //row 정보 
    const [selectFloor, setSelectFloor] = useState({value : '0'}); //선책한 층
    const [selectSection, setSelectSection] = useState({value : '0'}); //선책한 섹션
    //const [sectionOptions, setSectionOptions] = useState([]); // 섹션 정보

    const getSeat = async() => {
            const res = await axios.get('http://3.39.240.159/api/theaters/1/seats')
            const data = res.data // 전체 좌석정보
            const data1 = res.data[0].sections[0]
            const data2 = res.data[1].sections[0]
            const data3 = res.data[2].sections[0]
            setData(data)
            setData1(data1)
            setData2(data2)
            setData3(data3)
    }; 
    useEffect(()=>{
        getSeat();
        console.log('http://3.39.240.159/api/musicals/1/reviews',query)
     },[]);

    for (var floor in Data){
        const data1 = Data[floor]
        //floors.push(Object.values(data)[0])
        floorOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
    }
console.log(selectSection)


    if (selectFloor.value === "1F"){
        for (var secton in Data1.section){
            const data1 = Data1.section[secton]
            if(data1 === "0"){
                sectionOptions.splice(0);
                sectionOptions.push({"value" : 0 , "label":"좌석없음"})
            }else{
                sectionOptions.splice(0);
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
    }else if(selectFloor.value === "2F"){
        for (var secton in Data2.section){
            const data1 = Data2.section[secton]
            if(data1 === "0"){
                sectionOptions.splice(0);
                sectionOptions.push({"value" : 0 , "label":"좌석없음"})   
            }else{
                sectionOptions.splice(0);
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
    }else if (selectFloor.value === "3F"){
        for (var secton in Data3.section){
            const data1 = Data3.section[secton]
            if(data1 === "0"){
                sectionOptions.splice(0);
                sectionOptions.push({"value" : 0 , "label":"좌석없음"})   
            }else{
                sectionOptions.splice(0);
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
    }else{}

    
    for(let i = 0; i < selectSection.value ; i++){
        if( `${i}` === selectSection.value){
            for(var rows in Data1.rows){
                const data1 = Data1.rows[rows]
                if(data1 === "0"){
                    rowOptions.splice(0);
                    rowOptions.push({"value" : 0 , "label":"열 없음"})
                }else{
                    rowOptions.splice(0);
                    rowOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
                }   
            }
        }
    }
      
 
    const handleCheck  = (e) =>{
        const {name, checked} = e.target;
        const param = createSearchParams({
            ...query,
            [name]:checked? "1": null
        })
        navigate({pathname:"", search:`?${param}`})
    }
    const handleOrderCheck  = (e) =>{
        const {name, checked, value} = e.target;
        const param = createSearchParams({
            ...query,
            [name]:checked? `${value}` : null
        })
        navigate({pathname:"", search:`?${param}`})
    }
    
    
    
    
    const greadeOptions = [
        { value: 'VIP', label: 'VIP' },
        { value: 'R', label: 'R' },
        { value: 'R', label: 'S' },
        { value: 'R', label: 'A ' }
      ]
    
   
    return (
        <div>
            <StFilterTopDiv>
                <div className='serach'>
                    <input type="text" />
                    <img src={serach} alt="" className='icon'/>
                </div>
                <div>
                    <StCheckbox>
                        <input type="checkbox" id='block' name='block' defaultChecked={params.get("block"==="1")} onChange={handleCheck}/>
                        <label htmlFor="block">#시야방해있음</label>
                        <input type="checkbox" id='operaGrass' name='operaGrass' defaultChecked={params.get("operaGrass"==="1")} onChange={handleCheck}/>
                        <label htmlFor="operaGrass">#오페라글라스필수</label>
                    </StCheckbox>
                </div>
            </StFilterTopDiv>
            <StFilterDiv className='bottom' style={{marginBottom:'50px'}}>
                <div className='left'>
                    <Select placeholder='좌석등급' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-1)', primary: 'var(--maincolor-1)'},})} options={greadeOptions}/>
                    <Select placeholder='층' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-1)', primary: 'var(--maincolor-1)'},})} options={floorOptions}  onChange={setSelectFloor}/>
                    <Select placeholder='구역' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-1)', primary: 'var(--maincolor-1)'},})} options={sectionOptions} onChange={setSelectSection}/>
                    <Select placeholder='열' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-1)', primary: 'var(--maincolor-1)'},})} options={rowOptions} />
                    <input type="number" id='seat' name='seat' placeholder='좌석번호'  />  
                </div>
                <div className='right'>
                    <div>
                        <input type="checkbox" id='gap' name='gap' defaultChecked={params.get("gap"==="1")} onChange={handleCheck}/>
                        <label htmlFor="gap"> <img src={gap} alt="" /> 단차좋음</label>
                        <input type="checkbox" id='sight' name='sight' defaultChecked={params.get("sight"==="1")} onChange={handleCheck} />
                        <label htmlFor="sight"> <img src={view} alt="" /> 시야좋음</label>
                        <input type="checkbox" id='sound' name='sound' defaultChecked={params.get("sound"==="1")} onChange={handleCheck}/>
                        <label htmlFor="sound"> <img src={sound} alt="" /> 음향좋음</label>
                        <input type="checkbox" id='light' name='light' defaultChecked={params.get("light"==="1")} onChange={handleCheck}/>
                        <label htmlFor="light"> <img src={light} alt="" /> 조명좋음</label>
                    </div>
                    <div>
                        <input type="radio" id='rank' name='order' value='SCORE' defaultChecked={params.get("order"==="SCORE")} onChange={handleOrderCheck}/>
                        <label htmlFor="rank"> <img src={up_small} alt="" className='up_small'/> 평점좋은순 </label>
                        <input type="radio" id='new' name='order' value='RECENT'  defaultChecked={params.get("order"==="RECENT")} onChange={handleOrderCheck} />
                        <label htmlFor="new"> <img src={up_small} alt=""  className='up_small' /> 최신순 </label>
                    </div>
                </div>
            </StFilterDiv>
            <Review/>
        </div>
    );
};

export default Selector;

const StFilterTopDiv = styled.div`
    display: flex;
    flex-direction: column;
    margin: 20px 0 50px;
    justify-content: space-between;
    align-items: center;
    >div{
        margin: 20px 0 10px;
    }
    .serach{
        display: flex;
        input{ width:400px }
        img{
            margin-left: 10px;
        }
    }
`

const StFilterDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    >div{
        margin: 20px 0 10px;
    }
    .serach{
        display: flex;
        input{ width:400px }
        img{
            margin-left: 10px;
        }
    }
    .left{
        display: flex;
        
        >div{
            margin-right: 10px;
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
        .css-1okebmr-indicatorSeparator{
        background-color: transparent;
        }
    }
    .right{
        display: flex;
        div {
            margin-left: 10px;
            display: flex;
            label{
                display: inline-flex;
                align-items: center;
                margin-left: 15px;
                img{
                    width: 30px;
                    margin-right: 5px;
                }
            }
        }
        input[type="checkbox"],input[type="radio"] {
            display:none;
        }
        input[type="checkbox"] + label, input[type="radio"] + label{
            color: var(--gray-2);
            transition: all .3s;
            img{
                transition: all .3s;
                filter: invert(59%) sepia(1%) saturate(0%) hue-rotate(102deg) brightness(91%) contrast(86%);
            }
            img.up_small{
                transform: rotate(180deg);
            }
        }
        input[type="checkbox"]:checked + label, input[type="radio"]:checked + label {
            color: var(--white);
            font-weight: 500;
            img{
                filter: none;
            }
        }
    }
`
const StCheckbox =styled.div`

label {
    margin-right: 10px;
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
