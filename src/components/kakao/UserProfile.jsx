import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Buffer } from "buffer";
import axios from "axios";
import { useForm } from "react-hook-form";
import Modal from "../../assets/modal/Modal";
import ModalPortal from "../../assets/modal/Portal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import pencil from "../../assets/img/pencil.svg";

const UserProfile = () => {
  const profilePic = localStorage.getItem("profilePic");
  const userId = localStorage.getItem("userId");
  const nickname = localStorage.getItem("nickname");

  const [newNickName, setNewNickName] = useState();
  const [signupModalOn, setSignupModalOn] = useState(false);
  const [imagePreview, setImagePreview] = useState();
  console.log(newNickName);

  const URI = {
    BASE: process.env.REACT_APP_BASE_URI,
  };

  const { register, handleSubmit, watch, setFocus } = useForm({
    mode: "onChange",
  });
  const imageUrl = watch("imgUrl");
  console.log(imageUrl);

  const handleModal = (e) => {
    e.preventDefault();
    setSignupModalOn(!signupModalOn);
  };

  const onChangeHandler = (e) => {
    setNewNickName(e.target.value);
  };

  const profileImageUpload = async () => {
    if (imageUrl === undefined || imageUrl.length === 0) {
      return profilePic;
    }
    const fd = new FormData();
    fd.append("image", imageUrl[0]);
    const response = await axios({
      method: "post",
      url: `${URI.BASE}/api/image/upload`,
      data: fd,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data.imageUrl[0];
  };

  const profileUpdate = async (img) => {
    if (
      newNickName === undefined ||
      newNickName.length < 2 ||
      newNickName.length > 7
    ) {
      console.log(newNickName);
      return alert("닉네임은 2글자 이상 8글자 이하입니다.");
    }
    const data = {
      nickname: newNickName,
      profilePic: img,
    };
    const response = await axios({
      method: "put",
      url: `${URI.BASE}/api/member/update`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
        "Content-Type": "application/json",
      },
      data: JSON.stringify(data),
    });
    console.log(response);
    localStorage.setItem("nickname", response.data.nickname);
    localStorage.setItem("profilePic", response.data.profilePic);
    // window.location.reload()
  };

  const onSubmitHandler = (e) => {
    const img = profileImageUpload();
    img.then((result) => {
      profileUpdate(result);
    });
    handleModal(e);
  };

  // 이미지 프리뷰
  useEffect(() => {
    if (imageUrl && imageUrl.length > 0) {
      const file = imageUrl[0];
      setImagePreview(URL.createObjectURL(file));
    }
  }, [imageUrl]);

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <div>
        <StUserProfile>
          <StThumb imgUrl={profilePic}></StThumb>
          <StUserNickName>
            <div>{nickname}</div>
            <StPencil onClick={handleModal}>
              <img src={pencil} />
            </StPencil>
          </StUserNickName>
          <ModalPortal>
            {signupModalOn && (
              <Modal>
                <StExit>
                  <div>정보수정</div>
                  <button onClick={handleModal}>
                    <FontAwesomeIcon icon={faXmark} />
                  </button>
                </StExit>
                <StProfileBox>
                  <div>
                    {imageUrl === undefined || imageUrl.length === 0 ? (
                      <div>
                        <StLabel imgUrl={profilePic}>
                          <input type="file" {...register("imgUrl")} />
                          <span>+</span>
                        </StLabel>
                        {/* <StModalSpan>사진변경</StModalSpan> */}
                      </div>
                    ) : (
                      <div>
                        <StLabel imgUrl={imagePreview}>
                          <input type="file" {...register("imgUrl")} />
                        </StLabel>
                      </div>
                    )}
                  </div>

                  <StInputDiv>
                    
                    <input
                      name="nickname"
                      type="text"
                      onChange={onChangeHandler}
                      placeholder={nickname}
                      // {...register("nickname")}
                    />
                    <span>닉네임</span>
                  </StInputDiv>

                  <StButton onClick={onSubmitHandler}>저장</StButton>
                </StProfileBox>
              </Modal>
            )}
          </ModalPortal>
        </StUserProfile>
      </div>
    </form>
  );
};

export default UserProfile;

const StInputDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  input {
    background-color: var(--gray-1);
  }
`;
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
  border-radius: 50px;
  background: ${(props) => `url(${props.imgUrl})`};
  background-position: center;
  background-size: cover;
  /* background-color: red; */
`;

const StLabel = styled.label`
  height: 100px;
  width: 100px;
  margin: 0px 70px 50px 70px;
  border-radius: 50px;
  border: 1px solid var(--gray-1);
  background:linear-gradient(0deg, #111111ae 100%, rgba(0,0,0,0) 100%), ${props => `url(${props.imgUrl})`};
  background-position: center;
  background-size: cover;
  cursor: pointer;
  display: flex;
  input {
    display: none;
  }
  span {
    width: 100%;
    font-size: 50px;
    color: var(--gray-1);
    display:flex;
    align-content: center;
    justify-content: center;
    align-items: center;
  } 
`;

const StUserNickName = styled.div`
  display: flex;
  color: white;
`;

const StModalSpan = styled.span`
  color: var(--maincolor-1);
`;

const StProfileBox = styled.div`
  padding: 80px;
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  align-items: center;
`;

const StPencil = styled.div`
  height: 20px;
  width: 20px;
  cursor: pointer;
`;
const StButton = styled.button`
  padding: 10px 40px;
  border-radius: 8px;
  margin: 40px 10px 0;
  color: var(--white);
  background-color: var(--maincolor-1);
  border: 1px solid var(--gray-2);
  cursor: pointer;
  transition: all 0.3s;
  &:hover {
    background-color: var(--black);
    color: var(--white);
    border-color: var(--black);
  }
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
  justify-content: space-between;
  align-content: flex-end;
  align-items: center;
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
  div {
    background-color: var(--white);
    font-size: 1.2em;
    color: var(--gray-2);
  }
`;
