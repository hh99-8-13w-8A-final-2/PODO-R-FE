import React from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import logo_footer from '../../assets/img/logo_footer.svg'

const Footer = () => {
    return (
        <StFooter>
            <Layout>
                <StFooterCont>
                    <div>
                        <img src={logo_footer} alt="" />
                    </div>
                    <StFooterUl>
                        <li>About</li>
                        <li>개인정보처리방침</li>
                        <li>이용약관</li>
                        <li>Q&A</li>
                    </StFooterUl>
                </StFooterCont>
            </Layout>
        </StFooter>
    );
};

const StFooter = styled.footer`
    width: 100%;
`

const StFooterCont = styled.div`
    display: flex;
    justify-content: space-between;
    div {
        padding: 40px 20px;
    }
`

const StFooterUl = styled.ul`
    display: flex;
    color: var(--white);
    padding: 40px 20px;
    li {
        margin-left: 10px;
        cursor: pointer;
    }
`


export default Footer;