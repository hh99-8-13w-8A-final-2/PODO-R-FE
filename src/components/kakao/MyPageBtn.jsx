import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as User2 } from "../../assets/img/user2.svg";

const MyPageBtn = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  // console.log(userId);

  const onClickHandler = () => {
    navigate(`/mypage/${userId}`);
  };

  return (
    <StMyPageBtn onClick={onClickHandler}>
      <User2 />
      <span>MY</span>
    </StMyPageBtn>
  );
};

export default MyPageBtn;

const StMyPageBtn = styled.div`
  cursor: pointer;
  align-content: center;
  justify-content: flex-end;
  align-items: center;
  align-content: center;
  justify-content: center;
  align-items: center;
  color: var(--white);
  display: flex;
  margin-right: 15px;
  svg {
    width: 20px;
  }
`;
