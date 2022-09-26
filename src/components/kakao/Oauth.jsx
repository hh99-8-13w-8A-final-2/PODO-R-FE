import React from "react";
import axios from "axios";
import apis from "../../apis/apis";
import kakao_login from "../../assets/img/kakao_login.svg";
import twitter_login from "../../assets/img/twitter_login.svg";
import logo_fill from "../../assets/img/logo_fill.svg";
import styled from "styled-components";

const OAuth = () => {
  const URI = {
    BASE: process.env.REACT_APP_BASE_URI,
    REDIRECT: process.env.REACT_APP_REDIRECT_URI,
  };

  const KAKAO_CLIENT_ID = "227040bd0e4e1fdf84aa3b18e9911713";
  const KAKAO_REDIRECT_URI = `${URI.REDIRECT}/oauth/kakao`;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_CLIENT_ID}&redirect_uri=${KAKAO_REDIRECT_URI}&response_type=code`;

  async function twitterLogin() {
    //const response = await axios.get(`${URI.BASE}/api/twitter/login`);
    const response = await apis.getTwitterLogin()
    window.location.replace(response.data);
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
