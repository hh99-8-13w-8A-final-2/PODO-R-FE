import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Ticket from './Ticket';
import axios from 'axios';
import { useQuery } from "react-query"

const fetchOpenMusical = () => {
    return axios.get('http://3.39.240.159/api/musicals/open')
  }

const TicketOpenList = () => {

    const { status, data, error } = useQuery('/OpenMusical', fetchOpenMusical,
        {
            refetchOnWindowFocus: false,
        }
    )

    return (
        <div>
            <StH3>티켓 오픈 공연</StH3>
            <Ticket status={status} data={data} error={error} />
        </div>
    );
};

const StH3 = styled.h3`
    font-size: 18px;
    color: var(--white);
    padding: 20px 10px;
`


export default TicketOpenList;