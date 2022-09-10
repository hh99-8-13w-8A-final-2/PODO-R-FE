import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import "swiper/css/free-mode";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';
import styled from 'styled-components';


const ReviewDetailSlide = ({ data }) => {
    const swiperRef = useRef(null)

    console.log(data?.data.imgurls[0])


    return (
        <>
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
                    {data?.data.imgurls.map(url => 
                        <SwiperSlide key={data?.data.reviewId}>
                            <StDiv imgUrl = {url}>
                            </StDiv>
                        </SwiperSlide>
                    )}
                </Swiper>
            </div>
        : 
            <StDiv imgUrl = {data?.data.imgurls[0]}></StDiv>}
        </>
    );
};


const StDiv = styled.div`
    width: 800px;
    height: 800px;
    background: ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
    border-radius: 10px 0px 0px 10px;
`

export default ReviewDetailSlide;