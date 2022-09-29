import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/free-mode";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';
import styled from 'styled-components';

const ReviewDetailSlide = ({ data, isClick, year, month, date, hours, minutes, nickname }) => {
    const swiperRef = useRef(null)

    return (
        <StSlideDiv className='StSlideDiv'>
            {data?.data.imgurls.length > 1 ?
                <StSlideInnerDiv
                className='innerDiv'
                onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
                onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
                >
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={1}
                        modules={[Pagination, Autoplay]}
                        pagination={{ clickable: true }}
                        loop={true}
                        autoplay={{
                            delay: 6000,
                        }}
                    >
                        {data?.data.imgurls.map((url, index) => 
                            <SwiperSlide key={index}>
                                <StDiv imgUrl = {url}>
                                </StDiv>
                            </SwiperSlide>
                        )}
                    </Swiper>
                </StSlideInnerDiv>
            :
            <StFlexDiv className='StFlexDiv'>
                <StDiv imgUrl = {data?.data.imgurls[0]}></StDiv>
            </StFlexDiv> 
            }
            {isClick ?
                <StContentDiv >
                    <div>
                        <StHeader>
                            <StUserNameDiv>{nickname}</StUserNameDiv>
                            <StDate>
                            {
                                    year > 0 &&
                                    <span>{year}년 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month > 0 &&
                                    <span>{month}달 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date > 6 &&
                                    <span>{parseInt((date) / 7)}주일 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date > 0 && date < 7 &&
                                    <span>{date}일 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date === 0 &&
                                    hours > 0 &&
                                    <span>{hours}시간 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date === 0 &&
                                    hours === 0 &&
                                    minutes >= 0 &&
                                    <span>방금 전 작성</span>
                                }
                            </StDate>
                        </StHeader>
                    </div>
                    <p>{data?.data.reviewContent}</p>
                </StContentDiv>        
                :
                null        
            }
        </StSlideDiv>
    );
};
const StFlexDiv = styled.div`
    width: 100%;
    div {
        width: 100%;
        @media screen and (max-width: 768px) {
        width: 90%;
    }
    }
`

const StSlideDiv = styled.div`
    position: relative;
    width: 100%;
    @media screen and (max-width: 768px) {
        width: 100%;
        height: 400px;
    }
`
const StSlideInnerDiv = styled.div`
    width: 100%;
    div {
        width: 100%;
    }
    @media screen and (max-width: 768px) {
        width: 90%;
        height: 400px;
    }
`

const StContentDiv = styled.div`
    transition-duration: 0.8s;
    transition-timing-function: ease-in-out;
    z-index: 999;
    position: absolute;
    width: 100%;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    padding: 40px 30px;
    box-sizing: border-box;
    max-height: 200px;
    overflow-y: scroll;
    color: var(--white);
    @media screen and (max-width: 768px) {
        width: 90%;
    }
    div {

        display: flex;
    }
    p {
        text-align: left;
        line-height: 24px;
        color: var(--gray-1);
    }
`

const StHeader = styled.div`
    margin-bottom: 10px;
`

const StDiv = styled.div`
    width: 840px;
    height: 840px;
    background: ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
    border-radius: 10px 0px 0px 10px;
    @media screen and (max-width: 768px) {
        width: 90%;
        height: 400px;
        border-radius: 10px
    }
`

const StUserNameDiv = styled.div`
    margin-right: 10px;
`

const StDate = styled.div`
    font-size: 12px;
    color: var(--gray-1);
`

export default ReviewDetailSlide;