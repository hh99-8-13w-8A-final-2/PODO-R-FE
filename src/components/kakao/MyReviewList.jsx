import React, { useEffect } from "react";
import styled from "styled-components";
import MyReview from "./MyReview";
import axios from "axios";
import { useState } from "react";

const MyReviewList = ({ myReviewData }) => {
  const URI = {
    BASE: process.env.REACT_APP_BASE_URI
  };

  console.log(myReviewData)

  const [data, setData] = useState();

  const MyReviewFind = async () => {
    const response = await axios({
      method: "get",
      url: `${URI.BASE}/api/mypage/reviews`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    setData(response.data);
  };

  useEffect(() => {
    MyReviewFind();
  }, []);

  return (
    <div>
      <StH3>선택된 공연 리뷰</StH3>
      <StMyReviewList>
        <MyReview data={data} myReviewData={myReviewData} />
      </StMyReviewList>
    </div>
  );
};

export default MyReviewList;

const StMyReviewList = styled.div`
  width: 100%;
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
