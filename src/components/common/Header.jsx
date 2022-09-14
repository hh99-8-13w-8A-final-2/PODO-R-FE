import React, { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import user from "../../assets/img/user.svg";
import loginIcon from "../../assets/img/login.svg";
import KakaoLogin from "../kakao/KakaoLogIn";
import KaKaoLogOut from "../kakao/KaKaoLogOut";
import { useSelector } from "react-redux";
import UserProfile from "../kakao/UserProfile";
import MyPageBtn from "../kakao/MyPageBtn";

const Header = () => {
  const navigate = useNavigate();
  const isLogin = useSelector((state) => state.user.isLogin);
  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <StHeader>
      <Layout>
        <StHeaderCont>
          <div>돌아가기 버튼</div>
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
  padding: 20px;
  position: relative;
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
