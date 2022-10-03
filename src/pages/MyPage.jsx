import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import UserProfile from "../components/kakao/UserProfile";
import MyTicketList from "../components/kakao/MyTicketList";
import MyReviewList from "../components/kakao/MyReviewList";
import Portal from "../assets/modal/Portal";
import Modal from "../assets/modal/Modal";
import ReviewDetail from "../components/review/ReviewDetail";
import { useInfiniteQuery } from "react-query";
import apis from "../apis/apis";

const MyDetailReviews = async (eachMusicalId, pageParam) => {
  if (eachMusicalId === "") {
    return {
      data: undefined,
      nextPage: pageParam + 1,
      pageData: 1,
      total: 1,
    };
  }
  const response2 = await apis.getMyEachReviewFind(eachMusicalId, pageParam);
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
  const [eachMusicalId, setEachMusicalId] = useState("");
  const navigate = useNavigate();
  

  

  useEffect(()=>{
    if(localStorage.getItem('userId') === null){
      navigate("/notfind")
    }
  })

  const {
    data,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery(
    ["reviews", eachMusicalId],
    ({ pageParam = 1 }) => {
      return MyDetailReviews(eachMusicalId, pageParam);
    },
    {
      refetchOnWindowFocus: false,
      getNextPageParam: (_lastPage, pages) => {
        if (pages.length < pages[0].pageData) {
          return pages.length + 1;
        } else {
          return undefined;
        }
      },
    }
  );
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
      <UserProfile />
      <MyTicketList setEachMusicalId={setEachMusicalId} />
      <MyReviewList
        singleData={singleData}
        handleModal={handleModal}
        fetchNextPage2={fetchNextPage2}
        isFetchingNextPage2={isFetchingNextPage2}
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