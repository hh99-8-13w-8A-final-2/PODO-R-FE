import React, { useState } from "react";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import Footer from "../components/common/Footer";
import MyPageBottom from "../components/kakao/MyPageBottom";
import UserProfile from "../components/kakao/UserProfile";
import MyTicketList from "../components/kakao/MyTicketList";
import MyReviewList from "../components/kakao/MyReviewList";
import Portal from "../assets/modal/Portal"
import Modal from "../assets/modal/Modal";
import ReviewDetail from "../components/review/ReviewDetail";

const MyPage = () => {
  const [myReviewData, setMyReviewData] = useState([]);
  const [modalOn, setModalOn] = useState(false);
  const [reviewsId, SetReviewsId ] = useState('');
  const [musicalId, setMusicalId] = useState('');

  const handleModal = (reviewsId, musicalId) => {
    setModalOn(!modalOn);
    SetReviewsId(reviewsId)
    setMusicalId(musicalId)
  };
  const modalclose = () =>{
      setModalOn(!modalOn);
  }

  return (
    <>
      <Header />
      <MyPageBottom />
      <Layout>
        <UserProfile />
        <MyTicketList setMyReviewData={setMyReviewData}/>
        <MyReviewList myReviewData={myReviewData} handleModal={handleModal}/>
      </Layout>
      <Footer />
      <Portal>
        {modalOn && (
          <Modal onClose={modalclose} modalOn={modalOn}>
            <ReviewDetail reviewsId={reviewsId} onClose={handleModal} musicalId={musicalId}/>
          </Modal>
        )}
      </Portal>
    </>
  );
};

export default MyPage;
