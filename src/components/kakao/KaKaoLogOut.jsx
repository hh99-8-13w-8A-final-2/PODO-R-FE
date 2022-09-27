import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../../redux/modules/userSlice";
import { useSelector } from "react-redux";
import styled from "styled-components";
import apis from "../../apis/apis";
import logoutIcon from "../../assets/img/logout.svg";
import Modal from "../../assets/modal/Modal";
import ModalPortal from "../../assets/modal/Portal";

const KaKaoLogOut = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.user.isLogin);
  const [signupModalOn, setSignupModalOn] = useState(false);

  const handleModal = () => {
    setSignupModalOn(!signupModalOn);
  };

  const onLogoutHandler = async () => {
    try {
      await apis.postLogout();
    } finally {
      dispatch(logout());
      localStorage.clear();
      navigate("/");
    }
  };

  return (
    <StContentbox>
      {isLogin ? (
        <div>
          <div onClick={handleModal}>
            <StLogOutIcon logoutIcon={logoutIcon} />
            <StLoginTxt>로그아웃</StLoginTxt>
          </div>

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
  width: 76px;
  cursor: pointer;
`;

const StLogOutIcon = styled.div`
  width: 20px;
  height: 16px;
  align-items: center;
  background: ${(props) => `url(${props.logoutIcon})`} no-repeat;
  cursor: pointer;
`;
const StLoginTxt = styled.span`
  cursor: pointer;
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
