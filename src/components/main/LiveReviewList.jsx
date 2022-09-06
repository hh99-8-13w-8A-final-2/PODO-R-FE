import React  from 'react';
import styled from 'styled-components';
import LiveReview from './LiveReview';
import axios from 'axios';
import { useQuery } from "react-query"


const fetchLiveReviews = () => {
    return axios.get('http://3.39.240.159/api/reviews/live')
  }

const LiveReviewList = () => {

    const { status, data, error } = useQuery(
        '/LiveReviewList', 
        fetchLiveReviews,
        {
          // 1분마다 서버에서 새로운 데이터를 refetch 해온다.
          refetchInterval: 60000,
          refetchOnWindowFocus: false
        }
    )

    console.log(data)

    return (
        <StReviewBox>
            <StH3>LivePodo</StH3>
            <LiveReview status={status} reviewList={data} error={error}/>
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