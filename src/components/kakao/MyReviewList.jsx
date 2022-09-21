import React, { useEffect } from "react";
import styled from "styled-components";
import MyReview from "./MyReview";
import axios from "axios";
import { useState } from "react";
import { useInfiniteQuery } from 'react-query'
import { useInView } from "react-intersection-observer";

const myFetchReviews = async (pageParam, userId) => {
  const URI = {
    BASE: process.env.REACT_APP_BASE_URI,
  };
  // const [data, setData] = useState();
    const response = await axios({
      method: "get",
      url: `${URI.BASE}/api/mypage/reviews?size=20&page=${pageParam}`,
      headers: {
        Authorization: localStorage.getItem("accessToken"),
      },
    });
    // setData(response.data);
    const data = response.data.content
    const pageData = response.data.totalPages
    const total = response.data.totalElements
    return{
      data,
      nextPage : pageParam + 1,
      pageData,
      total
    }
}

  const MyReviewList = ({ singleData, handleModal, fetchNextPage2, isFetchingNextPage2 }) => {

   
  let userId = localStorage.getItem("userId")
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status, error } = 
    useInfiniteQuery(
      ["reviews", userId],
      ({ pageParam = 1 }) => {
        return myFetchReviews(pageParam, userId);
      },
      {
        refetchOnWindowFocus: false,
        getNextPageParam: (_lastPage, pages) =>{
          if (pages.length < pages[0].pageData) {
            return pages.length + 1
          } else {
            return undefined
          }
        }
      }
    )

    console.log(data)

    return (
      <div>
        <StH3>선택된 공연 리뷰</StH3>
        <StMyReviewList>
          <MyReview
            data={data}
            fetchNextPage={fetchNextPage}
            isFetchingNextPage={isFetchingNextPage}
            handleModal={handleModal}
            singleData={singleData}
            fetchNextPage2={fetchNextPage2}
            isFetchingNextPage2={isFetchingNextPage2}
          />
        </StMyReviewList>
      </div>
    );
  };

export default MyReviewList;

const StMyReviewList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  align-content: center;
  justify-content: center;
  flex-wrap: wrap;
`;

const StH3 = styled.h3`
  font-size: 18px;
  color: var(--white);
  padding: 20px 10px;
`;
