import React, { useState } from 'react';
import styled from 'styled-components';

//conponent
import GuideReview from '../components/guide/GuideReview'
import GuideCreate from '../components/guide/GuideCreate'
import GuideLiveReview from '../components/guide/GuideLiveReview'
import GuideMyReview from '../components/guide/GuideMyReview'
import GuideTheaterInfo from '../components/guide/GuideTheaterInfo'

//image
import off_guide_1 from '../assets/img/off_guide_1.svg'
import off_guide_2 from '../assets/img/off_guide_2.svg'
import off_guide_3 from '../assets/img/off_guide_3.svg'
import off_guide_4 from '../assets/img/off_guide_4.svg'
import off_guide_5 from '../assets/img/off_guide_5.svg'
import on_guide_1 from '../assets/img/on_guide_1.svg'
import on_guide_2 from '../assets/img/on_guide_2.svg'
import on_guide_3 from '../assets/img/on_guide_3.svg'
import on_guide_4 from '../assets/img/on_guide_4.svg'
import on_guide_5 from '../assets/img/on_guide_5.svg'


const GuidePage = () => {
    const [pageNumber, setpageNumber] = useState(0)

    const onClickBtn = (e) => {
        setpageNumber(Number(e.target.value))
    }
    
    const inner = () =>{
        if(pageNumber === 0){
            return <GuideReview/>
        }else if(pageNumber === 1){
            return <GuideCreate/>
        }else if(pageNumber === 2){
            return <GuideLiveReview/>
        }else if(pageNumber === 3){
            return <GuideMyReview/>
        }else{
            return <GuideTheaterInfo/>
        }
    }
    
    const PrevBtn = (pageNumber) =>{
        setpageNumber(pageNumber - 1)
    }
    const nextBtn = (pageNumber) =>{
        setpageNumber(pageNumber + 1)
    }

    return (
        <>
            <StContentsDiv>
                <div className='title'>
                    <p>명당을 고르는 가장 확실한 방법!</p>
                    <h2>포도알 서비스 이용안내</h2>
                </div>
                <div className='chapter'>
                    <ul>
                        <li>
                            <StLabel htmlFor='guide0' off={off_guide_1} on={on_guide_1} alt="">
                                <input type="radio" id="guide0" name='guide' value={0}  onChange={onClickBtn} checked={pageNumber === 0}/>
                                <div></div>
                                <h3>공연별 좌석</h3>
                                <h3>리뷰 확인</h3>
                            </StLabel>
                        </li>
                        <li>
                            <StLabel htmlFor='guide1' off={off_guide_2} on={on_guide_2} alt="">
                                <input type="radio" id="guide1" name='guide' value={1} onChange={onClickBtn} checked={pageNumber === 1}/>
                                <div></div>
                                <h3>공연별 좌석</h3>
                                <h3>리뷰 작성</h3>
                            </StLabel>
                        </li>
                        <li>
                            <StLabel htmlFor='guide2' off={off_guide_3} on={on_guide_3} alt="">
                                <input type="radio" id="guide2" name='guide' value={2} onChange={onClickBtn} checked={pageNumber === 2}/>
                                <div></div>
                                <h3>실시간 등록</h3>
                                <h3>리뷰 확인</h3>
                            </StLabel>
                        </li>
                        <li>
                            <StLabel htmlFor='guide3' off={off_guide_4} on={on_guide_4} alt="">
                                <input type="radio" id="guide3" name='guide' value={3} onChange={onClickBtn} checked={pageNumber === 3}/>
                                <div></div>
                                <h3>내가 등록한</h3>
                                <h3>리뷰 확인</h3>
                            </StLabel>
                        </li>
                        <li>
                            <StLabel htmlFor='guide4' off={off_guide_5} on={on_guide_5} alt="">
                                <input type="radio" id="guide4" name='guide' value={4} onChange={onClickBtn} checked={pageNumber === 4}/>
                                <div></div>
                                <h3>공연장</h3>
                                <h3>상세정보 확인</h3>
                            </StLabel>
                        </li>
                    </ul>
                </div>   
            </StContentsDiv>
            <StDiv>
            {inner()}
            </StDiv>
            <StPrevNextBtn className='pageBtn'>
                <ul>
                    {pageNumber === 0 ? null : <li onClick={() => PrevBtn(pageNumber)}>이전으로 가기</li>}

                    {pageNumber === 4 ? null : <li onClick={() => nextBtn(pageNumber)}>다음으로 가기</li>}
                    
                </ul>
            </StPrevNextBtn>
        </>
    );
};

export default GuidePage;

const StContentsDiv = styled.div`
    margin-top: 50px;
    color: var(--gray-2);
    .title {
        text-align: center;
        h2{
            color: var(--white);
            font-size: 2em;
            padding: 20px 0 80px ;
        }
    }
    .chapter{
        input{display:none}
        ul {
            display: flex;
            justify-content: space-between;
            text-align: center;
            line-height: 1.3em;
            li{
                max-width: 100px;
                display: block;
                flex-basis: 100%;
            }
        }
    }
`
const StLabel = styled.label`
    display: block;
    width:100%;
    height:100%;
    cursor: pointer;
    div{
        width: 100%;
        height: 100%;
        margin-bottom: 20px;
        background:url(${props => props.off});
        transition: all .3s;
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }
    & input[type='radio']:checked + div{
        background:url(${props => props.on});
        background-size: contain;
        background-repeat: no-repeat;
        background-position: center;
    }

`
const StDiv = styled.div`
    margin-top: 100px;
    @media screen and (max-width: 768px){
        *{font-size:.85em; text-align:center}
    }
`
const StPrevNextBtn = styled.div`
    ul{
        display: flex;
        justify-content: center;
        li {
            padding: 10px 20px;
            border-radius: 30px;
            background-color: var(--maincolor-2);
            margin: 0 10px;
            color: var(--white);
            transition: all .3s;
            cursor: pointer;
            &:hover{
                background-color: var(--maincolor-1);
            }
        }
    }
`