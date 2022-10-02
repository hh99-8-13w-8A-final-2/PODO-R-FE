import React, { useState } from "react";
import styled from "styled-components";
import Modal from "../../assets/modal/Modal";
import ModalPortal from "../../assets/modal/Portal";
import OAuth from "./Oauth";
import { useSelector } from "react-redux";
import loginIcon from "../../assets/img/login.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const KakaoLogin = () => {
  const [signupModalOn, setSignupModalOn] = useState(false);
  const isLogin = useSelector((state) => state.user.isLogin);

  const handleModal = () => {
    setSignupModalOn(!signupModalOn);
  };

  return (
    <StContentbox>
      {isLogin ? (
        <div></div>
      ) : (
        <StLoginIcon onClick={handleModal}>
          <img src={loginIcon} alt="로그인"/>
          <StLoginTxt>로그인</StLoginTxt>
        </StLoginIcon>
      )}

      <ModalPortal>
        {signupModalOn && (
          <Modal onClose={handleModal}>
            <StLoginBox>
              <button onClick={handleModal}>
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </StLoginBox>
            <OAuth />
          </Modal>
        )}
      </ModalPortal>
    </StContentbox>
  );
};

export default KakaoLogin;

const StContentbox = styled.div`
  display: flex;
  
  button {
    padding: 10px;
    border-radius: 8px;
    color: var(--gray-2);
    background-color: var(--black);
    border: 1px solid var(--gray-2);
    cursor: pointer;
    transition: all 0.3s;
    &:hover {
      background-color: var(--maincolor-1);
      color: var(--white);
      border-color: var(--maincolor-1);
    }
  }
`;

const StLoginIcon = styled.div`
  align-items: center;
  >img {
    cursor: pointer;
    margin-right: 10px;
    width: 20px;
    height: 100%;
  }
  span{
    display: block;
    
  }
  
`;
const StLoginTxt = styled.span`
  cursor: pointer;
  @media (max-width: 763px){
    display: none;
  }
`;

const StLoginBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: flex-end;
  padding: 12px;
  button {
    border: none;
    border-radius: 10px;
    background-color: var(--white);
    font-size: 1.5em;
    color: var(--gray-2);
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      color: var(--gray-3);
    }
  }
`;
