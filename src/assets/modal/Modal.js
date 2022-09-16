import React, { useState } from "react";
import styled from "styled-components";

const Modal = ({ children, onClose, theaterModal,modalOn }) => {
  
  return (
    <Background theaterModal>
      <Content>
        {children}
      </Content>
      <div className="close" onClick={onClose}></div>
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
  background: rgba(0, 0, 0, 0.7);
  z-index: 1000;
  backdrop-filter: blur(5px);
  .close {
    position: fixed;
    cursor: pointer;
    inset: 0;
    z-index: 5;
  }
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: ${props => props.theaterModal === true ? 'fadeIn' : 'fadeOut'};
  animation-fill-mode: forwards;
`;

const Content = styled.div`
  position: relative;
  border-radius: 15px;
  background-color: var(--white);
  box-sizing: border-box;
  z-index: 1001;
  animation-duration: 0.25s;
  animation-timing-function: ease-out;
  animation-name: slideUp;
  animation-fill-mode: forwards;
  @media all and (max-width: 768px) {
        width: 100vh;
        height: 100vh;
        overflow-y: scroll;
        overflow-x: hidden;
  }
`;
