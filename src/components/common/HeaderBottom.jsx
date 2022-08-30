import React from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import info from '../../assets/img/info.svg'

const HeaderBottom = () => {
    return (
        <StHeaderBottom>
            <Layout>
                <StHeaderBottomCont>
                    2022 푸에르자 부르타 웨이라 인 서울 [2022 FUERZA BEUTA WAYRA IN SEOUL] <span>잠실 종합운동장 FB 씨어터</span> <img src={info} alt="" className='icon'/>
                </StHeaderBottomCont>
            </Layout>
        </StHeaderBottom>
    );
};

const StHeaderBottom = styled.div`
    width: 100%;
    border-bottom: 1px solid var(--maincolor-1);
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