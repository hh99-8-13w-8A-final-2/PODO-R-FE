import React from 'react';
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import styled from 'styled-components';
import { Link } from 'react-router-dom'

const TicketList = ({status, data, error }) => {
    
    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }

    return (
        <StListDiv>
        <Swiper
          slidesPerView={6}
          spaceBetween={30}
          centeredSlides={true}
          pagination={{
            clickable: true,
          }}
          initialSlide={2}
          //modules={[Pagination]}
          className="mySwiper"
        >
          {data?.data.map(ticket => (
                <SwiperSlide>
                    <Link to={`api/musicals/${ticket.musicalId}/reviews`} key={ticket.musicalId}>
                        <StDiv imgUrl={ticket.musicalPoster}>
                            <StH4>{ticket.musicalName}</StH4>
                            <StDiv1>{ticket.musicalTheater}</StDiv1>
                            <StDiv2>{ticket.openDate.substr(2,8)} ~ {ticket.closeDate.substr(2,8)}</StDiv2>
                        </StDiv>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
      </StListDiv>
    );
};

export default TicketList;



const StListDiv =styled.div`
    .swiper-pagination-bullet {background-color:var(--gray-2)}
`
const StDiv = styled.div`
    width: 200px;
    height: 280px;
    background:linear-gradient(0deg, #111111ae 100%, rgba(0,0,0,0) 100%), ${props => `url(${props.imgUrl})`};
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
`

const StDiv1 = styled.div`
    font-size: 14px;
    width: 160px;
    color: var(--white);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
` 

const StDiv2 = styled.div`
    font-size: 14px;
    width: 160px;
    color: var(--white);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
