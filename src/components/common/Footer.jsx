import React from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import logo_footer from '../../assets/img/logo_footer.svg'

const Footer = () => {
    const yelim = "https://github.com/97yelim"
    const suweon = "https://github.com/kksltv123"
    const ParkYongWon = "https://github.com/ParkYongWon"
    const hunkim00 = "https://github.com/hunkim00"
    const kimilm = "https://github.com/kimilm"
    const yurikim = "http://yurikim.net"
    return (
        <StFooter>
            <Layout>
                <StFooterCont>
                    <div>
                        <img className='footerLogo' src={logo_footer} alt="하단 로고" />
                    </div>
                    <StFooterUl>
                        <li className='bold'>FE</li>
                        <li className='name' onClick={()=>{window.open(yelim)}}>김예림</li>
                        <li className='name' onClick={()=>{window.open(suweon)}}>박수원</li>
                        <li className='name' onClick={()=>{window.open(ParkYongWon)}}>박용원</li>
                        <li className='bold'>BE</li>
                        <li className='name' onClick={()=>{window.open(hunkim00)}}>김훈</li>
                        <li className='name' onClick={()=>{window.open(kimilm)}}>김휘림</li>
                        <li className='bold'>UI/UX</li>
                        <li className='name' onClick={()=>{window.open(yurikim)}}>김유리</li>
                    </StFooterUl>
                </StFooterCont>
            </Layout>
        </StFooter>
    );
};

const StFooter = styled.footer`
    width: 100%;
    margin-top: 80px;
`

const StFooterCont = styled.div`
    display: flex;
    justify-content: space-between;
    div {
        width: 100%;
        padding: 40px 20px;
    }
    @media (max-width: 763px){
        div{
             width:50%;
             padding: 40px 0;
        }
    }
`

const StFooterUl = styled.ul`
    display: flex;
    color: var(--white);
    padding: 40px 20px;
    li {
        margin-left: 10px;
        color: var(--gray-2);
        &.bold{
            font-weight: 700;
            margin: 0 10px 0 40px;
        }
        &.name{
            cursor: pointer;
        }
    }
    @media (max-width: 763px){
        font-size: .5em;
        padding: 40px 0;
        li {
            margin-left: 3px;
            &.bold{
                margin: 0 10px 0 20px;
            }
        }
    }
`


export default Footer;