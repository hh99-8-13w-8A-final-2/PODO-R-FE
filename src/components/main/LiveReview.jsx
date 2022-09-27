import React, { useRef } from 'react';
import styled from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';
import { ReactComponent as Perfect } from '../../assets/img/icon_perfect.svg'
import { ReactComponent as NotGodd } from '../../assets/img/icon_notgood.svg'
import { ReactComponent as Gap } from '../../assets/img/gap.svg'
import { ReactComponent as View } from '../../assets/img/view.svg'
import { ReactComponent as Sound } from '../../assets/img/sound.svg'
import { ReactComponent as Light } from '../../assets/img/light.svg'
import { useLocation } from 'react-router-dom';

const LiveReview = ({ status, reviewList, error, handleModal }) => {
    const swiperRef = useRef(null)
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(2, 1).toString()

    if (window.location.path === `/musicals/${musicalId}/reviews`) return null;
    // 데이터를 서버에서 성공적으로 가져올 수 있는지 확인
    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }



    return (
        <div
        onMouseEnter={() => swiperRef.current.swiper.autoplay.stop()}
        onMouseLeave={() => swiperRef.current.swiper.autoplay.start()}
        >
        <Swiper
            ref={swiperRef}
            spaceBetween={40}
            slidesPerView={6}
            modules={[Pagination, Navigation, Autoplay]}
            loop={true}
            autoplay={{
            delay: 3000,
            }}
        >
            <StFlowBox>
                {reviewList?.data.map((review) => (
                        <SwiperSlide key={review.reviewId} onClick={() => handleModal(review.reviewId, review.musicalId)}>
                            <StReviewBox imgUrl={review.imgUrl}>
                                    <StH3>{review.floor} {review.section !== '0' && review.section + '구역'} {review.row}열 {review.seat}</StH3>
                                    <StIconDiv>
                                        {review.reviewScore === 10 && <StPerfectDiv><Perfect/><span>모든게완-벽</span></StPerfectDiv>}
                                        {review.evaluation.gap === 3 && review.reviewScore < 10 ? <div><Gap fill='#fff' /><span>단차좋음</span></div> : null}
                                        {review.evaluation.sight === 3 && review.reviewScore < 10 ? <div><View fill='#fff' /><span>시야좋음</span></div> : null}
                                        {review.evaluation.sound === 3 && review.reviewScore < 10 ? <div><Sound fill='#fff' /><span>음향좋음</span></div> : null}
                                        {review.evaluation.light === 3 && review.reviewScore < 10 ? <div><Light fill='#fff' /><span>조명좋음</span></div> : null}
                                        {
                                        review.evaluation.gap < 3 && 
                                        review.evaluation.sight < 3 &&
                                        review.evaluation.sound < 3 &&
                                        review.evaluation.light < 3 &&
                                            <StNotGoodDiv><NotGodd/><span>정말별로</span></StNotGoodDiv>
                                        }
                                    </StIconDiv>  
                                    <StDiv>{review.reviewScore}</StDiv>
                            </StReviewBox>
                        </SwiperSlide>
                ))}
            </StFlowBox>
        </Swiper>
        </div>
    );
};
const StFlowBox = styled.div`
    display: flex;
    flex: 0 0 auto;
    white-space: nowrap;
    overflow: hidden;
    transition: 0.3s;
`

const StReviewBox = styled.div`
    color: var(--white);
    align-items: center;
    justify-content: space-evenly;
    display: flex;
    position: relative; 
    width: 200px;
    height: 200px;
    cursor: pointer;
    border-radius: 100px;
    border: none;
    background-blend-mode: multiply;
    background: ${props => `url(${props.imgUrl})`};
    background-color: rgba(0,0,0,0.7);
    background-size: cover;
    background-position: center;
`

const StH3 = styled.h3`
    width: 160px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 40px;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
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

const StIconDiv = styled.div`
    display: flex;
    align-items: center;
    div {
        display: flex;
        flex-direction: column;
        align-items: center;
        span {
            font-size: 12px;
        }
    }
`

const StPerfectDiv = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`

const StNotGoodDiv = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
`

export default LiveReview;