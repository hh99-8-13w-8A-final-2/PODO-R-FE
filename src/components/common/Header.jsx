import React, { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import KakaoLogin from "../kakao/KakaoLogIn";
import KaKaoLogOut from "../kakao/KaKaoLogOut";
import { useSelector } from "react-redux";
import UserProfile from "../kakao/UserProfile";
import MyPageBtn from "../kakao/MyPageBtn";
import goBack from "../../assets/img/goBack.svg"

const Header = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);
  const onClickHandler = () => {
    navigate("/");
  };
  const onGoBack = () =>{
    navigate(-1);
  }
  return (
    <StHeader>
      <Layout>
        <StHeaderCont>
          <div onClick={onGoBack} style={{cursor:"pointer"}}><img src={goBack} alt="" className="goBack" /> <p>돌아가기</p></div>
          <img src={logo} alt="" onClick={onClickHandler} />
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
  }
  img {
    width: 15%;
    cursor: pointer;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
  }
  div {
    display: flex;
  }
`;

const StDiv = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;
`;

export default Header;
