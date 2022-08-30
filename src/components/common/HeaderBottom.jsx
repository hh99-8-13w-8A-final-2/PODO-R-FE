import React from 'react';
import styled from 'styled-components';
import Layout from './Layout';

const HeaderBottom = () => {
    return (
        <StHeaderBottom>
            <Layout>
                <StHeaderBottomCont>
                    2022 푸에르자 부르타 웨이라 인 서울 [2022 FUERZA BEUTA WAYRA IN SEOUL] <span>잠실 종합운동장 FB 씨어터</span>
                </StHeaderBottomCont>
            </Layout>
        </StHeaderBottom>
    );
};

const StHeaderBottom = styled.div`
    width: 100%;
`

const StHeaderBottomCont = styled.div`
    color: var(--white);
    padding: 20px;
    span {
        margin-left: 10px;
        font-size: 14px;
    }
`

export default HeaderBottom;