import React, { useEffect } from 'react';
import styled from 'styled-components';
import { useInfiniteQuery } from 'react-query'
import axios from 'axios'
import { Fragment } from 'react';

const fetchReviews = async (pageParam) => {
    const res = await axios.get(`http://3.39.240.159/api/musicals/1/reviews?size=24&page=${pageParam}`);
    const data = res.data.content
    console.log(data)
    return {
        data,
        nextPage: pageParam + 1,
    }
}


const Review = () => {

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage } =
        useInfiniteQuery(
            ["reviews"],
            async ({ pageParam = 1 }) => {
                return await fetchReviews(pageParam);
            },
            {
                getNextPageParam: (lastPage) => {
                    return lastPage.nextPage
                }
            }
        )


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
                                            <li>VIP석</li>
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