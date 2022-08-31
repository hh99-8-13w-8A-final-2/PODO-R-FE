import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Ticket from './Ticket';
import axios from 'axios';

const TicketOpenList = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchTicket = async () => {
            setLoading(true)
            const res = await axios.get("http://localhost:3001/open")
            setTickets(res.data)
            setLoading(false)
        }
        fetchTicket();
    }, [])

    return (
        <div>
            <StH3>티켓 오픈 공연</StH3>
            <Ticket loading={loading} tickets={tickets} />
        </div>
    );
};

const StH3 = styled.h3`
    font-size: 18px;
    color: var(--white);
    padding: 20px 10px;
`


export default TicketOpenList;