import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import apis from "../../apis/apis";
import { login } from "../../redux/modules/userSlice";

const Kakao = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");

  const kakaoLogin = async () => {
    try {
      const response = await apis.getKakao(code);
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
    kakaoLogin();
  }, []);

  return <div>카카오</div>;
};

export default Kakao;
