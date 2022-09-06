import React from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Fragment } from 'react';
import { useLocation } from 'react-router-dom';

const fetchReviews = async (pageParam, musicalId) => {
    const res = await axios.get(`http://3.39.240.159/api/musicals/${musicalId}/reviews?size=24&page=${pageParam}`);
    const data = res.data.content;
    // 서버에서 가져올 데이터 페이지의 전체 길이
    const pageData = res.data.totalPages;
    return {
        data,
        nextPage: pageParam + 1,
        pageData
    }
}

const Review = () => {
    // 현재 페이지 url에서 musicalId값을 받아온다. 
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(3,1).toString()

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status, error } =
        useInfiniteQuery(
            ["reviews",musicalId],
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

        console.log(data)
        
    
    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }


    return (
        <>
            {data?.pages.map((group, i) => {
                return (
                    <StWrap key={i}>
                        <Fragment>
                            {group.data.map(data => (
                                <StReviewDiv key={data.reviewId}>
                                    <div className='top'>
                                        <StThumb imgUrl={data.imgUrl} alt="극장 이미지"></StThumb>
                                        <div></div>
                                    </div>
                                    <div className='bottom'>
                                        <ul>
                                            <li>{data.grade}석</li>
                                            <li>{data.floor} {data.section}</li>
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
`


const StReviewDiv = styled.div`
padding: 10px;


width: 200px;
    color: var(--gray-2);
    .top{
        position: relative;
        div{
            &:first-of-type{
                border: 2px solid var(--gray-2);
                border-radius: 10px 10px 0 0;
                border-bottom: none;
                width: 160px;
                height: 120px;
                margin: 0 auto;
                background-color: var(--gray-3);
                position: absolute;
                top: -10px;
                right: 50%;
                transform: translate(50%);
            }
            &:last-of-type{
                border: 2px solid var(--gray-2);
                border-bottom: none;
                height: 110px;
                border-radius: 10px 10px 0 0;
                background-color: var(--gray-3);
            }
        }
    }
    .bottom{
        border: 2px solid var(--gray-2);
        border-radius: 0 0 10px 10px;
        ul{
            display: flex;
            li{
                padding: 8px 10px;
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