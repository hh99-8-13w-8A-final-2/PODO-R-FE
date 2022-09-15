import React from 'react';
import styled from 'styled-components';
import event from '../../assets/img/event.png'

const Event = () => {
    return (
        <div>
            <StDiv>
                <h3>이벤트</h3>
            </StDiv>
            <StEventBanner event={event}></StEventBanner>
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
`

const StEventBanner = styled.div`
    width: 670px;
    height: 100px;
    background: ${props => `url(${props.event})`};
    background-size: cover;
    background-position: center;
`

export default Event;