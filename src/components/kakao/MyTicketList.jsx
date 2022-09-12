import React, { useEffect } from "react";
import styled from "styled-components";
import MyTicket from "./MyTicket";
import axios from "axios";

const MyTicketList = () => {


  const URI = {
    BASE : process.env.REACT_APP_BASE_URI
  }


    
  const MyTicketFind = async () => {
    try {
      const response = await axios.get(
        `${URI.BASE}/api/mypage/reviews`
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    MyTicketFind();
  }, []);




  return (
    <div>
      <StH3>내가 관람한 공연</StH3>
      <StMyTicketList>
        <MyTicket />
        <MyTicket />
        <MyTicket />
        <MyTicket />
        <MyTicket />
      </StMyTicketList>
    </div>
  );
};

export default MyTicketList;

const StMyTicketList = styled.div`
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
