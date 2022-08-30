import React from 'react';
import styled from 'styled-components';

const LiveReview = () => {
    return (
        <StReviewBox>
            <StH3>LivePodo</StH3>
            <StDiv></StDiv>
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

const StDiv = styled.div`
    height: 300px;
    background-color: var(--gray-1);
`

export default LiveReview;