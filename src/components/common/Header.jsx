import React, { useState } from "react";
import Layout from "./Layout";
import styled from "styled-components";
import logo from "../../assets/img/logo.svg";
import { useNavigate } from "react-router-dom";
import user from "../../assets/img/user.svg";
import Modal from "../../assets/modal/Modal";
import ModalPortal from "../../assets/modal/Portal";

const Header = () => {
  const navigate = useNavigate();
  const [signupModalOn, setSignupModalOn] = useState(false);
  const onClickHandler = () => {
    navigate("/");
  };
  const handleModal = () => {
    setSignupModalOn(!signupModalOn);
  };

  return (
    <StHeader>
      <Layout>
        <StHeaderCont>
          <div>돌아가기 버튼</div>
          <img src={logo} alt="" onClick={onClickHandler} />
          {/* <div>로그인 아이콘</div> */}
          <button onClick={handleModal}>로그인 버튼</button>
          <ModalPortal>
            {signupModalOn && (
              <Modal onClose={handleModal}>
                {/* <OAuth /> */}
              </Modal>
            )}
          </ModalPortal>
        </StHeaderCont>
      </Layout>
    </StHeader>
  );
};

const StHeader = styled.div`
  width: 100%;
`;

const StHeaderCont = styled.div`
  display: flex;
  justify-content: space-between;
  color: var(--white);
  padding: 20px;
  img {
    width: 15%;
    cursor: pointer;
  }
`;

export default Header;
