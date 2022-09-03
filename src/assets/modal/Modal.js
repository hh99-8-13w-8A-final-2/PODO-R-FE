import React from "react";
import styled from "styled-components";

const Modal = ({ onClose, children }) => {
  return (
    <Background>
      <Content>
        {children}
        <button onClick={onClose}>닫기</button>
      </Content>
    </Background>
  );
};

export default Modal;


const Background = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  left: 0;
  top: 0;
  text-align: center;
  background: rgba(0, 0, 0, 0.9);
  /* z-Index: auto; */
`;

const Content = styled.div`
  height: 500px;
  width: 500px;
  position: relative;
  /* overflow: scroll; */
  background: pink;

  /* z-Index: 1001; */
`;
