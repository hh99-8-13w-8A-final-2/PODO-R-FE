import React, { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import user from "../../assets/img/user.svg";
import KaKaoLogOut from "../kakao/KaKaoLogOut";
import KakaoLogin from "../kakao/KakaoLogIn";



const Header = () => {
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate("/");
  };

  return (
    <StHeader>
      <Layout>
        <StHeaderCont>
          <div>돌아가기 버튼</div>
          <img src={logo} alt="" onClick={onClickHandler} />
          <KakaoLogin/>
          {/* <LogOut/> */}
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
  color: var(--white);
  padding: 20px;
  img {
    width: 15%;
    cursor: pointer;
  }
`;

export default Header;
