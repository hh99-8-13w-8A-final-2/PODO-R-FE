import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apis from "../../apis/apis";
import loginState from "../../atoms/isLogin";
import { useRecoilState } from "recoil";

const Twitter = () => {
  const navigate = useNavigate();
  const oauth_token = new URL(window.location.href).searchParams.get(
    "oauth_token"
  );
  const oauth_verifier = new URL(window.location.href).searchParams.get(
    "oauth_verifier"
  );
  const [isLoginState, setIsLoginState] = useRecoilState(loginState)

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
      if(response.data) { setIsLoginState(true) }
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
