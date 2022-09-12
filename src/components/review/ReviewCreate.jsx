import React from 'react';
import styled from 'styled-components';
import ReviewCreateForm from './ReviewCreateForm';
import ReviewCreateList from './ReviewCreateList';

const ReviewCreate = ({setIsClick, reviewId}) => {
    console.log(reviewId)
    return (
        <>
            <ReviewCreateForm reviewId={reviewId}/>
            <ReviewCreateList setIsClick={setIsClick} reviewId={reviewId}/>
        </>
    );
};




export default ReviewCreate;