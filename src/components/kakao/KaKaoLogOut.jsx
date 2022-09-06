import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/modules/userSlice";
import { useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

const KaKaoLogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);

  const onLogoutHandler = async () => {
    const response = await axios({
      method: "post",
      url: `http://54.180.140.72:8080/api/member/logout`,
      headers: {
        Authorization: localStorage.getItem("refreshToken"),
        // RefreshToken: localStorage.getItem("RefreshToken"),
      },
    });
    dispatch(logout());
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("id");
    localStorage.removeItem("nickname");
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  return (
    <StContentbox>
      {isLogin ? (
        <div>
          <button onClick={onLogoutHandler}>로그아웃</button>
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
  button {
    padding: 10px;
    border-radius: 8px;
    color: var(--gray-2);
    background-color: var(--black);
    border: 1px solid var(--gray-2);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: var(--maincolor-1);
      color: var(--white);
      border-color: var(--maincolor-1);
    }
  }
`;