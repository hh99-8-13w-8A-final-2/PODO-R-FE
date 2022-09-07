import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/modules/userSlice";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";
import loginIcon from '../../assets/img/login.svg'

const KaKaoLogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  console.log(isLogin)

  const onLogoutHandler = async () => {
    const response = await axios({
      method: "post",
      url: `http://54.180.140.72:8080/api/member/logout`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        'Refresh-Token' : localStorage.getItem("refreshToken")
        // RefreshToken: localStorage.getItem("RefreshToken"),
      }
    });
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <StContentbox>
      {isLogin ? (
        <div>
          <span onClick={onLogoutHandler}>로그아웃</span>
        </div>
      ) : (
        <div></div>
      )}
    </StContentbox>
  );
};

export default KaKaoLogOut;


const StContentbox = styled.div`
  display: flex;
  width: 76px;
  cursor: pointer;
`;