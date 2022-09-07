import React from "react";
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const Modal = ({ onClose, children }) => {
  return (
    <Background>
      <Content>
        <StLoginBox>
          <button onClick={onClose}>
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </StLoginBox>
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
  padding: 20px;
  box-sizing: border-box;
  /* z-index: 1001; */
`;

const StLoginBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: flex-end;
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