import React, { useState } from "react";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import Footer from "../components/common/Footer";
import MyPageBottom from "../components/kakao/MyPageBottom";
import UserProfile from "../components/kakao/UserProfile";
import MyTicketList from "../components/kakao/MyTicketList";
import MyReviewList from "../components/kakao/MyReviewList";
import Portal from "../assets/modal/Portal";
import Modal from "../assets/modal/Modal";
import ReviewDetail from "../components/review/ReviewDetail";
import axios from "axios";
import { useInfiniteQuery } from 'react-query'

const MyPage = () => {
  const URI = {
    BASE: process.env.REACT_APP_BASE_URI,
  };

  const [singleData, setSingleData] = useState("");
  const [modalOn, setModalOn] = useState(false);
  const [reviewsId, SetReviewsId] = useState("");
  const [musicalId, setMusicalId] = useState("");

  const MyDetailReview = async (getMusicalId) => {
    const response2 = await axios({
      method: "get",
      url: `${URI.BASE}/api/mypage/${getMusicalId}/reviews`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    setSingleData(response2.data);
    console.log(response2.data);
  };
  

  const handleModal = (reviewsId, musicalId) => {
    setModalOn(!modalOn);
    SetReviewsId(reviewsId);
    setMusicalId(musicalId);
  };
  const modalclose = () => {
    setModalOn(!modalOn);
  };

  return (
    <>
      <Header />
      <MyPageBottom />
      <Layout>
        <UserProfile />
        <MyTicketList MyDetailReview={MyDetailReview} />
        <MyReviewList singleData={singleData} handleModal={handleModal} />
      </Layout>
      <Footer />
      <Portal>
        {modalOn && (
          <Modal onClose={modalclose} modalOn={modalOn}>
            <ReviewDetail
              reviewsId={reviewsId}
              onClose={handleModal}
              musicalId={musicalId}
            />
          </Modal>
        )}
      </Portal>
    </>
  );
};

export default MyPage;
