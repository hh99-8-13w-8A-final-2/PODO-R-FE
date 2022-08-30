import React from 'react';
import Layout from './Layout';
import styled from 'styled-components';
import logo from '../../assets/img/logo.svg'

const Header = () => {
    return (
        <StHeader>
            <Layout>
                <StHeaderCont>
                    <div>돌아가기 버튼</div>
                    <img src={logo} alt="" />
                    <div>로그인 아이콘</div>
                </StHeaderCont>
            </Layout>
        </StHeader>
    );
};

const StHeader = styled.div`
    width: 100%;
`

const StHeaderCont = styled.div`
    display: flex;
    justify-content: space-between;
    color: var(--white);
    padding: 20px;
`

export default Header;
