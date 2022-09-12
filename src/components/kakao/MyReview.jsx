import React, { useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MyReview = ({data}) => {

  console.log(data)


  return (
    <StMyReview>
      {data?.map(review => (
      <StReview key={review.reviewId}>
      <StDiv imgUrl={review.imgUrl}></StDiv>
      <StH3>{review.grade}석 {review.floor} {review.section}구역 {review.row}열 {review.seat}</StH3>
      </StReview>


))}
    </StMyReview>
    
  )
  };

export default MyReview;


const StMyReview = styled.div`
  display: flex;
  flex-wrap: wrap;
`
const StH3 = styled.h3`
    font-size: 18px;
    color: var(--white);
    padding: 20px 10px;
`



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
`;


const StDiv = styled.div`
    width: 130px;
    height: 130px;
    background:${props => `url(${props.imgUrl})`}; 
    background-size: cover;
    display: flex;
    text-align: center;
    background-position: center;
    margin-left: 10px;
    border-radius: 8px;
`