import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import Modal from "../../assets/modal/Modal";
import ModalPortal from "../../assets/modal/Portal";
import OAuth from "./Oauth";
import { useSelector } from "react-redux";

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
        <div>
          <button onClick={handleModal}>로그인</button>
        </div>
      )}

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
  width: 63px;
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
