import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import apis from "../../apis/apis";
import { login } from "../../redux/modules/userSlice";

const Twitter = () => {
  const URI = {
    BASE: process.env.REACT_APP_BASE_URI,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const oauth_token = new URL(window.location.href).searchParams.get(
    "oauth_token"
  );
  const oauth_verifier = new URL(window.location.href).searchParams.get(
    "oauth_verifier"
  );

  const TwitterLogin = async () => {
    try {
      const response = await apis.getTwitter(oauth_token, oauth_verifier);
      const accessToken = response.headers.authorization;
      const refreshToken = response.headers[`refresh-token`];
      const nickname = response.data.nickname;
      const profilePic = response.data.profilePic;
      const userId = response.data.id;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("nickname", nickname);
      localStorage.setItem("profilePic", profilePic);
      localStorage.setItem("userId", userId);
      dispatch(login(response.data));
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    TwitterLogin();
  }, []);

  return <div>트위터</div>;
};

export default Twitter;
