import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import twitter from "../../assets/img/twitter.png";
import kakao_login from "../../assets/img/kakao_login.svg";
import twitter_login from "../../assets/img/twitter_login.svg";
import logo_fill from "../../assets/img/logo_fill.svg";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const OAuth = () => {
  const navigate = useNavigate();

  const KAKAO_CLIENT_ID = "227040bd0e4e1fdf84aa3b18e9911713";
  const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const TWIT_CLIENT_ID = "hy0hC76wxW99cC4OHvcuuFH3E";
  const TWIT_REDIRECT_URI = "http://127.0.0.1:3000/oauth/twitter";
  const CONSUMER_SECRET = "0GIpeBalilDtD1Ov590hTlQgbbLXkLXjrokCYRoMpPJqVJKqep";
  const TWIT_AUTH_URL = `https://twitter.com/oauth/request_token?client_id=${TWIT_CLIENT_ID}&${CONSUMER_SECRET}&redirect_uri=${TWIT_REDIRECT_URI}&response_type=code`;
  const URL = `https://api.twitter.com/oauth/request_token?oauth_callback=http://127.0.0.1:3000/oauth/twitter`;

  const URI = {
    BASE : process.env.REACT_APP_BASE_URI
  }


  async function twitterLogin () {
    const response = await axios.get(
      `${URI.BASE}/api/twitter/login`
    );
    window.location.replace(response.data)
  }



  console.log(KAKAO_AUTH_URL);
  return (
    <StLoginLink>
      <img src={logo_fill} />
      <StLogoFill>
        <p>포도알에서는 극장별/공연별 좌석정보를 디테일하게 제공합니다.</p>
        <p>포도알과 함께 만족스러운 문화생활을 시작해 보세요.</p>
      </StLogoFill>

      <StSocialLogIn>
        <div>
          <a href={KAKAO_AUTH_URL}>
            <img src={kakao_login}></img>
          </a>
        </div>
        <div>
          <a href="#!" onClick={twitterLogin}>
            <img src={twitter_login}></img>
          </a>
        </div>
      </StSocialLogIn>
    </StLoginLink>
  );
};

export default OAuth;

const StLoginLink = styled.div`
  padding: 40px;
`;

const StSocialLogIn = styled.div`
  div {
    margin: 10px;
  }
`;
const StLogoFill = styled.div`
  margin: 30px 20px;
  p {
    color: var(--gray-2);
    padding: 3px;
  }
`;
