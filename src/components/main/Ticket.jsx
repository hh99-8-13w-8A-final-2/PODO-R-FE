import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom'
import apis from '../../apis/apis';
import { useQuery } from "react-query"

const fetchAllMusical = () => {
    return apis.getAllMusical()
}

const Ticket = () => {
    const { status, data, error } = useQuery('/AllMusical', fetchAllMusical,
        {
            staleTime: 1000,
            refetchOnWindowFocus: false,
        }
    )


    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }
    

    return (
        <StWrapDiv>
            {data?.data.map(ticket => (
                <Link to={`musicals/${ticket.musicalId}/reviews`} key={ticket.musicalId}>
                    <StDiv imgUrl={ticket.musicalPoster}>
                        <StH4>{ticket.musicalName}</StH4>
                        <StDiv1>{ticket.musicalTheater}</StDiv1>
                        <StDiv2>{ticket.openDate.substr(2,8)} ~ {ticket.closeDate.substr(2,8)}</StDiv2>
                    </StDiv>
                </Link>
            ))}
        </StWrapDiv>
    );
};

const StWrapDiv = styled.div`
    display: grid;
    grid-template-columns: repeat(6, 1fr);
    margin-bottom: 40px;
    a {
        text-decoration: none;
    }
    @media (max-width: 763px){
        grid-template-columns: repeat(2, 1fr);
        justify-items: center;
    }
`

const StDiv = styled.div`
    width: 200px;
    height: 280px;
    background:linear-gradient( 0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,0) 100% ), ${props => `url(${props.imgUrl})`};
    background-position: center center;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: center;
    box-sizing: border-box;
    position: relative;
    padding: 10px;
    margin: 15px;
    line-height: 20px;
    cursor: pointer;
    border-radius: 20px;
    margin-bottom: 50px;
    @media (max-width: 763px){
        width: 160px;
        height: 230px;
        margin-bottom: 30px;
    }
    @media (max-width: 375px){
        width: 130px;
        height: 160px;
        border-radius: 10px;
        margin-bottom: 30px;
    }
`
const StH4 = styled.h4`
    font-size: 20px;
    color: var(--white);
    width: 160px;
    line-height: 1.2;
    height: 2.7em;
    display: inline-block;
    white-space: normal;
    overflow: hidden;
    text-overflow: ellipsis;
    text-align: left;
    word-wrap: break-word;
    word-break: keep-all;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    @media (max-width: 763px){
        font-size:  1.1em;
        width: 140px;
    }
    @media (max-width: 375px){
        width: 100px;
        font-size: 12px;
    }
`

const StDiv1 = styled.div`
    font-size: 14px;
    width: 160px;
    color: var(--white);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media (max-width: 763px){
        width: 140px;
    }
    @media (max-width: 375px){
        width: 100px;
        font-size: 10px;
    }
` 

const StDiv2 = styled.div`
    font-size: 14px;
    width: 160px;
    color: var(--white);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    @media (max-width: 763px){
        width: 140px;
        font-size: .7em;
    }
    @media (max-width: 375px){
        width: 100px;
        font-size: 10px;
    }
`

export default Ticket;