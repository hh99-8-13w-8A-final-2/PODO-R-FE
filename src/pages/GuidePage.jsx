import React from 'react';
import guide from '../assets/img/guide.webp'
import guide1 from '../assets/img/guide1.webp'
import guide2 from '../assets/img/guide2.webp'
import guide3 from '../assets/img/guide3.webp'
import guide4 from '../assets/img/guide4.webp'
import profile_hun from '../assets/img/profile_hun.webp'
import profile_kimlim from '../assets/img/profile_kimlim.webp'
import profile_suweon from '../assets/img/profile_suweon.webp'
import profile_yelim from '../assets/img/profile_yelim.webp'
import profile_yongwon from '../assets/img/profile_yongwon.webp'
import profile_yuri from '../assets/img/profile_yuri.webp'
import logo_footer from '../assets/img/logo_footer.svg'
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import styled from 'styled-components';
import up from '../assets/img/up.svg'
import { useNavigate } from 'react-router-dom'

const GuidePage = () => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
        navigate("/")
    }
    const goToTop =() =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <>
        <Header/>
        <Layout>
            <StDiv>
                <div className='section'>
                    <h1>명당을 고르는 가장 확실한 방법!</h1>
                    <p>포도알에만 있는 진짜 사진후기로 만나는 공연장별 좌석정보</p>
                    <p>항목별 평가를 통한 단차, 시야, 음향, 정명 정보까지 제공합니다.</p>
                    <img src={guide} alt="" />
                </div>
                <div className='section'>
                    <div><p>1</p></div>
                    <h2>초연, 재연, 삼연.</h2>
                    <h2>같은 공연도 시즌마다 새로우니까</h2>
                    <p>공연의 내용과 시점에 따라 달라지는 연출을 반영한</p>
                    <p>공연장 좌석 후기를 확인할 수 있습니다.</p>
                    <img src={guide1} alt="" />
                </div>
                <div className='section'>
                    <div><p>2</p></div>
                    <h2>백 마디 말보다</h2>
                    <h2>확실한 사진 한 장</h2>
                    <p>직접 그 자리에 앉아본 리뷰어가 전해주는 사진으로</p>
                    <p>더 사실적이고 확실한 후기를 제공합니다.</p>
                    <img src={guide2} alt="" />
                </div>
                <div className='section'>
                    <div><p>3</p></div>
                    <h2>이용자 맞춤형</h2>
                    <h2>리뷰 검색 및 필터링 서비스</h2>
                    <p>좌석 등급별 구역별 필터링은 기본.</p>
                    <p>평가항목별 우수한 좌석 정보만 모아볼 수 있습니다.</p>
                    <img src={guide3} alt="" />
                </div>
                <div className='section'>
                    <div><p>4</p></div>
                    <h2>누구보다 빠르게 만나는 리뷰.</h2>
                    <h2>PODO LIVE</h2>
                    <p>실시간으로 등록되는 리뷰를 모아</p>
                    <p>메인페이지에서 확인할 수 있습니다.</p>
                    <img src={guide4} alt="" />
                </div>
                <div className='section'>
                    <img src={logo_footer} alt="" className='logo' />
                    <p>이선좌, 이결좌 속에서 구해낸</p>
                    <p>당신의 포도알이 헛되지 않도록-</p>
                </div>
                <div className='team'>
                    <p>TEAM PODO</p>
                    <ul>
                        <li>
                            <div><img src={profile_yelim} alt="" /></div>
                            <p className='position'>FE</p>
                            <p>김예림</p>
                            <p className='position'>(Deputy Leader)</p>
                        </li>
                        <li>
                            <div><img src={profile_suweon} alt="" /></div>
                            <p className='position'>FE</p>
                            <p>박수원</p>
                        </li>
                        <li>
                            <div><img src={profile_yongwon} alt="" /></div>
                            <p className='position'>FE</p>
                            <p>박용원</p>
                        </li>
                        <li>
                            <div><img src={profile_hun} alt="" /></div>
                            <p className='position'>BE</p>
                            <p>김 훈</p>
                            <p className='position'>(Leader)</p>
                        </li>
                        <li>
                            <div><img src={profile_kimlim} alt="" /></div>
                            <p className='position'>BE</p>
                            <p>김휘림</p>
                        </li>
                        <li>
                            <div><img src={profile_yuri} alt="" /></div>
                            <p className='position'>UI/UX</p>
                            <p>김유리</p>
                            <p className='position'>(Designer)</p>
                        </li>
                    </ul>
                    <button onClick={onClickHandler}>홈으로 돌아가기</button>
                </div>
                <StCreateDiv>
                    <div>
                        <img src={up} alt="위로 올라가기" onClick={goToTop} />
                    </div>
                </StCreateDiv>
            </StDiv>
        </Layout>
        <Footer/>
        
        </>
    );
};

export default GuidePage;




const StDiv = styled.div`
    .section {
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--white);
        div{
            width: 50px;
            height: 50px;
            border-radius: 40px;
            border: 3px solid var(--maincolor-1);
            text-align: center;
            margin-bottom: 30px;
            p{
                font-size: 1.7em;
                margin: 0;
                line-height: 50px;
                color:var(--maincolor-1);
                font-weight: 700;
            }
        }
        h1{ font-size: 2.6em; font-weight:700; margin-bottom:40px}
        h2 { font-size: 2em; font-weight:700; font-family: 'SUIT', sans-serif; font-weight:600; margin-bottom:5px;}
        h2:last-of-type{margin-bottom:20px;}
        p{font-size:1.3em; font-family: 'SUIT', sans-serif; font-weight:200; margin: 3px 0}
        p:last-of-type{margin-bottom:80px}
        margin: 200px 0;
    }
        img{
            object-fit: fill;
            width: 50%;
            &.logo{
                width: 200px;
                margin-bottom: 40px;
            }
        }
        button{
            margin-top: 40px;
            padding: 15px 20px;
            border-radius: 40px;
            border: none;
            background-color: var(--maincolor-2);
            color:var(--white);
            transition: all .3s;
            cursor: pointer;
            &:hover{
                background-color:var(--maincolor-1)
            }
        }
    .team{
        >p{
            font-size: 1.8em;
            margin-bottom: 40px;
            font-weight: 600;
            color: var(--gray-2);
        }
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 100px;
        color: var(--gray-2);
        ul {display: flex;}
        li{
            font-family: 'SUIT';
            display: flex;
            font-size: 1.2em;
            text-align: center;
            flex-direction: column;
            align-items: center;
            font-size: 1.2em;
            text-align: center;
            margin: 0 20px;
            div{
                width: 70px;
                height: 70px;
                border-radius: 100px;
                background-color: var(--gray-2);
                margin-bottom: 10px;
                overflow: hidden;
                >img{
                    width: 100%;
                }
            }
            p:nth-of-type(2){
                font-weight: 600;
                margin-bottom: 10px;
            }
            .position{
                font-size: .6em ;
                margin-bottom: 10px;
                font-weight: 500;
                color: var(--gray-);
            }
        }
    }
`


const StCreateDiv = styled.div`
position: fixed;
bottom: 30px;
right: 30px;
div{
    z-index: 10;
    width: 3em;
    height: 3em;
    border-radius: 50px;
    background-color: var(--maincolor-2);
    transition: all .3s;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: var(--maincolor-1);
    }
}

    img{
        width: 24px;
    }
`