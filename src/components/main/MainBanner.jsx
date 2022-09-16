import React, { useRef } from 'react';
import styled from 'styled-components';
import bnr from '../../assets/img/bnr.png'
import bnr2 from '../../assets/img/bnr2.png'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

// import required modules
import SwiperCore, { Pagination, Navigation, Autoplay  } from "swiper";
import { Link } from 'react-router-dom';
SwiperCore.use([Navigation, Pagination, Autoplay])


const MainBanner = () => {
    const swiperRef = useRef(null)

    return (
        <StMainBaanerSction
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
                <Link to={'/guide'}>
                    <StMainBanner bnr={bnr}>
                        <div>
                            <h3>포도알 서비스 런칭</h3>
                            <p>당신이 고민하는 그 자리 <br/>포도알에서 좌석 리뷰를 확인해보세요!</p>
                            <p className='button'>가이드 보러가기</p>
                        </div>    
                    </StMainBanner>
                </Link>
            </SwiperSlide>
            <SwiperSlide>
                <StMainBanner bnr={bnr2}>
                    
                </StMainBanner>
            </SwiperSlide>
        </Swiper>
        </StMainBaanerSction>
    );
};

const StMainBaanerSction = styled.div`
    .swiper-button-next:after, .swiper-rtl .swiper-button-prev:after, .swiper-button-prev:after, .swiper-rtl .swiper-button-next:after{
        color: var(--gray-2);
    }
    .swiper-pagination-bullet {background-color:var(--gray-2)}
    margin-bottom: 70px;
`

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
        color: var(--white);
        h3 {
            font-size: 40px;
        }
        p {
            margin: 20px 0 50px;
            font-size: 16px;
            width: 260px;
        }
        .button{
            display: inline;
            padding: 10px 20px;
            background-color: var(--maincolor-2);
            border-radius: 20px;
            margin-top: 100px;
        }
    }
`

export default MainBanner;