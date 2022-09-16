import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Select from 'react-select'
import styled from 'styled-components';
import Tag from './Tag';
import ImageAdd from './ImageAdd';
import RadioSelect from './RadioSelect';
import CheckboxSelect from './CheckboxSelect';
import 'react-toastify/dist/ReactToastify.css';


const Create = ({ create, SetCreate }) => {
    const navigate = useNavigate();
    const theaterId = useSelector((state) => state.musicalSlice.data.theaterId)
    const musicalId = useSelector((state) => state.musicalSlice.data.musicalId)

    /* let location = useLocation();
    let musicalId = location.pathname.split('/').splice(2, 1).toString() */
    const [tagList, setTagList] = useState([]); // 태그 리스트
    const [Data, setData] = useState([]); //좌석 정보
    const [Data1, setData1] = useState([]); //1층 섹션, row 정보
    const [Data2, setData2] = useState([]); //2층 섹션, row 정보
    const [Data3, setData3] = useState([]); //3층 섹션, row 정보
    const floorOptions = []; //층 select에 넣어주는 값
    const sectionOptions = []; //구역 select에 넣어주는 값
    const rowOptions = []; //열 select에 넣어주는 값
    const [selectFloor, setSelectFloor] = useState({ value: '0' }); //선택한 층
    const [selectSection, setSelectSection] = useState({ value: '0' }); //선택한 구역
    const [selectRow, setSelectRow] = useState({ value: '0' }); //선택한 열
    const imgfiles = []; // 이미지 파일
    const { register, formState: { errors }, control, watch, handleSubmit } = useForm({
        defaultValues: {
            floor: '1F'
        }
    });
    const URI = {
        BASE : process.env.REACT_APP_BASE_URI
      }


    const getSeat = async () => {
        const res = await axios.get(`${URI.BASE}/api/theaters/${theaterId}/seats`)
        const data = res.data // 전체 좌석정보
        setData(data)
        for (var i in data) {
            if (i === '0') {
                const data = res.data[i].sections
                setData1(data)

            } else if (i === '1') {
                const data = res.data[i].sections
                setData2(data)
            } else {
                const data = res.data[i].sections
                setData3(data)
            }
        }
    };

    useEffect(() => {
        getSeat();
    }, []);


    const onChangeSelect = () => {
        setSelectFloor(watch("floor"))
    }

    for (var floor in Data) {
        const data1 = Data[floor]
        floorOptions.push({ "value": Object.values(data1)[0], "label": Object.values(data1)[0] })
    }
    if (watch("floor").value === "1층") {
        for (var section in Data1) {
            const data1 = Data1[section]
            if (data1.section === "0") {
                sectionOptions.push({ "value": "0", "label": "구역 없음" })
            } else {
                sectionOptions.push({ "value": Object.values(data1)[0], "label": Object.values(data1)[0] })
            }
        }
        if (watch("section") !== undefined) {
            const rowdata = Data1.findIndex((e) => e.section === watch("section").value)
            if (rowdata !== -1) {
                for (var rows in Data1[rowdata].rows) {
                    const data1 = Data1[rowdata].rows[rows]
                    if (data1 === "0") {
                        rowOptions.push({ "value": "0", "label": "열 없음" })
                    } else {
                        if (Object.values(data1).length === 1) {
                            rowOptions.push({ "value": Object.values(data1)[0], "label": Object.values(data1)[0] })
                        } else {
                            rowOptions.push({ "value": Object.values(data1)[0] + Object.values(data1)[1], "label": Object.values(data1)[0] + Object.values(data1)[1] })
                        }
                    }
                }
            }
        }
    } else if (watch("floor").value === "2층") {
        for (var section in Data2) {
            const data1 = Data2[section]
            if (data1.section === "0") {
                sectionOptions.push({ "value": "0", "label": "구역 없음" })
            } else {
                sectionOptions.push({ "value": Object.values(data1)[0], "label": Object.values(data1)[0] })
            }
        }
        if (watch("section") !== undefined) {
            const rowdata = Data1.findIndex((e) => e.section === watch("section").value)
            if (rowdata !== -1) {
                for (var rows in Data1[rowdata].rows) {
                    const data1 = Data1[rowdata].rows[rows]
                    if (data1 === "0") {
                        rowOptions.push({ "value": "0", "label": "열 없음" })
                    } else {
                        if (Object.values(data1).length === 1) {
                            rowOptions.push({ "value": Object.values(data1)[0], "label": Object.values(data1)[0] })
                        } else {
                            rowOptions.push({ "value": Object.values(data1)[0] + Object.values(data1)[1], "label": Object.values(data1)[0] + Object.values(data1)[1] })
                        }
                    }
                }
            }
        }
    } else if (watch("floor").value === "3층") {
        for (var section in Data3) {
            const data1 = Data3[section]
            if (data1.section === "0") {
                sectionOptions.push({ "value": "0", "label": "구역 없음" })
            } else {
                sectionOptions.push({ "value": Object.values(data1)[0], "label": Object.values(data1)[0] })
            }
        }
        if (watch("section") !== undefined) {
            const rowdata = Data1.findIndex((e) => e.section === watch("section").value)
            if (rowdata !== -1) {
                for (var rows in Data1[rowdata].rows) {
                    const data1 = Data1[rowdata].rows[rows]
                    if (data1 === "0") {
                        rowOptions.push({ "value": "0", "label": "열 없음" })
                    } else {
                        if (Object.values(data1).length === 1) {
                            rowOptions.push({ "value": Object.values(data1)[0], "label": Object.values(data1)[0] })
                        } else {
                            rowOptions.push({ "value": Object.values(data1)[0] + Object.values(data1)[1], "label": Object.values(data1)[0] + Object.values(data1)[1] })
                        }
                    }
                }
            }
        }
    }
    else { }

    const greadeOptions = [
        { value: 'VIP', label: 'VIP' },
        { value: 'OP', label: 'OP' },
        { value: 'R', label: 'R' },
        { value: 'S', label: 'S' },
        { value: 'A', label: 'A ' }
    ]

    const onSubmit = async () => {
        //이미지 업로드 
        console.log(imgfiles.length)
        if (imgfiles.length === 0) {
            toast.error("이미지 등록은 필수 입니다.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
                theme: "dark"
            })
        }
        const imgFormdata = new FormData();
        //imgFormdata.append('image',imgfiles)
        for (let i = 0; i < imgfiles.length; i++) {
            imgFormdata.append('image', imgfiles[i])
        }
        // 폼 데이터
        const form = document.getElementById('myForm');
        const formdata = new FormData(form);
        formdata.append('tags', tagList)

        for (let key of imgFormdata.keys()) {
            console.log(key);
        }
        for (let value of imgFormdata.values()) {
            console.log(value);
        }
        for (let value of formdata.values()) {
            console.log(value);
        }
        try {
            const token = window.localStorage.getItem("accessToken")
            const jsonType = { "Content-Type": "application/json", "Authorization": token }
            const multipartType = { "Content-Type": "multipart/form-data", "Authorization": token }
            const res1 = await axios.post(`${URI.BASE}/api/image/upload`, imgFormdata, { headers: multipartType });
            //이미지 

            const obj = {};
            formdata.forEach(function (value, key) {
                obj[key] = value;
            })
            obj.imgUrls = res1.data.imageUrl

            const json = JSON.stringify(obj)
            console.log(json)
            await axios.post(`${URI.BASE}/api/musicals/${musicalId}/reviews`, json, { headers: jsonType, token });
            SetCreate(!create)
        } catch (err) {
            console.log(err)
        }
    }


    return (
        <StForm id='myForm' onSubmit={handleSubmit(onSubmit, watch)}>
            <h4><span style={{ color: 'var(--error)' }}>*</span> 좌석정보</h4>
            <StTopSelectDiv>
                <div>
                    <Controller name="grade" control={control} rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => <Select name='grade' placeholder='좌석등급' theme={(theme) => ({
                            ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)' },
                        })} {...field} options={greadeOptions} />} />
                    <p className='error'>{errors.grade && errors.grade?.message}</p>
                </div>
                <div>
                    <Controller name="floor" control={control} rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => <Select placeholder='층' onChange={onChangeSelect} name="floor" theme={(theme) => ({
                            ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)' },
                        })} {...field} options={floorOptions} />} />
                    <p className='error'>{errors.floor && errors.floor?.message}</p>
                </div>
                <div>
                    <Controller name="section" control={control} rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => <Select placeholder='구역' onChange={setSelectSection} name="section" theme={(theme) => ({
                            ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)' },
                        })} {...field} options={sectionOptions} />} />
                    <p className='error'>{errors.section && errors.section?.message}</p>
                </div>
                <div>
                    <Controller name="row" control={control} rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => <Select placeholder='열' onChange={setSelectRow} name="row" theme={(theme) => ({
                            ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)' },
                        })} {...field} options={rowOptions} />} />
                    <p className='error'>{errors.row && errors.row?.message}</p>
                </div>
                <div>
                    <input type="number" placeholder='좌석번호' {...register("seat", { min: 1, max: 300, required: true })} />
                    {errors.seat && errors.seat.type === "max" && <p className='error'> 300이하의 숫자로 입력해주세요. </p>}
                    {errors.seat && <p className='error'>필수로 입력하셔야합니다.</p>}
                </div>
            </StTopSelectDiv>
            <RadioSelect />
            <CheckboxSelect />
            <div>
                <textarea name="reviewContent" id="reviewContent" cols="30" rows="10" placeholder='내용을 입력하세요.'></textarea>
            </div>
            <Tag setTagList={setTagList} tagList={tagList} />
            <ImageAdd imgfiles={imgfiles} />
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