import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Gap } from "../../assets/img/gap.svg";
import { ReactComponent as View } from "../../assets/img/view.svg";
import { ReactComponent as Sound } from "../../assets/img/sound.svg";
import { ReactComponent as Light } from "../../assets/img/light.svg";
import { useState } from "react";
import { useInView } from "react-intersection-observer";

const MyReview = ({ data, handleModal, singleData, fetchNextPage, isFetchingNextPage, fetchNextPage2, isFetchingNextPage2}) => {

  const { ref, inView } = useInView();

  useEffect(() => {
    if(inView) fetchNextPage();
  }, [inView]);

  useEffect(() => {
    if(inView) fetchNextPage2();
  }, [inView]);

  return (
    <div>
      {singleData === undefined || singleData.pages[0].data === undefined ? (
        <div>
          {data?.pages.map((group, i) => {
            return(
            <StMyReview key={i}>
              {group.data.map((review) => {
                return(
                  <StReview key={review.reviewId} onClick={()=>handleModal(review.reviewId, review.musicalId)}>
                    <StDiv imgUrl={review.imgUrl}></StDiv>
                    <StH3>
                      {review.grade}석 {review.floor} {review.section}구역{" "}
                      {review.row}열 {review.seat}
                    </StH3>
                    <StIconDiv>
                      {review.evaluation.gap === 3 && <div><Gap fill='#BB63FF'/><span>단차좋음</span></div>}
                      {review.evaluation.gap === 2 && <div><Gap fill='#444'/><span>단차보통</span></div>}
                      {review.evaluation.gap === 1 && <div><Gap fill='#444'/><span>단차나쁨</span></div>}
                      {review.evaluation.sight === 3 && <div><View fill='#BB63FF'/><span>시야좋음</span></div>}
                      {review.evaluation.sight === 2 && <div><View fill='#444'/><span>시야보통</span></div>}
                      {review.evaluation.sight === 1 && <div><View fill='#444'/><span>시야나쁨</span></div>}
                      {review.evaluation.sound === 3 && <div><Sound fill='#BB63FF'/><span>음향좋음</span></div>}
                      {review.evaluation.sound === 2 && <div><Sound fill='#444'/><span>음향보통</span></div>}
                      {review.evaluation.sound === 1 && <div><Sound fill='#444'/><span>음향나쁨</span></div>}
                      {review.evaluation.light === 3 && <div><Light fill='#BB63FF'/><span>조명좋음</span></div>}
                      {review.evaluation.light === 2 && <div><Light fill='#444'/><span>조명보통</span></div>}
                      {review.evaluation.light === 1 && <div><Light fill='#444'/><span>조명나쁨</span></div>}
                    </StIconDiv>
                  </StReview> 
                      )})}
            </StMyReview>
            )
          })}
          <StMoreDiv ref = {ref}>
            {isFetchingNextPage}
            Nothing more to load
          </StMoreDiv> 
        </div>
      ) : (
        <div>
          {singleData?.pages.map((group, i) => {
            return(
            <StMyReview key={i}>
              {group.data.map((review) => {
                return(
                  <StReview key={review.reviewId} onClick={()=>handleModal(review.reviewId, review.musicalId)}>
                    <StDiv imgUrl={review.imgUrl}></StDiv>
                    <StH3>
                      {review.grade}석 {review.floor} {review.section}구역{" "}
                      {review.row}열 {review.seat}
                    </StH3>
                    <StIconDiv>
                      {review.evaluation.gap === 3 && <div><Gap fill='#BB63FF'/><span>단차좋음</span></div>}
                      {review.evaluation.gap === 2 && <div><Gap fill='#444'/><span>단차보통</span></div>}
                      {review.evaluation.gap === 1 && <div><Gap fill='#444'/><span>단차나쁨</span></div>}
                      {review.evaluation.sight === 3 && <div><View fill='#BB63FF'/><span>시야좋음</span></div>}
                      {review.evaluation.sight === 2 && <div><View fill='#444'/><span>시야보통</span></div>}
                      {review.evaluation.sight === 1 && <div><View fill='#444'/><span>시야나쁨</span></div>}
                      {review.evaluation.sound === 3 && <div><Sound fill='#BB63FF'/><span>음향좋음</span></div>}
                      {review.evaluation.sound === 2 && <div><Sound fill='#444'/><span>음향보통</span></div>}
                      {review.evaluation.sound === 1 && <div><Sound fill='#444'/><span>음향나쁨</span></div>}
                      {review.evaluation.light === 3 && <div><Light fill='#BB63FF'/><span>조명좋음</span></div>}
                      {review.evaluation.light === 2 && <div><Light fill='#444'/><span>조명보통</span></div>}
                      {review.evaluation.light === 1 && <div><Light fill='#444'/><span>조명나쁨</span></div>}
                    </StIconDiv>
                  </StReview> 
                      )})}
            </StMyReview>
            )
          })}
          <StMoreDiv ref = {ref}>
            {isFetchingNextPage2}
            Nothing more to load
          </StMoreDiv>
        </div>
      )}
    </div>
  );
};

export default MyReview;

const StMyReview = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  align-content: center;
`;
const StH3 = styled.h3`
  font-size: 18px;
  color: var(--white);
  padding: 20px 10px;
`;

const StReview = styled.div`
  width: 600px;
  height: 150px;
  border: 1px solid black;
  background-color: var(--gray-3);
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  color: white;
`;

const StDiv = styled.div`
  width: 130px;
  height: 130px;
  background: ${(props) => `url(${props.imgUrl})`};
  background-size: cover;
  display: flex;
  text-align: center;
  background-position: center;
  margin-left: 10px;
  border-radius: 8px;
`;

const StIconDiv = styled.div`
  display: flex;
  justify-content: flex-start;
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 8px;
    &:last-child {
      margin-right: 0;
    }
  }
  span {
    color: var(--gray-2);
    font-size: 12px;
  }
`;

const StMoreDiv = styled.button`
    width: 1360px;
    margin: 20px;
    background-color: var(--black);
    border: 1px solid var(--gray-2);
    padding: 10px;
    color: var(--gray-2);
    border-radius: 10px;
`
