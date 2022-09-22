import React,{ useState, useEffect } from 'react';
import { useForm, Controller, set } from "react-hook-form";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import Select from 'react-select'
import styled from 'styled-components';
import ModifyTag from './ModifyTag';
import ModifyImageAdd from './ModifyImageAdd';
import ModifyRadioSelect from './ModifyRadioSelect';
import ModifyCheckboxSelect from './ModifyCheckboxSelect';
import { useMutation, useQueryClient } from "react-query"

const Modify = ({ data, setModify }) => {
    console.log(data.data)
    let location = useLocation();
    const theaterId = useSelector((state) => state.musicalSlice.data.theaterId)
    const musicalId = useSelector((state) => state.musicalSlice.data.musicalId)
    const [tagList, setTagList] = useState([]); // 태그 리스트
    const [Data, setData] = useState([]); //좌석 정보
    const [Data1, setData1] = useState([]); //1층 섹션, row 정보
    const [Data2, setData2] = useState([]); //2층 섹션, row 정보
    const [Data3, setData3] = useState([]); //3층 섹션, row 정보
    const [Data4,setData4] =useState([]); //발코니 섹션, row 정보
    const floorOptions = []; //층 select에 넣어주는 값
    const sectionOptions = []; //구역 select에 넣어주는 값
    const rowOptions = []; //열 select에 넣어주는 값
    const [selectFloor, setSelectFloor] = useState({ value: '0' }); //선택한 층
    const [selectSection, setSelectSection] = useState({ value: '0' }); //선택한 구역
    const [selectRow, setSelectRow] = useState({ value: '0' }); //선택한 열
    const [operaGlass1, setOperaGlass1] = useState("");
    const [block1, setBlock1] = useState("");
    const [files, setFiles] = useState() // 이미지 파일
    const imgUrls = data?.data.imgurls
    const { register, formState: { errors }, control, watch, handleSubmit } = useForm({
        defaultValues: {
            floor: '1F'
        }
    });
    const URI = {
        BASE : process.env.REACT_APP_BASE_URI
      }
    //console.log(data)
    const getSeat = async () => {
        const res = await axios.get(`${URI.BASE}/api/theaters/${theaterId}/seats`)
        const data = res.data // 전체 좌석정보
        setData(data)
        console.log(imgUrls)
        for (var i in data) {
            if (i === '0') {
                const data = res.data[i].sections
                setData1(data)
            } else if (i === '1') {
                const data = res.data[i].sections
                setData2(data)
            } else if(i === '2'){
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
        if (block1 === true){
            setBlock1 ('on')
        }
        if (operaGlass1 === true){
            setOperaGlass1 ('on')
        }
    }, [operaGlass1]);


    const onChangeSelect = () => {
        setSelectFloor(watch("floor"))
    }

    for (var floor in Data) {
        const floorData = Data[floor]
        floorOptions.push({ "value": Object.values(floorData)[0], "label": Object.values(floorData)[0] })
    }
    if (watch("floor").value === "1층") {
        for (var section in Data1) {
            const sectionData = Data1[section]
            if (sectionData.section === "0") {
                sectionOptions.push({ "value": "0", "label": "구역 없음" })
            } else {
                sectionOptions.push({ "value": Object.values(sectionData)[0], "label": Object.values(sectionData)[0] })
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
    else {}

    const greadeOptions = [
        { value: 'VIP', label: 'VIP' },
        { value: 'OP', label: 'OP' },
        { value: 'R', label: 'R' },
        { value: 'S', label: 'S' },
        { value: 'A', label: 'A ' }
    ]

    const postModifyedReviews = async(json) => {
        const token = window.localStorage.getItem("accessToken")
        const jsonType = { "Content-Type": "application/json", "Authorization": token }
        await axios.put(`${URI.BASE}/api/musicals/${musicalId}/reviews/${data.data.reviewId}`, json, { headers: jsonType, token });
    }

    const queryClient = useQueryClient()
    const modifyMutation = useMutation(postModifyedReviews, {
        onSuccess: () => {
            queryClient.invalidateQueries("/ReviewDetail")
            queryClient.invalidateQueries("reviews")
        }
    })

    console.log(queryClient)
    


    const onSubmit = async () => {
       
        if (imgUrls.length === 0) {
            toast.error("이미지 등록은 필수 입니다.", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER,
                theme: "dark"
            })
        }
/*         const imgFormdata = new FormData();
        for (let i = 0; i < imgfiles.length; i++) {
            imgFormdata.append('image', imgfiles[i])
        } */
        console.log(imgUrls)
        const form = document.getElementById('myForm');
        const formdata = new FormData(form);
        formdata.append('tags', tagList)
        //formdata.append('imgUrls',imgUrls)
        formdata.delete('imgUrl')
        formdata.delete('operaGlass')
        formdata.delete('operaGlass1')
        formdata.delete('block')
        formdata.delete('block1')
        if(block1 === true){            
            formdata.set('block', 'on')
        }else if(block1 === false){
            formdata.set('block',null)
        }
        else{
            formdata.set('block', block1)
        }
        if(operaGlass1 === true){
            formdata.set('operaGlass','on')
        }else if (operaGlass1 === false){
            formdata.set('operaGlass',null)
        }else{formdata.set('operaGlass', operaGlass1)}

        
        try {
     /*        const multipartType = { "Content-Type": "multipart/form-data", "Authorization": token }
            const res1 = await axios.post(`${URI.BASE}/api/image/upload`, imgFormdata, { headers: multipartType }); */
            //이미지 

            const obj = {};
            formdata.forEach(function (value, key) {
                obj[key] = value;
            })
            obj.imgUrls = imgUrls

            const json = JSON.stringify(obj)
            console.log(json)
            modifyMutation.mutate(json)
            setModify(false)
        } catch (err) {
            console.log(err)
        }


        /* for (let key of imgFormdata.keys()) {
            console.log(key);
        }
        for (let value of imgFormdata.values()) {
            console.log(value);
        }*/
         for (let value of formdata.values()) {
            console.log(value);
        }
        for (let value of formdata.keys()) {
            console.log(value);
        }
        
    }

    
    
    
    return (
        <StForm id='myForm' onSubmit={handleSubmit(onSubmit, watch)}>
            <h4><span style={{ color: 'var(--error)' }}>*</span> 좌석정보</h4>
            <StTopSelectDiv>
                <div>
                    <Controller name="grade" control={control} rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => <Select name='grade' placeholder='좌석등급' theme={(theme) => ({
                            ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: '#f7edff', primary: '#dcb1ff' },
                        })} {...field} options={greadeOptions} />} />
                    <p className='error'>{errors.grade && errors.grade?.message}</p>
                </div>
                <div>
                    <Controller name="floor" control={control} rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => <Select placeholder='층' onChange={onChangeSelect} name="floor" theme={(theme) => ({
                            ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: '#f7edff', primary: '#dcb1ff' },
                        })} {...field} options={floorOptions} />} />
                    <p className='error'>{errors.floor && errors.floor?.message}</p>
                </div>
                <div>
                    <Controller name="section" control={control} rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => <Select placeholder='구역' onChange={setSelectSection} name="section" theme={(theme) => ({
                            ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: '#f7edff', primary: '#dcb1ff' },
                        })} {...field} options={sectionOptions} />} />
                    <p className='error'>{errors.section && errors.section?.message}</p>
                </div>
                <div>
                    <Controller name="row" control={control} rules={{ required: "필수로 선택하셔야합니다." }}
                        render={({ field }) => <Select placeholder='열' onChange={setSelectRow} name="row" theme={(theme) => ({
                            ...theme, borderRadius: 1, colors: { ...theme.colors, primary25: '#f7edff', primary: '#dcb1ff' },
                        })} {...field} options={rowOptions} />} />
                    <p className='error'>{errors.row && errors.row?.message}</p>
                </div>
                <div>
                    <input type="number" defaultValue={data?.data.seat || ''} placeholder='좌석번호' {...register("seat", { min: 1, max: 300, required: true })} />
                    {errors.seat && errors.seat.type === "max" && <p className='error'> 300이하의 숫자로 입력해주세요. </p>}
                    {errors.seat && <p className='error'>필수로 입력하셔야합니다.</p>}
                </div>
            </StTopSelectDiv>
            <ModifyRadioSelect data={data}/>
            <ModifyCheckboxSelect data={data} block1={block1} setBlock1={setBlock1} operaGlass1={operaGlass1} setOperaGlass1={setOperaGlass1}/>
            <div>
                <textarea name="reviewContent" id="reviewContent" cols="30" rows="10" placeholder='내용을 입력하세요.' defaultValue={data?.data.reviewContent  || ''}></textarea>
            </div>
            <ModifyTag setTagList={setTagList} tagList={tagList} data={data} />
            <ModifyImageAdd setFiles={setFiles} files={files} data={data} URI={URI} imgUrls={imgUrls}/>
            <div className='button'>
                <button type='submit'>등록</button>
                <button type='button' onClick={() => setModify(false)} className='cancle' >취소</button>
            </div>
            <ToastContainer />
        </StForm>
    );
};

export default Modify;

const StForm = styled.form`
width: 70%;
margin: 0 auto;
    h4{
        color: var(--gray-2);
        font-size: 18px;
        margin: 40px 0 20px;
        text-align: left;
    }
    textarea{
        width: 100%;
        height: 250px;
        font-size: 16px;
        background-color: var(--white);
        border: 1px solid var(--gray-1);
    }
    input {
        font-size: 16px;
        border-radius: 10px;
        background-color: var(--white);
        border: 1px solid var(--gray-1);
        padding: 8px;
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
            background-color: var(--white);
            border: 1px solid var(--gray-1);
            cursor: pointer;
            transition: all .3s;
            &:hover{
                background-color: var(--maincolor-1);
                color:var(--white);
                border-color:var(--maincolor-1);
            }
        }
        .cancle{
            background-color:var(--error);
            border-color:var(--error);
            color: var(--white);
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
            font-size: .8em;
        }
        >div{
            >div{
                background-color: var(--white);
                border-radius: 10px;
                color: var(--white);
                border: 1px solid var(--gray-1);
                >div>div{
                    color: var(--black);
                }
            }
           
        }
    }
    .css-1okebmr-indicatorSeparator{
        background-color: transparent;
    }
`