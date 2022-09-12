import React from "react";
import { useNavigate } from "react-router-dom";

const MyPageBtn = () => {
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  console.log(userId);

  const onClickHandler = () => {
    navigate(`/mypage/:${userId}`);
  };

  return (
    <div>
      <button onClick={onClickHandler}>My Page</button>
    </div>
  );
};

export default MyPageBtn;
