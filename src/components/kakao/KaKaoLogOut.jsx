import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import apis from "../../apis/apis";
import logoutIcon from "../../assets/img/logout.svg";
import Modal from "../../assets/modal/Modal";
import ModalPortal from "../../assets/modal/Portal";
import loginState from "../../atoms/isLogin";
import { useRecoilState } from "recoil";

const KaKaoLogOut = () => {
  const navigate = useNavigate();
  const [signupModalOn, setSignupModalOn] = useState(false);

  const handleModal = () => {
    setSignupModalOn(!signupModalOn);
  };
  const [isLoginState, setIsLoginState] = useRecoilState(loginState)

  const onLogoutHandler = async () => {
    try {
      await apis.postLogout();
    } finally {
      setIsLoginState(false)
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <StContentbox>
      {isLoginState ? (
        <div>
          <StLogOutIcon onClick={handleModal}>
            <img src={logoutIcon} alt="로그아웃"/>
            <StLoginTxt>로그아웃</StLoginTxt>
          </StLogOutIcon>

          <ModalPortal>
            {signupModalOn && (
              <Modal onClose={handleModal}>
                <StLogOutContainer>
                  <p>로그아웃 하시겠습니까?</p>
                  <button onClick={onLogoutHandler}>네</button>
                  <button onClick={handleModal}>아니요</button>
                </StLogOutContainer>
              </Modal>
            )}
          </ModalPortal>
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
  cursor: pointer;
`;

const StLogOutIcon = styled.div`
  >img {
    width: 20px;
    height: 100%;
    cursor: pointer;
    margin-right: 10px;
  }
  `;

const StLoginTxt = styled.span`
  cursor: pointer;
  @media (max-width: 763px){
    display: none;
  }
`;

const StLogOutContainer = styled.div`
  button {
    background-color: transparent;
    width: 100px;
    padding: 8px 0;
    border-radius: 8px;
    border: var(--gray-2) 1.5px solid;
    margin: 0 5px;
    color: var(--gray-2);
    transition: all 0.3s;
    cursor: pointer;
    margin-bottom: 20px;
    &:hover {
      color: var(--white);
      background: var(--maincolor-1);
      border-color: var(--maincolor-1);
    }
  }
  p {
    padding: 40px 100px;
  }
`;
