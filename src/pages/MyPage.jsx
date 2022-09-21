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
import { useInfiniteQuery } from "react-query";

const MyDetailReviews = async (musicalId, pageParam) => {
  if (musicalId === "") {
    return {
      data: undefined,
      nextPage: pageParam + 1,
      pageData: 1,
      total: 1,
    };
  }
  const URI = {
    BASE: process.env.REACT_APP_BASE_URI,
  };

  const response2 = await axios({
    method: "get",
    url: `${URI.BASE}/api/mypage/${musicalId}/reviews?size=20&page=${pageParam}`,
    headers: {
      Authorization: localStorage.getItem("accessToken"),
    },
  });
  const data = response2.data.content;
  const pageData = response2.data.totalPages;
  const total = response2.data.totalElements;
  return {
    data,
    nextPage: pageParam + 1,
    pageData,
    total,
  };
};

const MyPage = () => {
  const [modalOn, setModalOn] = useState(false);
  const [reviewsId, SetReviewsId] = useState("");
  const [musicalId, setMusicalId] = useState("");

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery(
    ["reviews", musicalId],
    ({ pageParam = 1 }) => {
      return MyDetailReviews(musicalId, pageParam);
    },
    {
      refetchOnWindowFocus: false,
      // fetchNextPage 를 호출하면 getNextPageParam 에서 다음 페이지의 번호를 가져오게 된다
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < pages[0].pageData) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );
  // console.log(data.pages[0].data);
  const singleData = data;
  const fetchNextPage2 = fetchNextPage;
  const isFetchingNextPage2 = isFetchingNextPage;

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
        <MyTicketList setMusicalId={setMusicalId} />
        <MyReviewList
          singleData={singleData}
          handleModal={handleModal}
          fetchNextPage2={fetchNextPage2}
          isFetchingNextPage2={isFetchingNextPage2}
        />
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
