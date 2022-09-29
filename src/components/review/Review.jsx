import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query'
import apis from '../../apis/apis';
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import { ReactComponent as Gap } from '../../assets/img/gap.svg'
import { ReactComponent as View } from '../../assets/img/view.svg'
import { ReactComponent as Sound } from '../../assets/img/sound.svg'
import { ReactComponent as Light } from '../../assets/img/light.svg'
import { ReactComponent as Like } from '../../assets/img/like.svg'
import { ReactComponent as Comment } from '../../assets/img/comment.svg'
import { useInView } from "react-intersection-observer";

const fetchReviews = async (pageParam, musicalId, tagUrl) => {
    const res = await apis.getReview(musicalId, pageParam, tagUrl)
    const data = res.data.content;
    // 서버에서 가져올 데이터 페이지의 전체 길이
    const pageData = res.data.totalPages;
    return {
        data,
        pageData,
    }
}


const Review = ({ handleModal, tagUrl }) => {
    // 현재 페이지 url에서 musicalId값을 받아온다. 
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(2, 1).toString()

    // 현재 시간 정보
    let today = new Date();
    let currentYear = today.getFullYear(); // 년도
    let currentMonth = today.getMonth() + 1;  // 월
    let currentDate = today.getDate();  // 날짜
    let currentHours = today.getHours(); // 시
    let currentMinutes = today.getMinutes();  // 분

    const { ref, inView } = useInView();

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status, error } =
        useInfiniteQuery(
            ["reviews", musicalId, tagUrl],
            ({ pageParam = 1 }) => {
                return fetchReviews(pageParam, musicalId, tagUrl);
            },
            {
                staleTime: 1000,
                cacheTime: 3000,
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

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView]);

    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }



    return (
        <div>
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
                                return (
                                    <StReviewDiv key={data.reviewId} onClick={() => handleModal(data.reviewId, data.musicalId)}>
                                        <StThumbDiv imgUrl={data.imgUrl}>
                                            <StUtillDiv>
                                                {data.heartChecked ? <><Like fill='#BB63FF' /><span>{data.heartCount}</span></> : <><Like fill='#fff' /><span>{data.heartCount}</span></>}
                                                <Comment fill='#fff' /><span>{data.commentCount}</span>
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
                                                    <span>{parseInt((currentDate - createDate) / 7)}주일 전</span>
                                                }
                                                {
                                                    currentYear - createYear === 0 &&
                                                    currentMonth - createMonth === 0 &&
                                                    currentDate - createDate > 0 && currentDate - createDate < 7 &&
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
                                                    currentMinutes - createMinute > 0 &&
                                                    <span>방금 전</span>
                                                }
                                            </StDate>
                                            <StIconDiv>
                                                {data.evaluation.gap === 3 && <div><Gap fill='#BB63FF' /><span>단차좋음</span></div>}
                                                {data.evaluation.gap === 2 && <div><Gap fill='#444' /><span>단차보통</span></div>}
                                                {data.evaluation.gap === 1 && <div><Gap fill='#444' /><span>단차나쁨</span></div>}
                                                {data.evaluation.sight === 3 && <div><View fill='#BB63FF' /><span>시야좋음</span></div>}
                                                {data.evaluation.sight === 2 && <div><View fill='#444' /><span>시야보통</span></div>}
                                                {data.evaluation.sight === 1 && <div><View fill='#444' /><span>시야나쁨</span></div>}
                                                {data.evaluation.sound === 3 && <div><Sound fill='#BB63FF' /><span>음향좋음</span></div>}
                                                {data.evaluation.sound === 2 && <div><Sound fill='#444' /><span>음향보통</span></div>}
                                                {data.evaluation.sound === 1 && <div><Sound fill='#444' /><span>음향나쁨</span></div>}
                                                {data.evaluation.light === 3 && <div><Light fill='#BB63FF' /><span>조명좋음</span></div>}
                                                {data.evaluation.light === 2 && <div><Light fill='#444' /><span>조명보통</span></div>}
                                                {data.evaluation.light === 1 && <div><Light fill='#444' /><span>조명나쁨</span></div>}
                                            </StIconDiv>
                                        </StInfoBox>
                                    </StReviewDiv>
                                )
                            })}
                        </Fragment>
                    </StWrap>
                )
            })}
            <StMoreDiv
                ref={ref}
            >
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                        ? "더보기"
                        : "Nothing more to load"}
            </StMoreDiv>
        </div>

    );
};

export default Review;

const StWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    row-gap: 10px;
    @media screen and (max-width: 768px) {
        grid-template-columns: 1fr 1fr;
    }
    @media screen and (max-width: 560px) {
        grid-template-columns: 1fr;
    }
`

const StReviewDiv = styled.div`
    width: 250px;
    height: 400px;
    border-radius: 10px;
    margin-bottom: 40px;
    cursor: pointer;
    align-self: center;
    justify-self: center;
    @media screen and (max-width: 560px) {

    }
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
    @media screen and (max-width: 560px) {

    }
   
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
    @media screen and (max-width: 560px) {
        font-size: 12px;
    }
`

const StDate = styled.div`
    color: var(--gray-2);
    font-size: 14px;
    margin-bottom: 10px;
    @media screen and (max-width: 560px) {
        font-size: 10px;
    }
`

const StIconDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 210px;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        &:last-child {
            margin-right: 0;
        }
    }
    span {
        color: var(--gray-2);
        font-size: 12px;
    }
`

const StMoreDiv = styled.button`
    width: 1360px;
    margin: 20px;
    background-color: var(--black);
    border: 1px solid var(--gray-2);
    padding: 10px;
    color: var(--gray-2);
    border-radius: 10px;
`
