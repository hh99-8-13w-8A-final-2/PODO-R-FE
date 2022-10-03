import React, { useState, useEffect } from 'react';
import { useForm, Controller } from "react-hook-form";
import { ToastContainer, toast } from 'react-toastify';
import apis from "../../apis/apis";
import Select from 'react-select'
import styled from 'styled-components';
import Tag from './Tag';
import ImageAdd from './ImageAdd';
import RadioSelect from './RadioSelect';
import CheckboxSelect from './CheckboxSelect';
import 'react-toastify/dist/ReactToastify.css';
import { useMutation, useQueryClient } from 'react-query';

document.addEventListener('keydown', function(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    };
  }, true);

const Create = ({ create, SetCreate, theaterId, musicalId}) => {

    const [tagList, setTagList] = useState([]); // 태그 리스트
    const [Data, setData] = useState([]); //좌석 정보
    const [Data1, setData1] = useState([]); //1층 섹션, row 정보
    const [Data2, setData2] = useState([]); //2층 섹션, row 정보
    const [Data3, setData3] = useState([]); //3층 섹션, row 정보
    const [Data4, setData4] = useState([]); //4층 섹션, row 정보
    const floorOptions = []; //층 select에 넣어주는 값
    const sectionOptions = []; //구역 select에 넣어주는 값
    const rowOptions = []; //열 select에 넣어주는 값
    const [selectFloor, setSelectFloor] = useState({ value: '0' }); //선택한 층
    const [selectSection, setSelectSection] = useState({ value: '0' }); //선택한 구역
    const [selectRow, setSelectRow] = useState({ value: '0' }); //선택한 열
    const [imgfiles, setImgFiles] =useState([]); // 이미지 파일


    const { register, formState: { errors }, control, watch, handleSubmit } = useForm({
        defaultValues: {
            floor: ''
        }
    });
    
   
   
    const getSeat = async () => {
        const res = await apis.getSeat(theaterId)
        const data = res.data // 전체 좌석정보
        setData(data)
        for (var i in data) {
            if (i === '0') {
                const data = res.data[i].sections
                setData1(data)

            } else if (i === '1') {
                const data = res.data[i].sections
                setData2(data)
            } else if (i === '2'){
                const data = res.data[i].sections
                setData3(data)
            }else{
                const data = res.data[i].sections
                setData4(data)
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
            const rowdata = Data2.findIndex((e) => e.section === watch("section").value)
            if (rowdata !== -1) {
                for (var rows in Data2[rowdata].rows) {
                    const data1 = Data2[rowdata].rows[rows]
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
    } else if (watch("floor").value === "3층" || "발코니") {
        for (var section in Data3) {
            const data1 = Data3[section]
            if (data1.section === "0") {
                sectionOptions.push({ "value": "0", "label": "구역 없음" })
            } else {
                sectionOptions.push({ "value": Object.values(data1)[0], "label": Object.values(data1)[0] })
            }
        }
        if (watch("section") !== undefined) {
            const rowdata = Data3.findIndex((e) => e.section === watch("section").value)
            if (rowdata !== -1) {
                for (var rows in Data3[rowdata].rows) {
                    const data1 = Data3[rowdata].rows[rows]
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

    const gradeOptions = [
        { value: 'VIP', label: 'VIP' },
        { value: 'OP', label: 'OP' },
        { value: 'R', label: 'R' },
        { value: 'S', label: 'S' },
        { value: 'A', label: 'A ' }
    ]

    const number = document.getElementById('seat');
    number.onkeydown = function(e) {
        if(!((e.keyCode > 95 && e.keyCode < 106)
          || (e.keyCode > 47 && e.keyCode < 58) 
          || e.keyCode == 8)) {
            return false;
        }
    }

    const postCreatReviews = async(json) => {
        await apis.postReview(musicalId, json)
        .then(
            (response)=>{
                SetCreate(!create)
            }
        )
        .catch(
            (err) => {
                if(err.response){
                    console.log (err)
                    let data = err.response.data;
                    toast.error(data, {
                        autoClose: 3000,
                        position: toast.POSITION.TOP_CENTER,
                        theme: "dark"
                    })
                }   
            }
        )
    }
    const queryClient = useQueryClient()
    const creatMutation = useMutation(postCreatReviews, {
        onSuccess: (newPost) => {
            queryClient.setQueryData(["reviews", JSON.stringify(musicalId), ""], newPost)
        }
    })   


    const onSubmit = async () => {
        //이미지 업로드 

        if (imgfiles.length === 0) {
            toast.error("이미지 등록은 필수 입니다.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
                theme: "dark"
            })
        }


        
        // 폼 데이터
        const form = document.getElementById('myForm');
        const formdata = new FormData(form);
        formdata.append('tags', tagList)


            const obj = {};
            formdata.forEach(function (value, key) {
                obj[key] = value;
            })
            obj.imgUrls = imgfiles

            const json = JSON.stringify(obj)

            creatMutation.mutate(json)
            // await apis.postReview(musicalId, json)
    }


    return (
        <StForm id='myForm' onSubmit={handleSubmit(onSubmit, watch)}>
            <h4 className='seat'><span style={{ color: 'var(--error)' }}>*</span> 좌석정보 </h4> 
           
            <StTopSelectDiv>
                <div>
                    <Controller name="grade" control={control} rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => <Select name='grade' placeholder='좌석등급' theme={(theme) => ({
                            ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: 'var(--maincolor-3)', primary: 'var(--maincolor-1)' },
                        })} {...field} options={gradeOptions} />} />
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
                    <input type="number" id='seat' min="0" placeholder='좌석번호' {...register("seat", { min: 1, max: 300, required: true })} />
                    {errors.seat && errors.seat.type === "max" && <p className='error'> 300이하의 숫자로 입력해주세요. </p>}
                    {errors.seat && <p className='error'>필수로 입력하셔야합니다.</p>}
                </div>
            </StTopSelectDiv>
            <RadioSelect />
            <CheckboxSelect />
            <div className='textarea'>
                <h4> <span style={{ color: 'var(--error)' }}>*</span> 리뷰 내용   <p>500자 까지 입력이 가능합니다.</p></h4>
              
                <textarea name="reviewContent" id="reviewContent" cols="30" rows="10" placeholder='내용을 입력하세요.' {...register("reviewContent", { maxLength: {value: 500, message: "500자 이하이어야 합니다."}})}>
                </textarea>
                <p className='error'>{errors.reviewContent && errors.reviewContent?.message}</p>
            </div>
            <Tag setTagList={setTagList} tagList={tagList} />
            <ImageAdd imgfiles={imgfiles} setImgFiles={setImgFiles}/>
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
    .seat .btn {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 20px;
        font-weight: 500;
        font-size: 14px;
        background-color: var(--maincolor-1);
        color: var(--white);
        margin-left: 20px;
        cursor: pointer;
    }
    textarea{
        width: 100%;
        height: 250px;
        font-size: 16px;
    }
    input {
        font-size: 16px;
    }
    input[type="number"]::-webkit-outer-spin-button,
    input[type="number"]::-webkit-inner-spin-button{
        -webkit-appearance: none;
        margin: 0;
    }
    .file {
        margin-top: 10px;
        input{
            width: 100%;
        }
    }
    .textarea{
        h4>p {
            display: inline-block;
            color: var(--gray-2);
            font-weight: 500;
            font-size: 16px;
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

    @media (max-width: 763px) {
        width: 100%;
        h4{
            margin: 50px 0 20px;
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
    @media (max-width: 763px) {
        width: 100%;
        flex-direction: column;
        >div{
            width: 100%;
            padding: 3px 0;
            z-index: auto;
        }
        >div:last-of-type>input{
            width: 100%;
        }
    }
`