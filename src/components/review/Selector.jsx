import React, { Fragment, useEffect, useState } from 'react';
import Select from 'react-select'
import styled from 'styled-components';
import Review from '../../components/review/Review';
import { ReactComponent as Search } from '../../assets/img/search.svg'
import { useSelector } from "react-redux";

import { useNavigate, useSearchParams, useLocation } from "react-router-dom";
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRotateLeft } from '@fortawesome/free-solid-svg-icons';
import RadioSelector from './RadioSelector';
import AutoComplete from './AutoComplete';
import { useQuery } from "react-query"
import apis from '../../apis/apis';

const URI = {
    BASE : process.env.REACT_APP_BASE_URI
} 

const getTags = async (pageParam, musicalId) => {
    const Authorization = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `${Authorization}`,
    }
    const URI = {
        BASE : process.env.REACT_APP_BASE_URI
      }
    
    /* const res = await axios.get(`${URI.BASE}/api/musicals/${musicalId}/reviews?size=15&page=${pageParam}`,{headers: headers}); */
    const res = await apis.getTags(musicalId, pageParam, headers);
    const data = res.data.content;
    // 서버에서 가져올 데이터 페이지의 전체 길이
    const pageData = res.data.totalPages;
    console.log(res.data)
    return {
        data,
        pageData,
    }
}


