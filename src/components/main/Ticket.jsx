import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'



const Ticket = ({status, data, error }) => {

    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }

    return (
        <StWrapDiv>
            {data?.data.map(ticket => (
                <Link to={`api/musicals/${ticket.musicalId}/reviews`} key={ticket.musicalId}>
                    <StDiv imgUrl={ticket.musicalPoster}>
                        <StH4>{ticket.musicalName}</StH4>
                        <StDiv1>{ticket.musicalTheater}</StDiv1>
                        <StDiv2>{ticket.openDate} ~ {ticket.closeDate}</StDiv2>
                    </StDiv>
                </Link>
            ))}
        </StWrapDiv>
    );
};

const StWrapDiv = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    a {
        text-decoration: none;
    }
`

const StDiv = styled.div`
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
    cursor: pointer;
`
const StH4 = styled.h4`
    font-size: 20px;
    color: var(--white);
    width: 180px;
    line-height: 1.2;
    height: 2.4em;
    display: inline-block;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    word-wrap: break-word;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
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