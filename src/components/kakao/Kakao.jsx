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
//   console.log(code);

  const kakaoLogin = async () => {
    try {
      const response = await axios.get(
        `http://54.180.140.72:8080/api/oauth/kakao?code=${code}`
      );
      console.log(response);
      const accessToken = response.data.accessToken;
      const refreshtoken = response.data.refreshToken;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("refreshToken", refreshtoken);
      // console.log(accessToken);
      // console.log(refreshtoken);

      const encodeBody = accessToken.split(".")[1];
      const decodeBody = Buffer.from(encodeBody, "base64").toString("utf8");
      const jsonBody = JSON.parse(decodeBody);
      // console.log(jsonBody);
      localStorage.setItem("id", jsonBody.sub);
      localStorage.setItem("nickname", jsonBody.aud);
      
      dispatch(login(response.data.data))

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
