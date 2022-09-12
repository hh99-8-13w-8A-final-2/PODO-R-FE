import React from 'react';
import styled from 'styled-components';

const MyTicket = () => {
    return (
        <StMyTicket>
            <StDiv imgUrl="http://k.kakaocdn.net/dn/eRxjAn/btrKZ70Mq9D/bl3Kt6sbcDSwFKkg2pnLa0/img_640x640.jpg">

            </StDiv>
            
        </StMyTicket>
    );
};

export default MyTicket;

const StMyTicket = styled.div`
    width: 190px;
    height: 190px;
    border: 1px solid black;
    background-color: pink;
    margin: 20px;
    border-radius: 10px;
`


const StDiv = styled.div`
    width: 190px;
    height: 190px;
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
    /* background-color: red; */
`