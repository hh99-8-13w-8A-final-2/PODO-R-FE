import React, { useState } from "react";
import styled from "styled-components";
import { Buffer } from "buffer";

const UserProfile = () => {
  const profilePic = localStorage.getItem("profilePic");
  const userId = localStorage.getItem("userId");
  const nickname = localStorage.getItem("nickname");

  const [newNickName, setNewNickName] = useState();
  const [isShow, setIsShow] = useState(false);

  const onChangeHandler = (e) => {
    setNewNickName(e.target.value);
  };
  const openbox = () => {
    setIsShow((prev) => !prev);
  };

  const onEditHandler = () => {
    localStorage.removeItem("nickname");
    localStorage.setItem("nickname", newNickName);
    setNewNickName("");
    setIsShow((prev) => !prev)
  };

  return (
    <div>
      {isShow === false ? (
        <div>
          <StUserProfile>
            <StThumb imgUrl={profilePic}></StThumb>
            <StUserNickName>
              {nickname} 님 <button onClick={openbox}>수정</button>
            </StUserNickName>
          </StUserProfile>
        </div>
      ) : (
        <div>
          <StUserProfile>
            <StThumb imgUrl={profilePic}></StThumb>
            <StUserNickName>
              {nickname} 님 <button onClick={onEditHandler}>수정</button>
            </StUserNickName>
            <input
              type="text"
              onChange={onChangeHandler}
              value={newNickName}
              placeholder="닉네임을 입력하세요"
            />
          </StUserProfile>
        </div>
      )}
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
  width: 1400px;
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
  background: ${(props) => `url(${props.imgUrl})`};
  background-position: center;
  background-size: cover;
  /* background-color: red; */
`;

const StUserNickName = styled.div`
  color: white;
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
