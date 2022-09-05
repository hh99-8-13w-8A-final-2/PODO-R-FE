import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Modal from "../../assets/modal/Modal";
import ModalPortal from "../../assets/modal/Portal";
import OAuth from "./Oauth";

const KakaoLogin = () => {
  const [signupModalOn, setSignupModalOn] = useState(false);

  const handleModal = () => {
    setSignupModalOn(!signupModalOn);
  };

  return (
    <StContentbox>
      <button onClick={handleModal}>로그인</button>
      <ModalPortal>
        {signupModalOn && (
          <Modal onClose={handleModal}>
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
  width: 100px;
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
