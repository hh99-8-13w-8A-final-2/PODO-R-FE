import React, { useState } from "react";
import Header from "../components/common/Header";
import Layout from "../components/common/Layout";
import Footer from "../components/common/Footer";
import MyPageBottom from "../components/kakao/MyPageBottom";
import UserProfile from "../components/kakao/UserProfile";
import MyTicketList from "../components/kakao/MyTicketList";
import MyReviewList from "../components/kakao/MyReviewList";

const MyPage = () => {

  const [myReviewData, setMyReviewData] = useState([]);

  return (
    <>
      <Header />
      <MyPageBottom />
      <Layout>
        <UserProfile />
        <MyTicketList setMyReviewData={setMyReviewData}/>
        <MyReviewList myReviewData={myReviewData}/>
      </Layout>
      <Footer />
    </>
  );
};

export default MyPage;
