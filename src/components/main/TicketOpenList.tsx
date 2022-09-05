import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import Ticket from './Ticket';
import axios from 'axios';

export interface Iword {
    musicalId: number,
    musicalName: string,
    musicalRegion: string,
    musicalTheater: string,
    musicalPoster: string,
    openDate: string,
    closeDate: string
}

const TicketOpenList = () => {
    const [tickets, setTickets] = useState<Iword[]>([]);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        const fetchTicket = async () => {
            setLoading(true)
            const res = await axios.get<Iword[]>("http://3.39.240.159/api/musicals/open")
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