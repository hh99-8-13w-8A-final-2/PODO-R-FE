import React, { useRef } from 'react';
import styled from 'styled-components';
import bnr from '../../assets/img/bnr.png'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import SwiperCore, { Pagination, Navigation, Autoplay  } from "swiper";
SwiperCore.use([Navigation, Pagination, Autoplay])


const MainBanner = () => {
    const swiperRef = useRef(null)

    return (
        <div
        onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
        onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
        >
           <Swiper
                ref={swiperRef}
                slidesPerView={1}
                navigation
                modules={[Navigation, Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{
                delay: 12000, 
                }}
                loop={true}
        >
            <SwiperSlide>
                <StMainBanner bnr={bnr}>
                    <div>
                        <h3>포도알 서비스 런칭</h3>
                        <p>당신이 원하는 바로 그 자리 포도알에 전부 다 있습니다.</p>
                    </div>
                </StMainBanner>
            </SwiperSlide>
            <SwiperSlide>
                <StMainBanner bnr={bnr}>
                    <div>
                        <h3>포도알 서비스 런칭</h3>
                        <p>당신이 원하는 바로 그 자리 포도알에 전부 다 있습니다.</p>
                    </div>
                </StMainBanner>
            </SwiperSlide>
        </Swiper>
        </div>
    );
};

const StMainBanner = styled.div`
    height: 300px;
    width: 1400px;
    background-image: ${props => `url(${props.bnr})`};
    background-size: cover;
    background-position: center;
    color: var(--white);
    position: relative;
    div {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 200px;
        h3 {
            font-size: 40px;
        }
        p {
            margin-top: 20px;
            font-size: 24px;
            width: 260px;
        }
    }
`

export default MainBanner;