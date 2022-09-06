import React, { useRef, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { Swiper, SwiperSlide } from "swiper/react";
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper';
import gap from '../../assets/img/gap.svg'
import view from '../../assets/img/view.svg'
import sound from '../../assets/img/sound.svg'
import light from '../../assets/img/light.svg'
import perfect from '../../assets/img/icon_perfect.svg'
import notgood from '../../assets/img/icon_notgood.svg'


const LiveReview = ({ status, reviewList, error }) => {
    const swiperRef = useRef(null)
    const [ ishover, setIshover ] = useState(false)
    
    // 데이터를 서버에서 성공적으로 가져올 수 있는지 확인
    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }

    // LiveReview에 hover 했을 때 boolean 값 설정
    const handleMouseEnter = (idx) => {
        const newArr = Array(reviewList.data.length).fill(false)
        newArr[idx] = true;
        setIshover(newArr)
    }


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
                {reviewList?.data.map((review, index) => (
                    <SwiperSlide key={index}>
                        <StReviewBox 
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={() => setIshover(false)}
                            >
                                {ishover[index] ?
                                <StHoverDiv>
                                    {review.reviewScore === 10 && <StPerfectDiv><img src={perfect} alt="단차"/>모든것이완벽</StPerfectDiv>}
                                    {review.evaluation.gap === 3 && review.reviewScore < 10 ? <div><img src={gap} alt="단차"/>단차좋음</div> : null}
                                    {review.evaluation.sight === 3 && review.reviewScore < 10 ? <div><img src={view} alt="시야"/>시야좋음</div> : null}
                                    {review.evaluation.sound === 3 && review.reviewScore < 10 ? <div><img src={sound} alt="음향"/>음향좋음</div> : null}
                                    {review.evaluation.light === 3 && review.reviewScore < 10 ? <div><img src={light} alt="조명"/>조명좋음</div> : null}
                                    {
                                    review.evaluation.gap < 3 && 
                                    review.evaluation.sight < 3 &&
                                    review.evaluation.sound < 3 &&
                                    review.evaluation.light < 3 &&
                                        <StNotGoodDiv><img src={notgood} alt="단차"/>정말별루닷</StNotGoodDiv>
                                    }
                                </StHoverDiv>  
                            :
                                <>
                                    <StH3>{review.musicalName}</StH3>
                                    <StP>{review.reviewContent}</StP>
                                    <StDiv>{review.reviewScore}</StDiv>
                                </>
                            }
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
    color: #888;
    width: 200px;
    height: 200px;
    border-radius: 100px;
    border: 1px solid #888;
    align-items: center;
    justify-content: space-evenly;
    position: relative;
    display: flex;
    cursor: pointer;
    :hover {
        background-color: #bb63ff;
        color: #fff;
    }
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

const StHoverDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    div {
        width: 100px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        margin-bottom: 10px;
    }
`

const StPerfectDiv = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    img {
        margin-bottom: 10px;
    }
`

const StNotGoodDiv = styled.div`
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 10px;
    img {
        margin-bottom: 10px;
    }
`

export default LiveReview;