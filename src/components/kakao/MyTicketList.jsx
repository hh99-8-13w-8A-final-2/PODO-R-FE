import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyTicket from "./MyTicket";
import axios from "axios";

const MyTicketList = ({ setMyReviewData }) => {


  const URI = {
    BASE : process.env.REACT_APP_BASE_URI
  }

  const [data, setData] = useState();

    
  const MyMusicalFind = async () => {
    const response = await axios({
      method: "get",
      url: `${URI.BASE}/api/mypage/musicals`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      }
    });
    setData(response.data)
  };

  

  const GetMyReview = (getMusicalId) => {
    const MyDetailReview = async () => {
      const response2 = await axios({
        method: "get",
        url: `${URI.BASE}/api/mypage/${getMusicalId}/reviews`,
        headers: {
          Authorization: localStorage.getItem("accessToken"),
        },
      });
      setMyReviewData(response2.data)
      console.log(response2.data)
    };
    MyDetailReview()
  }

  useEffect(() => {
    MyMusicalFind();
  }, []);


  return (
    <div>
      <StH3>내가 관람한 공연</StH3>
      <StMyTicketList>
        <MyTicket data={data} GetMyReview = {GetMyReview}/>
      </StMyTicketList>
    </div>
  );
};

export default MyTicketList;

const StMyTicketList = styled.div`
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
