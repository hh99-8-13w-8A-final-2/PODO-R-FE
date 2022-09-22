import React, { useState } from "react";
import styled from "styled-components";
import { Buffer } from "buffer";
import axios from "axios";
import { useForm } from "react-hook-form";
import Modal from "../../assets/modal/Modal";
import ModalPortal from "../../assets/modal/Portal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const UserProfile = () => {
  const profilePic = localStorage.getItem("profilePic");
  const userId = localStorage.getItem("userId");
  const nickname = localStorage.getItem("nickname");

  const [newNickName, setNewNickName] = useState();
  const [signupModalOn, setSignupModalOn] = useState(false);

  const URI = {
    BASE: process.env.REACT_APP_BASE_URI,
  };

  const {register, handleSubmit, watch, setFocus} = useForm({ mode : "onChange" })


  const handleModal = () => {
    setSignupModalOn(!signupModalOn);
  };
  
  const onChangeHandler = (e) => {
    setNewNickName(e.target.value);
  };

  const onEditHandler = () => {
    handleModal()
  };

  return (
      

      <div>
        <div>
        <StUserProfile>
          <StThumb imgUrl={profilePic}></StThumb>
          <StUserNickName>
            {nickname} <button onClick={handleModal}>수정</button>
          </StUserNickName>
          <ModalPortal>
            {signupModalOn && (
            <Modal>
              <StExit>
                <button onClick={handleModal}>
                <FontAwesomeIcon icon={faXmark}/>
              </button>
              </StExit>
              <StProfileBox>
                <StThumb imgUrl={profilePic}></StThumb>
                <label>{nickname}</label>
                <input
                type="text"
                onChange={onChangeHandler}
                placeholder= "닉네임"
                />
                <button onClick={onEditHandler}>저장하기</button>
              </StProfileBox>
              
            </Modal>
            )}
            </ModalPortal>
        </StUserProfile>
      </div>
      </div>
  );
};

export default UserProfile;

// const StDiv = styled.div`
//     width: 1400px;
//     height: 300px;
//     display: flex;
//     align-content: center;
//     justify-content: center;
//     flex-direction: column;
//     align-items: center;
//     /* background-color: pink; */
//     div {
//         width: 300px;
//         height: 150px;
//         border: 1px solid black;
//         background-color: white;
//     }
// `
const StUserProfile = styled.div`
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-content: center;
  align-items: center;
  justify-content: center;
`;

const StThumb = styled.div`
  height: 100px;
  width: 100px;
  margin: 10px;
  border-radius: 8px;
  background: ${(props) => `url(${props.imgUrl})`};
  background-position: center;
  background-size: cover;
  /* background-color: red; */
`;

const StUserNickName = styled.div`
  color: white;
`;

const StProfileBox = styled.div`
  padding: 150px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
  
`;

// const StDiv = styled.div`
//     width: 200px;
//     height: 300px;
//     background:linear-gradient(0deg, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 80%, rgba(0,0,0,0) 100%), ${props => `url(${props.imgUrl})`};
//     display: flex;
//     flex-direction: column;
//     justify-content: flex-end;
//     align-items: center;
//     box-sizing: border-box;
//     position: relative;
//     padding: 10px;
//     line-height: 20px;
//     cursor: pointer;
// `


const StExit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: flex-end;
  padding: 12px;
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