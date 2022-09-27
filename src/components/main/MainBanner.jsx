import React, { useRef } from 'react';
import styled from 'styled-components';
import bnr from '../../assets/img/bnr.webp'
import bnr2 from '../../assets/img/bnr2.webp'
import bnr3 from '../../assets/img/bnr3.webp'
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
    const eventLink1 = "https://forms.gle/RxDB2sa2ejAnDQpT7"
    const eventLink2 = "https://forms.gle/CRbxHXdK6mc259568"
    

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
                <StMainBanner bnr={bnr2}  onClick={()=>{window.open(eventLink1)}}>
                    <div>
                        <p>포도알 서비스 런칭 기념 이벤트</p>
                        <p>설문조사 참여하고 선물 받아가세요!</p>
                        <p className='button'>설문조사 하러가기</p>
                    </div>    
                </StMainBanner>
            </SwiperSlide>
            <SwiperSlide>
                <StMainBanner bnr={bnr3} onClick={()=>{window.open(eventLink2)}}>
                    <div>
                        <p>혹시 개발자도 찾지 못한 버그를 찾으셨나요?</p>
                        <p>리포트를 쓰고 선물 받아가세요!</p>
                        <p className='button'>리포트 쓰러가기</p>
                    </div>    
                </StMainBanner>
            </SwiperSlide>
            <SwiperSlide>
                <Link to={'/guide'}>
                    <StMainBanner bnr={bnr}>
                        <div>
                            <p>당신이 고민하는 그 자리</p>
                            <p>포도알에서 좌석 리뷰를 확인해보세요!</p>
                            <p className='button'>가이드 보러가기</p>
                        </div>    
                    </StMainBanner>
                </Link>
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
    text-align: center;
    background-image: ${props => `url(${props.bnr})`};
    background-size: cover;
    background-position: center;
    color: var(--white);
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    div {
        /* position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 200px; */
        color: var(--white);
        p {
            font-size: 2em;
            line-height:1.5em;
        }
        .button{
            display: inline-block;
            padding: 10px 20px;
            font-size:18px;
            border: 1px solid var(--maincolor-1);
            margin-top:40px;
            /* background-color: var(--maincolor-2); */
            border-radius: 40px;
            color: var(--maincolor-1)
        }
    }
`

export default MainBanner;