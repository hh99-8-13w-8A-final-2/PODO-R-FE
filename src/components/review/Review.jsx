import React, { useState } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';
import gap from '../../assets/img/gap.svg'
import view from '../../assets/img/view.svg'
import sound from '../../assets/img/sound.svg'
import light from '../../assets/img/light.svg'
import perfect from '../../assets/img/icon_perfect.svg'
import notgood from '../../assets/img/icon_notgood.svg'

const fetchReviews = async (pageParam, musicalId) => {
    const res = await axios.get(`http://3.39.240.159/api/musicals/${musicalId}/reviews?size=15&page=${pageParam}`);
    const data = res.data.content;
    // 서버에서 가져올 데이터 페이지의 전체 길이
    const pageData = res.data.totalPages;
    const total = res.data.totalElements
    return {
        data,
        nextPage: pageParam + 1,
        pageData,
        total
    }
}

const Review = ({handleModal}) => {
    // 현재 페이지 url에서 musicalId값을 받아온다. 
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(3, 1).toString()
    const [ ishover, setIshover ] = useState(false)

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

    const handleMouseEnter = (idx) => {
        const newArr = Array(data?.pages[0].total).fill(false)
        console.log(data?.pages.total)
        newArr[idx] = true;
        setIshover(newArr)
    }




    return (
        <>
            {data?.pages.map((group, i) => {
                return (
                    <StWrap key={i}>
                        <Fragment>
                            {group.data.map((data, index) => (
                                <StReviewDiv 
                                    key={data.reviewId} 
                                    onClick={handleModal}
                                    onMouseEnter={() => handleMouseEnter(index)}
                                    onMouseLeave={() => setIshover(false)}
                                    >
                                    <div className='top'>
                                        {ishover[index] ? 
                                        <StThumbHover>
                                                <div><img src={view} alt="시야"/>시야좋음</div>
                                                <div><img src={gap} alt="단차"/>단차좋음</div>
                                                <div><img src={sound} alt="음향"/>음향좋음</div>
                                                <div><img src={light} alt="조명"/>조명좋음</div>
                                        </StThumbHover> 
                                        : 
                                        <StThumb imgUrl={data.imgUrl} alt="극장 이미지"></StThumb>
                                        }
                                        <div></div>
                                    </div>
                                    <div className='bottom'>
                                        <ul>
                                            <li>{data.grade}석</li>
                                            <li>{data.floor} {data.section}구역</li>
                                            <li>{data.row}열 {data.seat}</li>
                                        </ul>
                                    </div>
                                </StReviewDiv>
                            ))}
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
padding: 10px;
cursor: pointer;
margin-bottom: 60px;
width: 220px;
color: var(--gray-2);
:hover {
    div {
        &:last-child {
            background-color: #bb63ff;
            color: #fff;
        }
        div {
            background-color: #bb63ff;
            color: #fff;
        }
    }
    }
    .top{
        position: relative;
        div{
            &:first-of-type{
                border: 2px solid var(--gray-2);
                border-radius: 10px 10px 0 0;
                border-bottom: none;
                width: 180px;
                height: 140px;
                margin: 0 auto;
                position: absolute;
                top: -10px;
                right: 50%;
                transform: translate(50%);
            }
            &:last-of-type{
                border: 2px solid var(--gray-2);
                border-bottom: none;
                height: 130px;
                border-radius: 10px 10px 0 0;
                
            }
        }
    }
    .bottom{
        border: 2px solid var(--gray-2);
        border-radius: 0 0 10px 10px;
        ul{
            display: flex;
            li{
                padding: 13px 13px;
                font-size: 14px;
                border-right: 1px solid var(--gray-2);
                &:first-of-type{
                    font-weight: 700;
                }
                &:last-of-type{
                    border-right: none;
                }
            }
        }
    }
`

const StThumb = styled.div`
    background: ${props => `url(${props.imgUrl})`};
    background-position: center;
    background-size: cover;
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

const StThumbHover = styled.div`
    background-color: #bb63ff;
    display: flex;
`