import React from "react";
import styled from "styled-components";

// <<<<<<< HEAD
const Modal = ({ onClose, children }) => {
  return (
    <Background>
      <Content>
        {children}
        <button onClick={onClose}>닫기</button>
      </Content>
    </Background>
  );
  // =======

  // >>>>>>> upstream/dev
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
  z-Index: 1000;
`;

const Content = styled.div`
  height: 500px;
  width: 500px;
  position: relative;
  /* overflow: scroll; */
  background: pink;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  z-index: auto;
`;


