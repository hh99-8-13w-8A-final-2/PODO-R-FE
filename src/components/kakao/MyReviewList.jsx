import React from "react";
import styled from "styled-components";
import MyReview from "./MyReview";

const MyReviewList = ({
  singleData,
  handleModal,
  fetchNextPage2,
  isFetchingNextPage2,
}) => {

  return (
    <div>
      <StH3>선택된 공연 리뷰</StH3>
      <StMyReviewList>
        <MyReview
          handleModal={handleModal}
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
