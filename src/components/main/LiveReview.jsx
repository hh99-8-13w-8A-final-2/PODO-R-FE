import React from 'react';
import styled, { keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';

const LiveReview = ({ loading, reviewList }) => {
    if (loading) { return <h2>Loading...</h2> }

    return (
        <Swiper
            spaceBetween={40}
            slidesPerView={6}
            modules={[Pagination, Navigation, Autoplay]}
            loop={true}
            autoplay={true}
        >
            <StFlowBox>
                {reviewList.map(review => (
                    <SwiperSlide key={review.reviewId}>
                        <StFlowInner>
                                <StReviewBox>
                                    <StH3>{review.musicalName}</StH3>
                                    <StP>{review.reviewContent}</StP>
                                    <StDiv>{review.reviewScore}</StDiv>
                                </StReviewBox>
                        </StFlowInner>
                    </SwiperSlide>
                ))}
            </StFlowBox>
        </Swiper>
    );
};
const StFlowBox = styled.div`
    display: flex;
    flex: 0 0 auto;
    white-space: nowrap;
    overflow: hidden;
    transition: 0.3s;
`

const textLoop = keyframes`
    0% {
      -webkit-transform: translate3d(0, 0, 0);
      transform: translate3d(0, 0, 0);
    }
    100% {
      -webkit-transform: translate3d(-1000%, 0, 0);
      transform: translate3d(-1000%, 0, 0);
    }
`

const StFlowInner = styled.div`
    /* animation: ${textLoop} 10s linear infinite; */
`

const StReviewBox = styled.div`
    color: #888;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    border: 1px solid #888;
    align-items: center;
    justify-content: center;
    position: relative;
    display: flex;
`

const StH3 = styled.h3`
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 50px;
    left: 50%;
    transform: translateX(-50%);
`

const StP = styled.p`
    width: 160px;
    line-height: 1.2;
    height: 3.6em;
    display: inline-block;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: center;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
`

const StDiv = styled.div`
    position: absolute;
    bottom: 20px;
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-size: 40px;
    left: 50%;
    transform: translateX(-50%);
`

export default LiveReview;