import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/free-mode";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';
import styled from 'styled-components';

const ReviewDetailSlide = ({ data, isClick }) => {
    const swiperRef = useRef(null)


    return (
        <StSlideDiv>
            {data?.data.imgurls.length > 1 ?
                <div
                onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
                onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
                >
                    <Swiper
                        ref={swiperRef}
                        slidesPerView={1}
                        modules={[Pagination, Navigation, Autoplay]}
                        navigation
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
                </div>
            : 
            <StDiv imgUrl = {data?.data.imgurls[0]}></StDiv>
            }
            {isClick ?
                <StContentDiv >
                    <div>
                        <div>
                            <StUserNameDiv>천당에서내려온</StUserNameDiv>
                            <StDate></StDate>
                        </div>
                    <StScoreDiv>
                        <StSpan>평점</StSpan>
                        <StScore>{data?.data.reviewScore}</StScore>
                    </StScoreDiv>    
                    </div>
                    <p>{data?.data.reviewContent}</p>
                </StContentDiv>        
                :
                null        
            }
        </StSlideDiv>
    );
};

const StSlideDiv = styled.div`
    position: relative;
`
const StContentDiv = styled.div`
    transition-duration: 0.8s;
    transition-timing-function: ease-in-out;
    z-index: 999;
    position: absolute;
    width: 800px;
    left: 0;
    bottom: 0;
    background-color: rgba(0,0,0,0.5);
    padding: 20px;
    box-sizing: border-box;
    max-height: 200px;
    overflow-y: scroll;
    p {
        color: var(--white);
        text-align: left;
    }
`

const StDiv = styled.div`
    width: 800px;
    height: 800px;
    background: ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
    border-radius: 10px 0px 0px 10px;
`

const StUserNameDiv = styled.div`
    
`

const StDate = styled.div`
    
`

const StScoreDiv = styled.div`
    display: flex;
`

const StSpan = styled.div`
    font-size: 14px;
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
`

const StScore = styled.div`
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-size: 40px;
`

export default ReviewDetailSlide;