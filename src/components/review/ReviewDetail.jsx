import React,{ useState } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useQuery } from "react-query"
import { useLocation } from 'react-router-dom';
import ReviewDetailSlide from './ReviewDetailSlide';
import ReviewDetailEval from './ReviewDetailEval';
import { ReactComponent as Like } from '../../assets/img/like.svg'
import { ReactComponent as Comment } from '../../assets/img/comment.svg'
import ReviewCreate from './ReviewCreate';

const fetchReviewDetail = (musicalId, reviewsId) => {
    return axios.get(`http://3.39.240.159/api/musicals/${musicalId}/reviews/${reviewsId}`)
}

const ReviewDetail = ({ reviewsId, onClose }) => {
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(3, 1).toString()
    let today = new Date();
    let currentYear = today.getFullYear(); // 년도
    let currentMonth = today.getMonth() + 1;  // 월
    let currentDate = today.getDate();  // 날짜
    let currentHours = today.getHours(); // 시
    let currentMinutes = today.getMinutes();  // 분

    const [ isClick, setIsClick ] = useState(false);
    const { status, data, error } = useQuery(
        ['/ReviewDetail', musicalId, reviewsId],
        () => fetchReviewDetail(musicalId, reviewsId),
        {
            refetchOnWindowFocus: false,
        }
    )

    const convertToDate = new Date(data?.data.createdAt);
    const createYear = convertToDate.getFullYear();
    const createMonth = convertToDate.getMonth() + 1;
    const createDate = convertToDate.getDate();
    const createHours = convertToDate.getHours();
    const createMinute = convertToDate.getMinutes();

    const year = currentYear - createYear;
    const month = currentMonth - createMonth;
    const date = currentDate - createDate;
    const hours = currentHours - createHours;
    const minutes = currentMinutes - createMinute;

    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }

    console.log(data)
    return (
        <StReviewDetailBox>
            <StSideImgBox>
                <ReviewDetailSlide data={data} isClick={isClick}/>
            </StSideImgBox>
            <StInfoDiv>
                <StDetailHeader>
                    <StH3>{data?.data.grade}석 {data?.data.floor} {data?.data.section !== "0" && <>{data.data.section}구역</>} {data.data.row}열 {data.data.seat}</StH3>
                    <div>
                        <button>
                            <FontAwesomeIcon icon={faEllipsis} />
                        </button>
                        <button onClick={onClose}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </div>
                </StDetailHeader>
                {isClick ? <ReviewCreate setIsClick={setIsClick} data={data} onClose={onClose} /> :
                <>
                <StDetailHeaderBottom>
                    <StProfileDiv>
                        <StProfile></StProfile>
                        <StProfileInfo>
                            <StNickName>천당에서내려온갸갹</StNickName>
                            <StDate>
                                {
                                    year > 0 &&
                                    <span>{currentYear - createYear}년 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month > 0 &&
                                    <span>{currentMonth - createMonth}달 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date > 6 ?
                                    <span>{(currentDate - createDate) / 7}주일 전 작성</span>
                                    :
                                    <span>{currentDate - createDate}일 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date === 0 &&
                                    hours > 0 &&
                                    <span>{currentHours - createHours}시간 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date === 0 &&
                                    hours === 0 &&
                                    minutes >= 0 &&
                                    <span>방금 전 작성</span>
                                }
                            </StDate>
                        </StProfileInfo>
                    </StProfileDiv>
                    <StScoreDiv><StSpan>평점</StSpan><StScore>{data?.data.reviewScore}</StScore></StScoreDiv>
                </StDetailHeaderBottom>
                <ReviewDetailEval data={data}/>
                <StP>
                    {data?.data.reviewContent}
                </StP>
                
                {data?.data.tags[0] !== '' &&
                    <StTagDiv>
                        {data?.data.tags.map((tag, index) => (
                            <div key={index}>{tag}</div>
                        ))}
                    </StTagDiv>
                }
            </>    
            }
                <StBottomCont>
                        <StBottomLeftDiv>
                            <StThumbDiv></StThumbDiv>
                            <StDl>
                                <dt>2022 푸에르자 부르타 웨이라 인 서울 머시기 머시기 머시기</dt>
                                <dd>잠실 종합운동장FB씨어터</dd>
                                <dd>22.08.30 ~ 22.11.13</dd>
                            </StDl>
                        </StBottomLeftDiv>
                        <StBottomRightDiv>
                            <div><Like fill='#000'/><span>200</span></div>
                            <div onClick={() => setIsClick(true)}><Comment fill='#000'/><span>100</span></div>
                        </StBottomRightDiv>
                </StBottomCont>
            </StInfoDiv>
        </StReviewDetailBox>
    );
};

const StReviewDetailBox = styled.div`
    width: 1400px;
    display: flex;
`

const StSideImgBox = styled.div`
    width: 800px;
`

const StInfoDiv = styled.div`
    padding: 30px;
    position: relative;
`

const StDetailHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  width: 540px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-end;
  button {
    border: none;
    border-radius: 10px;
    background-color: var(--white);
    font-size: 1.5em;
    color: var(--gray-2);
    transition: all 0.3s;
    cursor: pointer;
    margin-left: 10px;
    &:hover {
      color: var(--gray-3);
    }
  }
  margin-bottom: 30px;
`;

const StH3 = styled.h3`
    font-size: 18px;
`

const StDetailHeaderBottom = styled.div`
    display: flex;
    justify-content: space-between;
    width: 540px;
    align-items: center;
    margin-bottom: 40px;
`
const StProfileDiv = styled.div`
    display: flex;
    align-items: center;
`

const StProfile = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background-color: var(--gray-1);
    margin-right: 10px;
`

const StProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const StNickName = styled.span`
    font-weight: bold;
    margin-bottom: 5px;
`

const StDate = styled.span`
    font-size: 12px;
    color: var(--gray-2);
`

const StScoreDiv = styled.div`
    display: flex;
`

const StSpan = styled.div`
    font-size: 14px;
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
`

const StScore = styled.div`
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-size: 40px;
`

const StP = styled.p`
    margin-top: 40px;
    margin-bottom: 40px;
    text-align: start;
    max-height: 300px;
`
const StTagDiv = styled.div`
    display: flex;
    div {
        border: 1px solid var(--gray-1);
        padding: 6px 16px; 
        border-radius: 20px;
        margin-right: 10px;
    }
`

const StBottomCont = styled.div`
    position: absolute;
    padding: 20px 0px;
    bottom: 0;
    width: 540px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid var(--gray-1);
`

const StThumbDiv = styled.div`
    width: 40px;
    height: 40px;
    background-color: var(--gray-1);
    border-radius: 5px;
    margin-right: 8px;
`

const StDl = styled.dl`
    dt {
        width: 250px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        margin-bottom: 4px;
    }
    dd {
        font-size: 10px;
        color: var(--gray-2);
        text-align: left;
    }
`

const StBottomLeftDiv = styled.div`
    display: flex;
    align-items: center;
`

const StBottomRightDiv = styled.div`
    display: flex;
    align-items: center;
    div {
        cursor: pointer;
        display: flex;
        align-items: center;
        svg {
            margin: 0px 5px 0px 10px;
        }
    }
`

export default ReviewDetail;