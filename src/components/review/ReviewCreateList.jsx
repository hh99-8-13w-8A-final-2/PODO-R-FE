import axios from 'axios';
import { useQuery } from "react-query";
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TextIcon } from '../../assets/img/textIcon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const getComments = async (reviewId) => {
    const { data } = await axios.get(`http://3.39.240.159/api/comments?reviewId=${reviewId}`);
    console.log(data)
    return data
}

const ReviewCreateList = ({ setIsClick, reviewId }) => {
    const [ id, setId ] = useState('');
    const [ modifyId, setModifyId ] = useState('');
    const [ toggle, setToggle ]  = useState(false);
    const userId = parseInt(localStorage.getItem('userId')) 
    let today = new Date();
    let currentYear = today.getFullYear(); // 년도
    let currentMonth = today.getMonth() + 1;  // 월
    let currentDate = today.getDate();  // 날짜
    let currentHours = today.getHours(); // 시
    let currentMinutes = today.getMinutes();  // 분
    const { status, data, error } = useQuery(["comments", reviewId], () => getComments(reviewId), { refetchOnWindowFocus: false })

    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }

    const toggleHandler = (commentId) => {
        setId(commentId);
        setToggle(!toggle);
    }

    return (
        <div>
            <StListHeader>
                <div>댓글 {data.length}</div>
                <StToggleDiv onClick={() => setIsClick(false)}>
                    <TextIcon />
                    <span>본문보기</span>
                </StToggleDiv>
            </StListHeader>
            <StCommentList>
                {data?.map((comment) => {
                    const convertToDate = new Date(comment.createdAt);
                    const createYear = convertToDate.getFullYear();
                    const createMonth = convertToDate.getMonth() + 1;
                    const createDate = convertToDate.getDate();
                    const createHours = convertToDate.getHours();
                    const createMinute = convertToDate.getMinutes();    
                    return(
                    <StDiv key={comment.commentId}>
                        <div>
                            <StCommentHeader>
                                <StUserImg imgUrl={comment.profilePic}></StUserImg>
                                <dl>
                                    <StNameDt>{comment.nickname}</StNameDt>
                                    <StDateDd>
                                        {
                                        currentYear - createYear > 0 &&
                                        <span>{currentYear - createYear}년 전</span>
                                        }
                                        {
                                        currentYear - createYear === 0 &&
                                        currentMonth - createMonth > 0 &&
                                        <span>{currentMonth - createMonth}달 전</span>
                                        }
                                        {
                                        currentYear - createYear === 0 &&
                                        currentMonth - createMonth === 0 &&
                                        currentDate - createDate > 6 &&
                                        <span>{(currentDate - createDate)/7}주일 전</span>
                                        }
                                        {
                                        currentYear - createYear === 0 &&
                                        currentMonth - createMonth === 0 &&
                                        currentDate - createDate > 0 &&
                                        <span>{(currentDate - createDate)}일 전</span>
                                        }
                                        {
                                        currentYear - createYear === 0 &&
                                        currentMonth - createMonth === 0 &&
                                        currentDate - createDate === 0 &&
                                        currentHours - createHours > 0 &&
                                        <span>{currentHours - createHours}시간 전</span>
                                        }
                                        {
                                        currentYear - createYear === 0 &&
                                        currentMonth - createMonth === 0 &&
                                        currentDate - createDate === 0 &&
                                        currentHours - createHours === 0 &&
                                        currentMinutes - createMinute >= 0 &&
                                        <span>방금 전</span>
                                        }
                                    </StDateDd>
                                </dl>
                            </StCommentHeader>
                            <StButtonDiv>
                                {(id === comment.commentId) && toggle ? 
                                    <StButtonToggleDiv>
                                        {modifyId === id ? 
                                        <button>완료</button> 
                                        : 
                                        <button onClick={() => setModifyId(comment.commentId)}>수정</button>}
                                        {modifyId === id ? 
                                        <button onClick={() => setModifyId('')}>취소</button>
                                        : 
                                        <button>삭제</button>
                                        }
                                    </StButtonToggleDiv>
                                    :
                                    null    
                                }
                                {(comment.memberId === userId) ? 
                                    <StButton onClick={() => toggleHandler(comment.commentId)}>
                                        <FontAwesomeIcon icon={faEllipsis} />
                                    </StButton>
                                    :
                                    null
                                }
                            </StButtonDiv>
                        </div>
                        {(modifyId === comment.commentId)?
                        <StCommentContDiv>
                            <input/>
                        </StCommentContDiv>
                        :
                        <StCommentContDiv>
                            <p>{comment.content}</p>
                        </StCommentContDiv>
                        }
                    </StDiv>
                )})}
            </StCommentList>
        </div>
    );
};

const StListHeader = styled.div`
    margin-top: 25px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    div {
        display: flex;
        align-items: center;
    }
`

const StToggleDiv = styled.div`
    cursor: pointer;
`

const StCommentList = styled.div`
    max-height: 500px;
    overflow: scroll;
    overflow-x: hidden;
`

const StDiv = styled.div`
    border-top: 1px solid var(--gray-1);
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }
`

const StButtonDiv = styled.div`
    
`

const StButtonToggleDiv = styled.div`
    font-size: 12px;
    border: 1px solid var(--gray-2);
    border-radius: 5px;
    & :first-of-type {
        position: relative;
    }
    & :first-of-type::after {
        position: absolute;
        display: block;
        content: '';
        width: 1px;
        height: 15px;
        background-color: var(--gray-2);
        right: 0;
        top: 7px;
    }
    button {
        background: none;
        border: none;
        padding: 5px;
        cursor: pointer;
    }
`

const StCommentHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`


const StUserImg = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: var(--gray-1);
    margin-right: 10px;
    background: ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
`
const StNameDt = styled.dt`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
`

const StDateDd = styled.dd`
    font-size: 10px;
    text-align: left;
`

const StButton = styled.button`
    border: none;
    border-radius: 10px;
    background-color: var(--white);
    font-size: 1.2em;
    color: var(--gray-2);
    transition: all 0.3s;
    cursor: pointer;
    margin-left: 10px;
    &:hover {
    color: var(--gray-3);
    }
`

const StCommentContDiv = styled.div`
    padding-left: 50px;
    p {
        text-align: left;
        font-size: 14px;
        width: 434px;
    }
`

export default ReviewCreateList;