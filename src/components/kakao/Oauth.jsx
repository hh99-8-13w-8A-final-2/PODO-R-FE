import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import twitter from "../../assets/img/twitter.png"
import kakao2 from "../../assets/img/kakao2.png"
import kakao from "../../assets/img/kakao.png"
import styled from "styled-components";

const OAuth = () => {
  const KAKAO_CLIENT_ID = "227040bd0e4e1fdf84aa3b18e9911713";
  const KAKAO_REDIRECT_URI = "http://localhost:3000/oauth/kakao";
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  const TWIT_CLIENT_ID = "hy0hC76wxW99cC4OHvcuuFH3E";
  const TWIT_REDIRECT_URI = "http://127.0.0.1:3000/oauth/twitter";
  const CONSUMER_SECRET = "0GIpeBalilDtD1Ov590hTlQgbbLXkLXjrokCYRoMpPJqVJKqep";
  const TWIT_AUTH_URL = `https://twitter.com/oauth/request_token?client_id=${TWIT_CLIENT_ID}&${CONSUMER_SECRET}&redirect_uri=${TWIT_REDIRECT_URI}&response_type=code`;
  const URL = `https://api.twitter.com/oauth/request_token?oauth_callback=http://127.0.0.1:3000/oauth/twitter`;

  console.log(KAKAO_AUTH_URL)
  return (
    <div>
      <StKakao>
        <a href={KAKAO_AUTH_URL}>
            <img src={kakao} href={KAKAO_AUTH_URL}></img>
          </a>
      </StKakao>
      <div>
          <a href={URL}>
            <img src={twitter}></img>
          </a>
      </div>
    </div>
  );
};

export default OAuth;

const StKakao = styled.div`
margin-bottom: 50px;
`

