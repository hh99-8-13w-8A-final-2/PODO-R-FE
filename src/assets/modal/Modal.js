import React from "react";
import styled from "styled-components";

const Modal = ({ onClose, children }) => {
  return (
    <Background>
      <Content>
          {children}
        <div className="button">
          <button onClick={onClose}>닫기</button>
        </div>
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
z-Index: 1000;
`;

const Content = styled.div`
height: 500px;
width: 500px;
position: relative;
border-radius: 15px;
background-color: var(--white);
display: flex;
flex-direction: column;
align-content: center;
justify-content: center;
align-items: center;
z-index: 1001;
  .button{
    text-align: center;
    button{
      padding: 10px 40px;
      border-radius: 8px;
      margin: 60px 10px 0 ;
      color:var(--gray-2);
      background-color: var(--black);
      border: 1px solid var(--gray-2);
      cursor: pointer;
      transition: all .3s;
      &:hover{
        background-color: var(--maincolor-1);
        color:var(--white);
        border-color:var(--maincolor-1);
      }
    }
  }
`;


