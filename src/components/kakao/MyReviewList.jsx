import React, { useEffect } from 'react';
import styled from 'styled-components';
import MyReview from './MyReview';
import axios from "axios";

const MyReviewList = () => {


  const URI = {
    BASE : process.env.REACT_APP_BASE_URI
  }


    
  const MyReviewFind = async () => {
    const response = await axios({
      method: "get",
      url: `${URI.BASE}/api/mypage/reviews`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });console.log(response)
  }
  

  useEffect(() => {
    MyReviewFind();
  }, []);





    return (
        <div>
            <StH3>선택된 공연 리뷰</StH3>
            <StMyReviewList>
                <MyReview/>
            </StMyReviewList>
        </div>
    );
};

export default MyReviewList;

const StMyReviewList = styled.div`
  width: 1400px;
  /* height: 200px; */
  /* background-color: white; */
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const StH3 = styled.h3`
  font-size: 18px;
  color: var(--white);
  padding: 20px 10px;
`;