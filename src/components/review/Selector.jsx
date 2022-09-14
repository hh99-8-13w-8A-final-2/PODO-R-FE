import React, { useEffect, useState } from 'react';
import Select from 'react-select'
import serach from '../../assets/img/serach.svg'
import styled from 'styled-components';
import Review from '../../components/review/Review';
import { useNavigate, useSearchParams, createSearchParams, useLocation } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import RadioSelector from './RadioSelector';


const Selector = ({handleModal}) => {
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(3,1).toString()

    const navigate = useNavigate();
    const [params] = useSearchParams();
    const query = Object.fromEntries([...params]);
    const [Data, setData] = useState([]); //좌석 정보
    const [Data1,setData1] =useState([]); //1층 섹션, row 정보
    const [Data2,setData2] =useState([]); //2층 섹션, row 정보
    const [Data3,setData3] =useState([]); //3층 섹션, row 정보
    const floorOptions =[]; //층 select에 넣어주는 값
    const sectionOptions =[]; //구역 select에 넣어주는 값
    const rowOptions =[]; //열 select에 넣어주는 값
    const [selectGrade, setSelectGrade] = useState({value : '0', label:'좌석 등급'}); //선택한 등급
    const [selectFloor, setSelectFloor] = useState({value : '0', label:'층'}); //선택한 층
    const [selectSection, setSelectSection] = useState({value : '100', label: '구역'}); //선택한 구역
    const [selectRow, setSelectRow] = useState({value : '0', label: '열'}); //선택한 열
    const [seatNumber, setSeatNumber] =useState();//입력한 좌석
    const URI = {
        BASE : process.env.REACT_APP_BASE_URI
    } 

    const getSeat = async() => {
        const res = await axios.get(`${URI.BASE}/api/theaters/${musicalId}/seats`)
        const data = res.data // 전체 좌석정보
        
        setData(data)
        for(var i in data){
            if(i === '0'){
                const data = res.data[i].sections
                setData1(data)
                
            }else if(i === '1'){
                const data = res.data[i].sections
                setData2(data)
            }else {
                const data = res.data[i].sections
                setData3(data)
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
    if (selectFloor.value === "1층"){
        for (var section in Data1){
            const data1 = Data1[section]
            if(data1.section === "0"){
                sectionOptions.push({"value" : "0" , "label":"구역 없음"})
            }else{
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
        const rowdata = Data1.findIndex( (e) => e.section === selectSection.value)
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
    }else if (selectFloor.value === "2층"){
        for (var section in Data2){
            const data1 = Data2[section]
            if(data1.section === "0"){
                sectionOptions.push({"value" : "0" , "label":"구역 없음"})
            }else{
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
        const rowdata = Data2.findIndex( (e) => e.section === selectSection.value)
        if(rowdata !== -1){
            for(var rows in Data2[rowdata].rows){
                const data1 = Data2[rowdata].rows[rows]
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
    }else if (selectFloor.value === "3층"){
        for (var section in Data3){
            const data1 = Data3[section]
            if(data1.section === "0"){
                sectionOptions.push({"value" : "0" , "label":"구역 없음"})
            }else{
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
        const rowdata = Data3.findIndex( (e) => e.section === selectSection.value)
        if(rowdata !== -1){
            for(var rows in Data3[rowdata].rows){
                const data1 = Data3[rowdata].rows[rows]
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
    else{}

    const onChangeSeat = (e) =>{
        setSeatNumber(e.target.value)
    } // 좌석 시트 값
    
    const onClickReset = () => {
        setSelectGrade({value : '0', label:'좌석 등급'})
        setSelectFloor({value : '0', label:'층'})
        setSelectSection({value : '0', label:'구역'}) 
        setSelectRow({value : '0', label: '열'}) 
        setSeatNumber('0')
        navigate(location)
        // 좌석 초기화
    }
    
    const ClickSeatSerch = () =>{
        const grade = selectGrade.value
        const section = selectSection.value
        const row = selectRow.value
        if(seatNumber !== undefined){
            const param = createSearchParams({...query, greade :`${grade}`, section: `${section}`, row:`${row}`, seat:`${seatNumber}` })
            navigate({pathname:"", search:`?${param}`})
        }else{
            const param = createSearchParams({...query, grade :`${grade}`, section: `${section}`, row:`${row}`, seat:'0' })
            navigate({pathname:"", search:`?${param}`})
        }
        
        
    }

    const handleCheck  = (e) =>{
        const {name, checked} = e.target;
        const param = createSearchParams({
            ...query,
            [name]:checked? "1": 0
        })
        navigate({pathname:"", search:`?${param}`})
    }
    
    
    const greadeOptions = [
        { value: 'VIP', label: 'VIP' },
        { value: 'R', label: 'R' },
        { value: 'S', label: 'S' },
        { value: 'A', label: 'A ' }
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
                        <input type="checkbox" id='operaGlass' name='operaGlass' defaultChecked={params.get("operaGlass"==="1")} onChange={handleCheck}/>
                        <label htmlFor="operaGlass">#오페라글라스필수</label>
                    </StCheckbox>
                </div>
            </StFilterTopDiv>
            <StFilterDiv className='bottom' style={{marginBottom:'50px'}}>
                <div className='left'>
                    <Select placeholder='좌석등급' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)'},})} options={greadeOptions} onChange={setSelectGrade} value={selectGrade} />
                    <Select placeholder='층' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)'},})} options={floorOptions}  onChange={setSelectFloor} value={selectFloor} />
                    <Select placeholder='구역' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)'},})} options={sectionOptions} onChange={setSelectSection} value={selectSection} />
                    <Select placeholder='열' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)'},})} options={rowOptions} onChange={setSelectRow} value={selectRow}  />
                        <div className='inputSeat'>
                        <input type="number"  id='seat' name='seat' placeholder='좌석번호' onChange={onChangeSeat} value={seatNumber || ''} />  
                        <span><FontAwesomeIcon icon={faRotateLeft} onClick={onClickReset}/></span>
                    </div>
                    <img src={serach} alt="" className='icon' onClick={ClickSeatSerch}/>
                </div>
                <div className='right'>
                    <RadioSelector query={query} navigate={navigate} params ={params} handleCheck={handleCheck} createSearchParams={createSearchParams} />
                </div>
            </StFilterDiv >
            <Review handleModal={handleModal}/>
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
        align-items: center;
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
        .inputSeat{
            background-color: var(--gray-3);
            border-radius: 8px;
            display: flex;
            align-items: center;
            input{
                width: 100px;
            }
            span{
                color: var(--gray-2);
                font-size: 20px;
                margin: 0 10px;
                cursor: pointer;
            }
        }
        img {cursor: pointer;}
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
