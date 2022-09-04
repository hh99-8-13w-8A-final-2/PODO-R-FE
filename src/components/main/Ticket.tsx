import React from 'react';
import styled from 'styled-components';
import { Iword } from './TicketOpenList';

interface Iprops {
    loading: boolean
    tickets: Iword[];
}


const Ticket = ({loading, tickets } :Iprops) => {
    if(loading) { return <h2>Loading...</h2> }

    return (
        <StWrapDiv>
            {tickets.map(ticket => (
                <StDiv imgUrl={ticket.musicalPoster} key={ticket.musicalId}>
                    <StH4>{ticket.musicalName}</StH4>
                    <StDiv1>{ticket.musicalTheater}</StDiv1>
                    <StDiv2>{ticket.openDate} + {ticket.closeDate}</StDiv2>
                </StDiv>
            ))}
        </StWrapDiv>
    );
};
const StWrapDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
`

const StDiv = styled.div< {imgUrl : string} >`
    width: 200px;
    height: 300px;
    background:linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,0) 100%), ${props => `url(${props.imgUrl})`};
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    padding: 10px;
    line-height: 20px;
`
const StH4 = styled.h4`
    font-size: 20px;
    color: var(--white);
    width: 180px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const StDiv1 = styled.div`
    font-size: 14px;
    width: 180px;
    color: var(--white);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
` 

const StDiv2 = styled.div`
    font-size: 14px;
    width: 180px;
    color: var(--white);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

export default Ticket;