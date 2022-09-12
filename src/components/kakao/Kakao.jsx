import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Buffer } from "buffer";
import { login } from "../../redux/modules/userSlice";

const Kakao = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const code = new URL(window.location.href).searchParams.get("code");
  console.log(code);

  const URI = {
    BASE : process.env.REACT_APP_BASE_URI
  }

  const kakaoLogin = async () => {
    try {
      const response = await axios.get(
        `${URI.BASE}/api/oauth/kakao?code=${code}`
      );
      console.log(response);
      const accessToken = response.headers.authorization;
      const refreshToken = response.headers[`Refresh-Token`];
      const nickname = response.data.nickname;
      const profilePic = response.data.profilePic;
      const userId = response.data.id;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("nickname", nickname)
      localStorage.setItem("profilePic", profilePic)
      localStorage.setItem("userId", userId)
      
      
      // console.log(accessToken);
      // console.log(refreshtoken);

      // const encodeBody = accessToken.split(".")[1];
      // const decodeBody = Buffer.from(encodeBody, "base64").toString("utf8");
      // const jsonBody = JSON.parse(decodeBody);
      // console.log(jsonBody);
      // localStorage.setItem("id", jsonBody.sub);
      // localStorage.setItem("nickname", jsonBody.iss);
      // localStorage.setItem("image", jsonBody.aud);
      dispatch(login(response.data))

      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    kakaoLogin();
    // dispatch(login)
  }, []);

  return <div>카카오</div>;
};

export default Kakao;
