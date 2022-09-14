import axios from 'axios';
import { useQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query"
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TextIcon } from '../../assets/img/textIcon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';

const getComments = async (reviewId) => {
    const { data } = await axios.get(`http://3.39.240.159/api/comments?reviewId=${reviewId}`);
    console.log(data)
    return data
}

const postModifyedComment = async(new_comment) => {
    const Authorization = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `${Authorization}`,
    }
    const { modifyId, content } = new_comment
    const {data} = await axios.put(`http://3.39.240.159/api/comments/${modifyId}`, content, {headers: headers})
    return data
}

const deleteComment = async(commentId) => {
    const Authorization = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `${Authorization}`,
    }
    const response = await axios.delete(`http://3.39.240.159/api/comments/${commentId}`, {headers: headers})
    return response
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
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const black_pattern = /^\s+|\s+$/g;
    const isBlank = (value) => (
        value.replace(black_pattern, '') === "" ? false : true
    )

    const queryClient = useQueryClient()
    const { mutate } = useMutation(postModifyedComment, {
        onSuccess: () => {
            queryClient.invalidateQueries("comments")
        }
    })
    const deleteMutation = useMutation((commentId) => deleteComment(commentId), {
        onSuccess: () => {
            queryClient.invalidateQueries("comments")
        }
    })

    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }

    const toggleHandler = (commentId) => {
        setId(commentId);
        setToggle(!toggle);
        setModifyId('');
    }

    const onSubmit = (data) => {
        toast.success("수정이 완료되었습니다", {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT
        })
        const modify_comment = {
            content: data.modify,
            modifyId: modifyId,
        }
        mutate(modify_comment)
        setToggle(!toggle)
        reset({ modify: "" })
    }

    const deleteHandler = (commentId) => {
        deleteMutation.mutate(commentId)
        toast.success("댓글 삭제되었습니다", {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT
        })
    }

    return (
        <div>
            <StListHeader>
                <div>댓글 {data.length}</div>
                <StToggleDiv onClick={() => setIsClick(false)}>
                    <TextIcon fill='#BB63FF'/>
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
                        <form onSubmit={handleSubmit(onSubmit)}>
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
                                        {modifyId === comment.commentId ? 
                                        <button>완료</button> 
                                        : 
                                        <button onClick={() => setModifyId(comment.commentId)} type="button" key="notsubmit">수정</button>}
                                        {modifyId === comment.commentId ? 
                                        <button onClick={() => setModifyId('')} type='button'>취소</button>
                                        : 
                                        <button type='button' onClick={() => deleteHandler(comment.commentId)}>삭제</button>
                                        }
                                    </StButtonToggleDiv>
                                    :
                                    null    
                                }
                                {(comment.memberId === userId) ? 
                                    <StButton onClick={() => toggleHandler(comment.commentId)} type='button'>
                                        <FontAwesomeIcon icon={faEllipsis} />
                                    </StButton>
                                    :
                                    null
                                }
                            </StButtonDiv>
                        </div>
                        {(modifyId === comment.commentId) && toggle?
                        <StCommentContDiv>
                                <StModifyInput
                                    type="text" 
                                    placeholder='수정할 내용을 입력하세요'
                                    {...register("modify", { required: true, validate: value => isBlank(value) })}
                                />
                                {errors.comment && errors.comment.type === "required" && <p>댓글 내용을 입력해 주세요~</p>}
                                {errors.comment && errors.comment.type === "validate" && <p>공백만 입력되었어요!</p>}
                        </StCommentContDiv>
                        :
                        <StCommentContDiv>
                            <p>{comment.content}</p>
                        </StCommentContDiv>
                        }
                    </form>
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
        color: var(--gray-2);
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
        color: var(--gray-3);
        }
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

const StModifyInput = styled.input`
    background-color: #eee;
    width: 350px;
`

export default ReviewCreateList;