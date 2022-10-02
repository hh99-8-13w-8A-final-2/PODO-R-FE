import React from 'react';
import styled from 'styled-components';
import event from '../../assets/img/event.webp'

const Event = () => {
    const eventLink = "https://forms.gle/CRbxHXdK6mc259568"
    return (
        <div>
            <StDiv>
                <h3>이벤트</h3>
            </StDiv>
            <StEventBanner event={event} onClick={()=>{window.open(eventLink)}}></StEventBanner>
        </div>
    );
};

const StDiv = styled.div`
    color: var(--white);
    width: 670px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20px 10px;
    h3 {
        font-size: 18px;
    }
    div {
        font-size: 16px;
    }
    @media (max-width: 763px){
        width: 100%;
        margin-top: 50px;
    }
`

const StEventBanner = styled.div`
    width: 670px;
    height: 100px;
    background: ${props => `url(${props.event})`};
    background-size: cover;
    background-position: center;
    border-radius:10px;
    cursor: pointer;
    @media (max-width: 763px){
        width:100%;
    }
`

export default Event;