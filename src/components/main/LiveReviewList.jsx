import React  from 'react';
import styled from 'styled-components';
import LiveReview from './LiveReview';
import axios from 'axios';
import { useQuery } from "react-query"


const fetchLiveReviews = () => {
    return axios.get('http://3.39.240.159/api/reviews/live')
  }


const LiveReviewList = () => {
    const { isLoading, data } = useQuery(
        '/', 
        fetchLiveReviews,
        {
          refetchInterval: 60000,
        }
    )

    return (
        <StReviewBox>
            <StH3>LivePodo</StH3>
            <LiveReview loading={isLoading} reviewList={data}/>
        </StReviewBox>
    );
};

const StReviewBox = styled.div`
`

const StH3 = styled.h3`
    font-size: 18px;
    color: var(--white);
    padding: 20px 10px;
`


export default LiveReviewList;