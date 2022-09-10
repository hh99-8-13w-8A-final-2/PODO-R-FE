import React from "react";
import styled from "styled-components";

const Modal = ({ children }) => {
  return (
    <Background>
      <Content>
        {children}
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
  z-index: 1000;
`;

const Content = styled.div`
  position: relative;
  border-radius: 15px;
  background-color: var(--white);
  box-sizing: border-box;
  /* z-index: 1001; */
`;