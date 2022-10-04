import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserProfile from "../components/kakao/UserProfile";
import MyTicketList from "../components/kakao/MyTicketList";
import MyReviewList from "../components/kakao/MyReviewList";
import Portal from "../assets/modal/Portal";
import Modal from "../assets/modal/Modal";
import ReviewDetail from "../components/review/ReviewDetail";
import { useRecoilState } from "recoil";
import mypageMusicalId from "../atoms/mypageMusicalId";

const MyPage = () => {
  const [modalOn, setModalOn] = useState(false);
  const [reviewsId, SetReviewsId] = useState("");
  const [musicalId, setMusicalId] = useState("");
  const navigate = useNavigate();
  const [eachMusicalId, setEachMusicalId] = useRecoilState(mypageMusicalId);
  
  useEffect(()=>{
    if(localStorage.getItem('userId') === null){
      navigate("/notfind")
    }
  })

  const handleModal = (reviewsId, musicalId) => {
    setModalOn(!modalOn);
    SetReviewsId(reviewsId);
    setMusicalId(musicalId);
  };
  const modalclose = () => {
    setModalOn(!modalOn);
  };

  window.onpopstate = function() {
    navigate("/")
    setEachMusicalId('')
  }

  return (
    <>
      <UserProfile />
      <MyTicketList />
      <MyReviewList
        handleModal={handleModal}
      />
      <Portal>
        {modalOn && (
          <Modal onClose={modalclose}>
            <ReviewDetail
              reviewsId={reviewsId}
              musicalId={musicalId}
              onClose={handleModal}
            />
          </Modal>
        )}
      </Portal>
    </>
  );
};

export default MyPage;