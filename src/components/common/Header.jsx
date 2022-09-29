import React, { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import logo from "../../assets/img/logo.svg";
import { useNavigate, useLocation } from "react-router-dom";
import KakaoLogin from "../kakao/KakaoLogIn";
import KaKaoLogOut from "../kakao/KaKaoLogOut";
import { useSelector } from "react-redux";
import UserProfile from "../kakao/UserProfile";
import MyPageBtn from "../kakao/MyPageBtn";
import goBack from "../../assets/img/goBack.svg"

const Header = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const isLogin = useSelector((state) => state.user.isLogin);
  const onClickHandler = () => {
    navigate("/");
  };
  const onGoBack = () =>{
    navigate("/");
  }
  return (
    <StHeader>
      <Layout>
        <StHeaderCont>
          {location.pathname !== '/' ? <div onClick={onGoBack} style={{cursor:"pointer"}}><img src={goBack} alt="" className="goBack" /> <p>메인으로</p></div> : <div></div>}
          <img className="logo" src={logo} alt="로고 이미지" onClick={onClickHandler} />
          <div>
            {isLogin ? (
              <StDiv>
                <MyPageBtn />
                <KaKaoLogOut />
              </StDiv>
            ) : (
              <KakaoLogin />
            )}
          </div>
        </StHeaderCont>
      </Layout>
    </StHeader>
  );
};

const StHeader = styled.div`
  width: 100%;
`;

const StHeaderCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: var(--white);
  padding: 30px 0px;
  position: relative;
  .goBack{
    width: 15px;
    position: static;
    margin-right: 10px;
  }
  img.logo {
    width: 15%;
    cursor: pointer;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  div {
    display: flex;

  }
  @media (max-width: 763px){
    img.logo{
      width: 50%;
    }
    p{
      font-size: 14px;
    }
  }
`;

const StDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default Header;
