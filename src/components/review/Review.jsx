import React, { useState } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Gap } from '../../assets/img/gap.svg'
import { ReactComponent as View } from '../../assets/img/view.svg'
import { ReactComponent as Sound } from '../../assets/img/sound.svg'
import { ReactComponent as Light } from '../../assets/img/light.svg'
import { ReactComponent as Like } from '../../assets/img/like.svg'
import { ReactComponent as Comment } from '../../assets/img/comment.svg'

const fetchReviews = async (pageParam, musicalId) => {
    const res = await axios.get(`http://3.39.240.159/api/musicals/${musicalId}/reviews?size=15&page=${pageParam}`);
    const data = res.data.content;
    // 서버에서 가져올 데이터 페이지의 전체 길이
    const pageData = res.data.totalPages;
    const total = res.data.totalElements
    console.log(res.data)
    return {
        data,
        nextPage: pageParam + 1,
        pageData,
        total
    }
}

const Review = ({ handleModal }) => {
    // 현재 페이지 url에서 musicalId값을 받아온다. 
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(3, 1).toString()

    let today = new Date();
    let currentYear = today.getFullYear(); // 년도
    let currentMonth = today.getMonth() + 1;  // 월
    let currentDate = today.getDate();  // 날짜
    let currentHours = today.getHours(); // 시
    let currentMinutes = today.getMinutes();  // 분


    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status, error } =
        useInfiniteQuery(
            ["reviews", musicalId],
            ({ pageParam = 1 }) => {
                return fetchReviews(pageParam, musicalId);
            },
            {
                refetchOnWindowFocus: false,
                // fetchNextPage 를 호출하면 getNextPageParam 에서 다음 페이지의 번호를 가져오게 된다
                getNextPageParam: (_lastPage, pages) => {
                    if (pages.length < pages[0].pageData) {
                        return pages.length + 1
                    } else {
                        return undefined
                    }
                }
            }
        )

    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }


    return (
        <>
            {data?.pages.map((group, i) => {
                return (
                    <StWrap key={i}>
                        <Fragment>
                            {group.data.map((data) => {
                                const convertToDate = new Date(data.createdAt);
                                const createYear = convertToDate.getFullYear();
                                const createMonth = convertToDate.getMonth() + 1;
                                const createDate = convertToDate.getDate();
                                const createHours = convertToDate.getHours();
                                const createMinute = convertToDate.getMinutes();    
                                return(
                                <StReviewDiv key={data.reviewId} onClick={() => handleModal(data.reviewId)}>
                                    <StThumbDiv imgUrl={data.imgUrl}>
                                        <StUtillDiv>
                                            <Like fill='#fff'/><span>200</span>
                                            <Comment fill='#fff'/><span>100</span>
                                        </StUtillDiv>
                                    </StThumbDiv>
                                    <StInfoBox>
                                        <StH3>{data.grade}석 {data.floor} {data.section !== "0" && <>{data.section}구역</>} {data.row}열 {data.seat}</StH3>
                                        <StDate>
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
                                            <span>방금 전</span>
                                            }
                                            {
                                            currentYear - createYear === 0 &&
                                            currentMonth - createMonth === 0 &&
                                            currentDate - createDate === 0 &&
                                            currentHours - createHours === 0 &&
                                            currentMinutes - createMinute > 0 &&
                                            <span>방금 전</span>
                                            }
                                        </StDate>
                                        <StIconDiv>
                                            {data.evaluation.gap === 3 ? <div><Gap fill='#BB63FF'/><span>단차좋음</span></div> : <div><Gap fill='#444'/><span>단차좋음</span></div>}
                                            {data.evaluation.sight === 3 ? <div><View fill='#BB63FF'/><span>시야좋음</span></div> : <div><View fill='#444'/><span>시야좋음</span></div>}
                                            {data.evaluation.sound === 3 ? <div><Sound fill='#BB63FF'/><span>음향좋음</span></div> : <div><Sound fill='#444'/><span>음향좋음</span></div>}
                                            {data.evaluation.light === 3 ? <div><Light fill='#BB63FF'/><span>조명좋음</span></div> : <div><Light fill='#444'/><span>조명좋음</span></div>}
                                        </StIconDiv>
                                    </StInfoBox>
                                </StReviewDiv>
                            )})}
                        </Fragment>
                    </StWrap>
                )
            })}
            <StMoreButton
                type="button"
                onClick={() => fetchNextPage()}
                disabled={!hasNextPage || isFetchingNextPage}
            >
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                        ? "더보기"
                        : "Nothing more to load"}
            </StMoreButton>
        </>
    );
};

export default Review;

const StWrap = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`

const StReviewDiv = styled.div`
    width: 250px;
    height: 400px;
    border-radius: 10px;
    margin-bottom: 40px;
    cursor: pointer;
`

const StThumbDiv = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 20px 20px 0px 0px;
    background: ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
    background-color: rgba(34,34,34,0.4);
    background-blend-mode : multiply;
    position: relative;
`

const StUtillDiv = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    bottom: 0;
    svg {
        margin-left: 10px;
    }
    span {
        color: #fff;
        font-size: 14px;
        margin: 0px 3px;
    }
`

const StInfoBox = styled.div`
    padding: 20px;
    background-color: var(--gray-3);
    border-radius: 0px 0px 20px 20px;
    height: 112px;
`

const StH3 = styled.div`
    color: var(--white);
    font-size: 18px;
    margin-bottom: 10px;
`

const StDate = styled.div`
    color: var(--gray-2);
    font-size: 14px;
    margin-bottom: 10px;
`

const StIconDiv = styled.div`
    display: flex;
    justify-content: flex-start;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-right: 10px;
        &:last-child {
            margin-right: 0;
        }
    }
    span {
        color: var(--gray-2);
        font-size: 12px;
    }
`

const StMoreButton = styled.button`
    width: 1360px;
    margin: 20px;
    background-color: var(--black);
    border: 1px solid var(--gray-2);
    padding: 10px;
    color: var(--white);
    cursor: pointer;
    border-radius: 10px;
`
