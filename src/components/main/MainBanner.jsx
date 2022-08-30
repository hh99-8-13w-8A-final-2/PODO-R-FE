import React from 'react';
import styled from 'styled-components';
import bnr from '../../assets/img/bnr.png'

const MainBanner = () => {
    return (
        <StMainBanner bnr={bnr}>
            <div>
                <h3>포도알 서비스 런칭</h3>
                <p>당신이 원하는 바로 그 자리 포도알에 전부 다 있습니다.</p>
            </div>
        </StMainBanner>
    );
};

const StMainBanner = styled.div`
    height: 300px;
    width: 1400px;
    background-image: ${props => `url(${props.bnr})`};
    background-size: cover;
    background-position: center;
    color: var(--white);
    position: relative;
    div {
        position: absolute;
        top: 50%;
        transform: translateY(-50%);
        left: 200px;
        h3 {
            font-size: 40px;
        }
        p {
            margin-top: 20px;
            font-size: 24px;
            width: 260px;
        }
    }
`

export default MainBanner;