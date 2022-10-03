import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyTicket from "./MyTicket";
import apis from "../../apis/apis";

const MyTicketList = ({ setEachMusicalId }) => {
  const [data, setData] = useState();

  const MyMusicalFind = async () => {
    const headers = { Authorization: localStorage.getItem("accessToken") };
    const response = await apis.getMyMusicalFindList(headers);
    setData(response.data);
  };

  useEffect(() => {
    MyMusicalFind();
  }, []);

  return (
    <div>
      <StH3>내가 관람한 공연</StH3>
      <StMyTicketList>
        <MyTicket data={data} setEachMusicalId={setEachMusicalId} />
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