const Selector = ({ handleModal, theaterId }) => {
    //const theaterId = useSelector((state) => state.musicalSlice.data.theaterId)
    let location = useLocation();
    const navigate = useNavigate();
    const [params] = useSearchParams();
    const query = Object.fromEntries([...params]);
    console.log(query)
    const [Data, setData] = useState([]); //좌석 정보
    const [Data1,setData1] =useState([]); //1층 섹션, row 정보
    const [Data2,setData2] =useState([]); //2층 섹션, row 정보
    const [Data3,setData3] =useState([]); //3층 섹션, row 정보
    const [Data4,setData4] =useState([]); //발코니 섹션, row 정보
    const floorOptions =[]; //층 select에 넣어주는 값
    const sectionOptions =[]; //구역 select에 넣어주는 값
    const rowOptions =[]; //열 select에 넣어주는 값
    const [selectGrade, setSelectGrade] = useState({value : '0', label:'좌석 등급'}); //선택한 등급
    const [selectFloor, setSelectFloor] = useState({value : '0', label:'층'}); //선택한 층
    const [selectSection, setSelectSection] = useState({value : '100', label: '구역'}); //선택한 구역
    const [selectRow, setSelectRow] = useState({value : '0', label: '열'}); //선택한 열
    const [seatNumber, setSeatNumber] =useState();//입력한 좌석

    const getSeat = async() => {
        if(theaterId === undefined){return}
        /* const res = await axios.get(`${URI.BASE}/api/theaters/${theaterId}/seats`) */
        const res = await apis.getSeat(theaterId)
        const data = res.data // 전체 좌석정보
        console.log(theaterId)
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
                const data = res.data[i].sections
                setData4(data)
            }
        }
    }; 
    useEffect(()=>{
        getSeat();
     },[theaterId]);
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
    }else if (selectFloor.value === "3층" || "발코니"){
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
    }else if (selectFloor.value === "발코니"){
        for (var section in Data4){
            const data1 = Data4[section]
            if(data1.section === "0"){
                sectionOptions.push({"value" : "0" , "label":"구역 없음"})
            }else{
                sectionOptions.push({"value" : Object.values(data1)[0] , "label" : Object.values(data1)[0]})
            }
        }
        const rowdata = Data4.findIndex( (e) => e.section === selectSection.value)
        if(rowdata !== -1){
            for(var rows in Data4[rowdata].rows){
                const data1 = Data4[rowdata].rows[rows]
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
    let [searchParams, setSearchParams] = useSearchParams();
    
    const ClickSeatSerch = () =>{
        const grade = selectGrade.value
        const floor = selectFloor.value
        const section = selectSection.value
        const row = selectRow.value
        const seat = seatNumber

        const prevQueryTag = searchParams.getAll('tag');
        const prevQueryEval = searchParams.getAll('evaluation');
        const prevQuerySort = searchParams.getAll('sort');
        const prevQuerySearch = searchParams.getAll('search');
        if(grade === '0') {
            return
        }
        if(grade === '0' && section === '100' && floor >= '1') {
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                floor : `${floor}`
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
            return
        }

        if(grade === '0' && section === '100' && floor >= '1') {
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                floor : `${floor}`
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
            return
        }

        if(grade === '0' && floor >= '1' && row === '0') {
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                floor : `${floor}`,
                section: `${section}`
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
            return
        }

        if(grade === '0' && floor >= '1' && seat === undefined) {
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                floor : `${floor}`,
                section: `${section}`,
                row:`${row}`
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
            return
        }

        if(grade === '0' && floor >= '1' && seat !== undefined) {
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                floor : `${floor}`,
                section: `${section}`,
                row:`${row}`,
                seat:`${seat}`
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
            return
        }

        if(grade === '0' && floor >= '1' && seat === '') {
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                floor : `${floor}`,
                section: `${section}`,
                row:`${row}`
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
            return
        }

        if (floor === '0') {
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                grade :`${grade}`,
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
              return
        }

        if (section === '100') {
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                grade :`${grade}`,
                floor : `${floor}`
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
              return
        }

        if (row === '0') {
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                grade :`${grade}`,
                floor : `${floor}`,
                section: `${section}`
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
              return
        }
        if (seat !== undefined){
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                grade :`${grade}`,
                floor : `${floor}`,
                section: `${section}`,
                row:`${row}`,
                seat:`${seat}`
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
              return
        }
        if (seat === undefined){
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                grade :`${grade}`,
                floor : `${floor}`,
                section: `${section}`,
                row:`${row}`,
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
              return
        }
        if (seat === ''){
            setSearchParams({
                tag: [...prevQueryTag],
                evaluation: [...prevQueryEval],
                sort: [...prevQuerySort],
                search: [...prevQuerySearch],
                grade :`${grade}`,
                floor : `${floor}`,
                section: `${section}`,
                row:`${row}`,
              });
              setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
              return
        }
        
    }

    let musicalId = location.pathname.split('/').splice(2, 1).toString()

    const fetchTags = () => {
        //return axios.get(`${URI.BASE}/api/tags`)
        return apis.getFetchTags(musicalId)
      }
    
    const { status, data, error } = useQuery('/getTags', fetchTags,
        {
            staleTime: 1000,
            refetchOnWindowFocus: false,
        }
    )
    
    const [tagUrl, setTagUrl] = useState('');
    const wholeTagsArray = data?.data.tags;
    const [isTagCheck, setIsTagCheck] = useState(Array(15).fill(false))
    const [isEvalCheck, setIsEvalCheck] = useState(Array(4).fill(false))
    let update = require('immutability-helper');

    const handleCheck  = (e) =>{
        const key = parseInt(e.target.alt)
        let newData = update(isTagCheck, {
            $splice: [[key, 1, !isTagCheck[key]]]
        })
        setIsTagCheck(newData)
        sessionStorage.setItem('tagCheck', newData)
        const currentQuery = e.target.dataset.query.toString();
        // 현재 누른 타켓의 query
        const prevQueryTag = searchParams.getAll('tag');
        const prevQueryEval = searchParams.getAll('evaluation');
        const prevQuerySort = searchParams.getAll('sort');
        const prevQuerygrade = searchParams.getAll('grade')
        const prevQueryfloor = searchParams.getAll('floor')
        const prevQuerysection = searchParams.getAll('section')
        const prevQueryrow = searchParams.getAll('row')
        const prevQueryseat = searchParams.getAll('seat')
        const prevQuerySearch = searchParams.getAll('search');
        // 이전에 가지고 있던 query를 불러오기
        // 여러개가 될 수 있어, getAll 메서드를 사용했다.
        // 하나라면, get을 사용할 수 있을 것이다.
    
        if (prevQueryTag.includes(currentQuery)) {
          // 이전에 가지고 있던 쿼리가, 타겟의 쿼리를 가지고 있다면 (한번 더 눌렀다면)
          // 현재 누른 타겟의 쿼리는 제거해주자.
          const newQuery = prevQueryTag.filter((query) => query !== currentQuery);
          setSearchParams({
            evaluation: [...prevQueryEval],
            sort: [...prevQuerySort],
            grade: [...prevQuerygrade],
            floor: [...prevQueryfloor],
            section: [...prevQuerysection],
            row: [...prevQueryrow],
            seat: [...prevQueryseat],
            search: [...prevQuerySearch],
            tag: newQuery, 
          });
          setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
        } else {
          // 아니라면, 쿼리를 추가해주자.
          setSearchParams({
            evaluation: [...prevQueryEval],
            sort: [...prevQuerySort],
            grade: [...prevQuerygrade],
            floor: [...prevQueryfloor],
            section: [...prevQuerysection],
            row: [...prevQueryrow],
            seat: [...prevQueryseat],
            search: [...prevQuerySearch],
            tag: [...prevQueryTag, currentQuery]
          });
          setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
        }
    }


    const handleEvalCheck = (e) => {
        const key = parseInt(e.target.alt)
        let newData = update(isEvalCheck, {
            $splice: [[key, 1, !isEvalCheck[key]]]
        })
        setIsEvalCheck(newData)
        sessionStorage.setItem('evalCheck', newData)
        const currentQuery = e.target.dataset.query.toString();
        const prevQueryEval = searchParams.getAll('evaluation');
        const prevQueryTag = searchParams.getAll('tag');
        const prevQuerySort = searchParams.getAll('sort');
        const prevQuerygrade = searchParams.getAll('grade')
        const prevQueryfloor = searchParams.getAll('floor')
        const prevQuerysection = searchParams.getAll('section')
        const prevQueryrow = searchParams.getAll('row')
        const prevQueryseat = searchParams.getAll('seat')
        const prevQuerySearch = searchParams.getAll('search');
    
        if (prevQueryEval.includes(currentQuery)) {
          const newQuery = prevQueryEval.filter((query) => query !== currentQuery);
          setSearchParams({
            tag: [...prevQueryTag],
            sort: [...prevQuerySort],
            grade: [...prevQuerygrade],
            floor: [...prevQueryfloor],
            section: [...prevQuerysection],
            row: [...prevQueryrow],
            seat: [...prevQueryseat],
            search: [...prevQuerySearch],
            evaluation: newQuery
          });
          setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
        } else {
          setSearchParams({
            tag: [...prevQueryTag],
            sort: [...prevQuerySort],
            grade: [...prevQuerygrade],
            floor: [...prevQueryfloor],
            section: [...prevQuerysection],
            row: [...prevQueryrow],
            seat: [...prevQueryseat],
            search: [...prevQuerySearch],
            evaluation: [...prevQueryEval, currentQuery]
          });
          setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
        }
    }

    const [isOrderCheck, setIsOrderCheck] = useState(Array(2).fill(false))

    const handleOrderCheck  = (e) =>{
        const key = parseInt(e.target.alt)
        let newData = update(isOrderCheck, {
            $splice: [[key, 1, !isOrderCheck[key]]]
        })
        setIsOrderCheck(newData)
        sessionStorage.setItem('orderCheck', newData)
        const currentQuery = e.target.dataset.query.toString();
        const prevQueryEval = searchParams.getAll('evaluation');
        const prevQueryTag = searchParams.getAll('tag');
        const prevQuerySort = searchParams.getAll('sort');
        const prevQuerygrade = searchParams.getAll('grade')
        const prevQueryfloor = searchParams.getAll('floor')
        const prevQuerysection = searchParams.getAll('section')
        const prevQueryrow = searchParams.getAll('row')
        const prevQueryseat = searchParams.getAll('seat')
        const prevQuerySearch = searchParams.getAll('search');

        if (prevQuerySort.includes(currentQuery)) {
            const newQuery = prevQuerySort.filter((query) => query !== currentQuery);
            setSearchParams({
                tag: [...prevQueryTag],
                eval: [...prevQueryEval],
                grade: [...prevQuerygrade],
                floor: [...prevQueryfloor],
                section: [...prevQuerysection],
                row: [...prevQueryrow],
                seat: [...prevQueryseat],
                search: [...prevQuerySearch],
                sort: newQuery
            });
            setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
          } else {
            setSearchParams({
                tag: [...prevQueryTag],
                eval: [...prevQueryEval],
                grade: [...prevQuerygrade],
                floor: [...prevQueryfloor],
                section: [...prevQuerysection],
                row: [...prevQueryrow],
                seat: [...prevQueryseat],
                search: [...prevQuerySearch],
                sort: [...prevQuerySort, currentQuery]
            });
            setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
          }
    }

    
    const gradeOptions = [
        { value: 'VIP', label: 'VIP' },
        { value: 'OP', label: 'OP' },
        { value: 'R', label: 'R' },
        { value: 'S', label: 'S' },
        { value: 'A', label: 'A ' }
    ]

    useEffect(() => {
        if(window.location.href.split('?').splice(1,1).toString() === '') {
            setTagUrl('')
        }else {
            setTagUrl('&' + window.location.href.split('?').splice(1,1).toString())
            let checking = sessionStorage.getItem('tagCheck')
            if(typeof(checking) === 'string') {
                let checkingBool = (checking.split(',')).map(check => JSON.parse(check))
                setIsTagCheck(checkingBool)
            }

            let evalChecking = sessionStorage.getItem('evalCheck')
            if(typeof(evalChecking) === 'string') {
                let evalCheckingBool = (evalChecking.split(',')).map(check => JSON.parse(check))
                setIsEvalCheck(evalCheckingBool)
            }
            let orderChecking = sessionStorage.getItem('orderCheck')
            if(typeof(orderChecking) === 'string') {
                let orderCheckingBool = (orderChecking.split(',')).map(check => JSON.parse(check))
                setIsOrderCheck(orderCheckingBool)
            }
            sessionStorage.clear()
        }
    },[]) 



    if(status === 'loading'){return <div className='popularBox'></div>}
    if(status === 'error'){return <div className='popularBox'><p>Error:{error.message}</p></div>}
    
   
    return (
        <div>
            <StFilterTopDiv>
                <AutoComplete setTagUrl={setTagUrl} setSearchParams={setSearchParams} searchParams={searchParams}/>
                <div>
                    <StCheckbox>
                    {wholeTagsArray.map((tag, index) => (
                        <Fragment key={tag}>
                            <input type="checkbox" id={tag} alt={index} data-query={tag} name={tag} onChange={(e) =>handleCheck(e)} checked={isTagCheck[index]}/>
                            <label htmlFor={tag}>{tag}</label>
                        </Fragment>
                        ))}
                    </StCheckbox>
                </div>
            </StFilterTopDiv>
            <StFilterDiv className='bottom' style={{marginBottom:'50px'}}>
                <div className='left'>
                    <Select placeholder='좌석등급' theme={(theme) => ({
                        ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)'},})} options={gradeOptions} onChange={setSelectGrade} value={selectGrade} />
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
                    <Search className='icon' onClick={ClickSeatSerch}/>
                </div>
                <div className='right'>
                    <RadioSelector query={query} navigate={navigate} params ={params} handleEvalCheck={handleEvalCheck} isEvalCheck={isEvalCheck} isOrderCheck={isOrderCheck} handleOrderCheck={handleOrderCheck}/>
                </div>
            </StFilterDiv >
            <Review handleModal={handleModal} theaterId={theaterId} tagUrl={tagUrl}/>
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
`

const StFilterDiv = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    >div{
        margin: 20px 0 10px;
    }
    .icon {
        cursor: pointer;
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
                filter: invert(1);
            }
        }
        input[type="radio"]:checked + label{
            img{
                filter:contrast(1)
            }
        }
    }
`

const StCheckbox =styled.div`
    width: 1400px;
    height: 40px;
    overflow: hidden;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    div {
        height: 100px;
    }
    label {
        margin-right: 10px;
        padding: 8px 15px;
        border-radius:20px;
        box-sizing: border-box;
        margin-bottom: 10px;
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
