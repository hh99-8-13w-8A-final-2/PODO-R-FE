import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Ticket from './Ticket';
import TicketList from './TicketList';
import axios from 'axios';
import { useQuery } from "react-query"
import apis from '../../apis/apis';

const URI = {
    BASE : process.env.REACT_APP_BASE_URI
  }

const fetchOpenMusical = () => {
    //return axios.get(`${URI.BASE}/api/musicals/open`)
    return apis.getOpenMusical()
  }

const fetchAllMusical = () => {
    return apis.getAllMusical()
}

const TicketOpenList = () => {

    const { status, data ,  error } = useQuery('/OpenMusical', fetchOpenMusical,
        {
            staleTime: 1000,
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
                <h3>공연 리스트</h3>
                {
                    listAllOpen === false ? <p onClick={listToggle}>뮤지컬 전체보기</p> :<p onClick={listToggle}>접기</p>
                }
            </div>
            {
                listAllOpen === false ? <TicketList status={status} data={data} error={error} /> :<Ticket  />
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