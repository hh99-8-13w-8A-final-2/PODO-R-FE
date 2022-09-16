import React from "react";
import styled from "styled-components";
import { useParams } from "react-router-dom";



const MyTicket = ({ data, GetMyReview }) => {


  const setMusicalIdHandler = (musicalId) => {
    GetMyReview(musicalId)
  }

  return (
    <StMyTicket>
      {data?.content.map((ticket) => (
        <StTicket key={ticket.musicalId} onClick={()=>setMusicalIdHandler(ticket.musicalId)}>
          <StDiv imgUrl={ticket.musicalPoster}>
            <StH3>{ticket.musicalName}</StH3>
            <StDiv1>{ticket.musicalRegion}</StDiv1>
            <StDiv2>{ticket.openDate} ~ {ticket.closeDate}</StDiv2>
          </StDiv>
        </StTicket>
      ))}
    </StMyTicket>
  );
};

export default MyTicket;

const StMyTicket = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const StTicket = styled.div`
  width: 190px;
  height: 190px;
  border: 1px solid black;
  margin: 20px;
  border-radius: 10px;
`;

const StDiv = styled.div`
  width: 190px;
  height: 190px;
  background: linear-gradient(
      0deg,
      rgba(0, 0, 0, 1) 0%,
      rgba(0, 0, 0, 0) 80%,
      rgba(0, 0, 0, 0) 100%
    ),
    ${(props) => `url(${props.imgUrl})`};
  background-size: cover;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
  background-position: center;
  border-radius: 8px;
  line-height: 20px;
  cursor: pointer;
`;

const StH3 = styled.h3`
  font-size: 17px;
  color: var(--white);
  width: 180px;
  line-height: 1.0;
  height: 1.8em;
  display: inline-block;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: left;
  word-wrap: break-word;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  /* margin: 0px 0px 20px 0px; */
`;

const StDiv1 = styled.div`
  font-size: 14px;
  width: 180px;
  color: var(--gray-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* margin: 0px 0px 20px 20px; */
`;

const StDiv2 = styled.div`
  font-size: 14px;
  width: 180px;
  color: var(--gray-1);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  /* margin: 0px 0px 20px 20px; */
`;
