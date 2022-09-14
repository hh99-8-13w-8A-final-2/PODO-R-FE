import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Ticket from './Ticket';
import TickeTicketListt from './TicketList';
import axios from 'axios';
import { useQuery } from "react-query"

const URI = {
    BASE : process.env.REACT_APP_BASE_URI
  }

const fetchOpenMusical = () => {
    return axios.get(`${URI.BASE}/api/musicals/open`)
  }

const TicketOpenList = () => {

    const { status, data, error } = useQuery('/OpenMusical', fetchOpenMusical,
        {
            refetchOnWindowFocus: false,
        }
    )

    const [listAllOpen, setListAllOpen] = useState(false)
    const listToggle = ()=>{
        setListAllOpen(!listAllOpen)
    }

    return (
        <StDiv>
            <div className='ticketMenu'>
                <h3>티켓 오픈 공연</h3>
                {
                    listAllOpen === false ? <p onClick={listToggle}>뮤지컬 전체보기</p> :<p onClick={listToggle}>접기</p>
                }
            </div>
            {
                listAllOpen === false ? <TickeTicketListt status={status} data={data} error={error} /> :<Ticket status={status} data={data} error={error} />
            }
        </StDiv>
    );
};

const StDiv = styled.div`
    .ticketMenu{
        display: flex;
        align-items: center;
        justify-content: space-between;
        h3{
            font-size: 18px;
            color: var(--white);
            padding: 20px 10px;
        }
        P{
            color: var(--white);
            cursor: pointer;
        }
    }
`


export default TicketOpenList;