import React, { useEffect, useRef } from 'react';
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
import moment from 'moment'
import { WindowScroller, CellMeasurer, CellMeasurerCache, AutoSizer, List, InfiniteLoader } from "react-virtualized";
import { useState } from 'react';

const cache = new CellMeasurerCache({
    defaultWidth: 100,
    fixedWidth: true
});


const Review = ({ handleModal, tagUrl }) => {
    // 현재 페이지 url에서 musicalId값을 받아온다.
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(2, 1).toString()
    const [render, setRender] = useState(false);
    useEffect(()=> {setTimeout(() => {setRender(true)},[1000])},[])

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




    const { ref, inView } = useInView('');
    const listRef = useRef(null);

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status, error } =
        useInfiniteQuery(
            ["reviews", musicalId, tagUrl],
            ({ pageParam = 1 }) => {
                return fetchReviews(pageParam, musicalId, tagUrl)
            },
            {
                staleTime: 1000,
                cacheTime: 60000,
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


    const rowRenderer = ({ index, key, parent, style }) => {
        return (
            <CellMeasurer cache={cache} parent={parent} key={key} columnIndex={0} rowIndex={index}>
                <div style={style}>
                            <StWrap key={key}>
                                <Fragment>
                                    {data?.pages[index].data.map((data) => {
                                        const changeToDate = (datetime) => {
                                            // 오늘 날짜
                                            let now = moment(new Date())
                                            // 오늘과의 시간 차이
                                            let duration = moment.duration(now.diff(datetime))
                                            // 변환
                                            // asSeconds 를 하면 오늘과의 시간차이를 
                                            // 초단위로 float datatype 으로 보여준다 (3.82 이런식)
                                            let seconds = duration.asSeconds()
                                            let minute = duration.asMinutes()
                                            let hours = duration.asHours()
                                            let days = duration.asDays()
                                            let weeks = duration.asWeeks()
                                            let month = duration.asMonths()
                                            let year = duration.asYears()

                                            // 그래서 사용할 때는 parseInt 를 사용해 int 로 바꿔야 한다. 
                                            if (minute < 1) {
                                                // 1분 미만이면 초 단위로 보여주고,  
                                                return '방금 전'
                                            } else if (hours < 1) {
                                                // 1시간 미만이면 분 단위로 보여주고
                                                return parseInt(minute) + '분 전'
                                            } else if (hours < 24) {
                                                // 하루 미만이면 시간으로 보여주고
                                                return parseInt(hours) + '시간 전'
                                            } else if (weeks < 1) {
                                                // 일주일 미만이면 일 단위로 보여주고
                                                return parseInt(days) + '일 전'
                                            } else if (month < 1) {
                                                // 한 달 미만이면 주 단위로 보여주고
                                                return parseInt(weeks) + '주 전'
                                            } else if (year < 1) {
                                                // 1년 미만이면 달 단위로 보여주고
                                                return parseInt(month) + '달 전'
                                            } else {
                                                // 1년 이상이면 넌 단위로 보여주고
                                                return parseInt(year) + '년 전'
                                            }
                                        }
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
                                                        {changeToDate(data.createdAt)}
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
                </div>
            </CellMeasurer>
        );
    };

    useEffect(() => {
        if(inView) {
            fetchNextPage();
        }
    }, [inView]);


    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }

    return (
        <div>
            <WindowScroller>
                {({ height, scrollTop, isScrolling, onChildScroll }) => (
                    <AutoSizer disableHeight>
                        {({ width }) => (
                            <List
                                ref={listRef}
                                autoHeight
                                height={height}
                                width={width}
                                isScrolling={isScrolling}
                                overscanRowCount={0}
                                onScroll={onChildScroll}
                                scrollTop={scrollTop}
                                rowCount={data?.pages.length}
                                rowHeight={cache.rowHeight}
                                rowRenderer={rowRenderer}
                                deferredMeasurementCache={cache}
                            />
                        )}
                    </AutoSizer>
                )}
            </WindowScroller>
            {/* {data?.pages.map((group, i) => {
                return (
                    <StWrap key={i}>
                        <Fragment>
                            {group.data.map((data) => {
                                const changeToDate = (datetime) => {
                                    // 오늘 날짜
                                    let now = moment(new Date())
                                    // 오늘과의 시간 차이
                                    let duration = moment.duration(now.diff(datetime))
                                    // 변환
                                    // asSeconds 를 하면 오늘과의 시간차이를 
                                    // 초단위로 float datatype 으로 보여준다 (3.82 이런식)
                                    let seconds = duration.asSeconds()
                                    let minute = duration.asMinutes()
                                    let hours = duration.asHours()
                                    let days = duration.asDays()
                                    let weeks = duration.asWeeks()
                                    let month = duration.asMonths()
                                    let year = duration.asYears()
                                    
                                    // 그래서 사용할 때는 parseInt 를 사용해 int 로 바꿔야 한다. 
                                    if (minute < 1) {
                                        // 1분 미만이면 초 단위로 보여주고,  
                                    return '방금 전'
                                    } else if (hours < 1) {
                                    // 1시간 미만이면 분 단위로 보여주고
                                    return parseInt(minute) + '분 전'
                                    } else if (hours < 24) {
                                    // 하루 미만이면 시간으로 보여주고
                                    return parseInt(hours) + '시간 전'
                                    } else if (weeks < 1) {
                                    // 일주일 미만이면 일 단위로 보여주고
                                    return parseInt(days) + '일 전'
                                    } else if (month < 1) {
                                    // 한 달 미만이면 주 단위로 보여주고
                                    return parseInt(weeks) + '주 전'
                                    } else if (year < 1) {
                                    // 1년 미만이면 달 단위로 보여주고
                                    return parseInt(month) + '달 전'
                                    } else {
                                    // 1년 이상이면 넌 단위로 보여주고
                                    return parseInt(year) + '년 전'
                                    }
                                }
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
                                                {changeToDate(data.createdAt)}
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
            })} */}
            {render ? 
            <StMoreDiv
                ref={ref}
            >
                {isFetchingNextPage
                    ? "Loading more..."
                    : hasNextPage
                        ? "더보기"
                        : "Nothing more to load"}
            </StMoreDiv> 
            :
            null   
        }
        </div>
    );
};

export default Review;

const StWrap = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;
    row-gap: 10px;
    @media screen and (max-width: 1200px) {
        grid-template-columns: 1fr 1fr 1fr 1fr;
    }
    @media screen and (max-width: 1000px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
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
    display: flex;
    flex-direction: column;
    @media screen and (max-width: 560px) {
        flex-direction: row;
        width: 350px;
        height: 150px;
    }
`

const StThumbDiv = styled.div`
    width: 250px;
    height: 250px;
    border-radius: 20px 20px 0px 0px;
    background:linear-gradient( 0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 20%, rgba(0,0,0,0) 100% ), ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
    position: relative;
    @media screen and (max-width: 560px) {
        width: 130px;
        height: 150px;
        border-radius: 10px 0px 0px 10px;
    }
`

const StUtillDiv = styled.div`
    position: absolute;
    display: flex;
    align-items: center;
    right: 0;
    bottom: 0;
    padding: 10px;
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
    @media screen and (max-width: 560px) {
        width: 220px;
        height: 150px;
        box-sizing: border-box;
        border-radius: 0px 10px 10px 0px;
    }
`

const StH3 = styled.div`
    color: var(--white);
    font-size: 18px;
    margin-bottom: 10px;
    width: 100%;
`

const StDate = styled.div`
    color: var(--gray-2);
    font-size: 14px;
    margin-bottom: 10px;
`

const StIconDiv = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
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
    @media (max-width: 763px){
        width: 100%;
        margin: 0;
    }
`
