import axios from 'axios';
import { useInfiniteQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query"
import React, { Fragment, useEffect } from 'react';
import styled from 'styled-components';
import { ReactComponent as TextIcon } from '../../assets/img/textIcon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useInView } from "react-intersection-observer";

const URI = {
    BASE : process.env.REACT_APP_BASE_URI
  }

const getComments = async (reviewId, pageParam) => {
    const response = await axios.get(`${URI.BASE}/api/comments?reviewId=${reviewId}&page=${pageParam}`);
    console.log(response.data)
    const data = response.data.content;
    const pageData = response.data.totalPages;
    const total = response.data.totalElements
    return {
        data,
        nextPage: pageParam + 1,
        pageData,
        total
    }
}

const postModifyedComment = async (new_comment) => {
    const Authorization = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `${Authorization}`,
    }
    const { modifyId, content } = new_comment
    const { data } = await axios.put(`${URI.BASE}/api/comments/${modifyId}`, content, { headers: headers })
    return data
}

const deleteComment = async (commentId) => {
    const Authorization = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `${Authorization}`,
    }
    const response = await axios.delete(`${URI.BASE}/api/comments/${commentId}`, { headers: headers })
    return response
}


const ReviewCreateList = ({ setIsClick, reviewId }) => {
    const [id, setId] = useState('');
    const [modifyId, setModifyId] = useState('');
    const [toggle, setToggle] = useState(false);
    const userId = parseInt(localStorage.getItem('userId'))
    const { ref, inView } = useInView();

    let today = new Date();
    let currentYear = today.getFullYear(); // ??????
    let currentMonth = today.getMonth() + 1;  // ???
    let currentDate = today.getDate();  // ??????
    let currentHours = today.getHours(); // ???
    let currentMinutes = today.getMinutes();  // ???

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status, error } =
        useInfiniteQuery(
            ["comments", reviewId],
            ({ pageParam = 1 }) => {
                return getComments(reviewId, pageParam)
            },
            {
                refetchOnWindowFocus: false,
                getNextPageParam: (_lastPage, pages) => {
                    if (pages.length < pages[0].pageData) {
                        return pages.length + 1
                    } else {
                        return undefined
                    }
                }
            }
        )

        console.log(data)

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView]);

    // ????????? ??????
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const black_pattern = /^\s+|\s+$/g;
    const isBlank = (value) => (
        value.replace(black_pattern, '') === "" ? false : true
    )

    // ??????,?????? mutation
    const queryClient = useQueryClient()
    const modifyMutation = useMutation(postModifyedComment, {
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

    // ????????? ?????????
    const toggleHandler = (commentId) => {
        setId(commentId);
        setToggle(!toggle);
        setModifyId('');
    }

    const onSubmit = (data) => {
        const modify_comment = {
            content: data.modify,
            modifyId: modifyId,
        }
        modifyMutation.mutate(modify_comment)
        toast.success("????????? ?????????????????????", {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT
        })
        setToggle(!toggle)
        reset({ modify: "" })
    }

    const deleteHandler = (commentId) => {
        deleteMutation.mutate(commentId)
        toast.success("?????? ?????????????????????", {
            autoClose: 3000,
            position: toast.POSITION.TOP_RIGHT
        })
    }

    return (
        <div>
            <StListHeader>
                <div>?????? {data.pages[0].total}</div>
                <StToggleDiv onClick={() => setIsClick(false)}>
                    <TextIcon fill='#BB63FF' />
                    <span>????????????</span>
                </StToggleDiv>
            </StListHeader>
            <StListWrap>
            {data?.pages.map((group, i) => {
                return (
                    <StCommentList key={i}>
                        {group.data.map((comment) => {
                            const convertToDate = new Date(comment.createdAt);
                            const createYear = convertToDate.getFullYear();
                            const createMonth = convertToDate.getMonth() + 1;
                            const createDate = convertToDate.getDate();
                            const createHours = convertToDate.getHours();
                            const createMinute = convertToDate.getMinutes();
                            return (
                                <StDiv key={comment.commentId}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <StCommentHeaderContainer>
                                            <StCommentHeader>
                                                <StUserImg imgUrl={comment.profilePic}></StUserImg>
                                                <dl>
                                                    <StNameDt>{comment.nickname}</StNameDt>
                                                    <StDateDd>
                                                        {
                                                            currentYear - createYear > 0 &&
                                                            <span>{currentYear - createYear}??? ???</span>
                                                        }
                                                        {
                                                            currentYear - createYear === 0 &&
                                                            currentMonth - createMonth > 0 &&
                                                            <span>{currentMonth - createMonth}??? ???</span>
                                                        }
                                                        {
                                                            currentYear - createYear === 0 &&
                                                            currentMonth - createMonth === 0 &&
                                                            currentDate - createDate > 6 &&
                                                            <span>{(currentDate - createDate) / 7}?????? ???</span>
                                                        }
                                                        {
                                                            currentYear - createYear === 0 &&
                                                            currentMonth - createMonth === 0 &&
                                                            currentDate - createDate > 0 &&
                                                            <span>{(currentDate - createDate)}??? ???</span>
                                                        }
                                                        {
                                                            currentYear - createYear === 0 &&
                                                            currentMonth - createMonth === 0 &&
                                                            currentDate - createDate === 0 &&
                                                            currentHours - createHours > 0 &&
                                                            <span>{currentHours - createHours}?????? ???</span>
                                                        }
                                                        {
                                                            currentYear - createYear === 0 &&
                                                            currentMonth - createMonth === 0 &&
                                                            currentDate - createDate === 0 &&
                                                            currentHours - createHours === 0 &&
                                                            currentMinutes - createMinute >= 0 &&
                                                            <span>?????? ???</span>
                                                        }
                                                    </StDateDd>
                                                </dl>
                                            </StCommentHeader>
                                            <StButtonDiv>
                                                {(id === comment.commentId) && toggle ?
                                                    <StButtonToggleDiv>
                                                        {modifyId === comment.commentId ?
                                                            <button>??????</button>
                                                            :
                                                            <button onClick={() => setModifyId(comment.commentId)} type="button" key="notsubmit">??????</button>}
                                                        {modifyId === comment.commentId ?
                                                            <button onClick={() => setModifyId('')} type='button'>??????</button>
                                                            :
                                                            <button type='button' onClick={() => deleteHandler(comment.commentId)}>??????</button>
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
                                        </StCommentHeaderContainer>
                                        {(modifyId === comment.commentId) && toggle ?
                                            <StCommentContDiv>
                                                <StModifyInput
                                                    type="text"
                                                    placeholder='????????? ????????? ???????????????'
                                                    {...register("modify", { required: true, validate: value => isBlank(value) })}
                                                />
                                                {errors.modify && errors.modify.type === "required" && <StValidateP>?????? ????????? ????????? ?????????~</StValidateP>}
                                                {errors.modify && errors.modify.type === "validate" && <StValidateP>????????? ??????????????????!</StValidateP>}
                                            </StCommentContDiv>
                                            :
                                            <StCommentContDiv>
                                                <p>{comment.content}</p>
                                            </StCommentContDiv>
                                        }
                                    </form>
                                </StDiv>
                            )
                        })}
                    </StCommentList>
                )
            })}
            <StObserverDiv ref={ref}>
                {isFetchingNextPage && "Loading more..."}
                {data.pages[0].total === 0 && "?????? ????????? ?????????"}
                {data.pages[0].total !== 0 && !hasNextPage && "????????? ????????? ?????????"}
            </StObserverDiv>
            </StListWrap>
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
const StListWrap = styled.div`
    max-height: 500px;
    overflow-y: scroll;
`

const StCommentList = styled.div`

`

const StDiv = styled.div`
    border-top: 1px solid var(--gray-1);
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
`

const StCommentHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StButtonDiv = styled.div`
    display: flex;
    align-items: center;
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
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
        text-align: left;
        font-size: 14px;
        width: 434px;
    }
`
const StValidateP = styled.p`
    color: red;
`

const StModifyInput = styled.input`
    display: block;
    background-color: #eee;
    width: 350px;
    margin-bottom: 10px;
`
const StObserverDiv = styled.div`
    padding: 10px;
    color: var(--gray-1);
`

export default ReviewCreateList;