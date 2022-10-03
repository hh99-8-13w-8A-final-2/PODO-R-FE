import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import apis from "../../apis/apis";
import loginState from "../../atoms/isLogin";

const Kakao = () => {
  const navigate = useNavigate();
  const code = new URL(window.location.href).searchParams.get("code");
  const [isLoginState, setIsLoginState] = useRecoilState(loginState)

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
      if(response.data) {setIsLoginState(true)}
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
