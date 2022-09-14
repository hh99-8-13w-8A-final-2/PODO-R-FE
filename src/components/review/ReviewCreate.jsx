import React from 'react';
import ReviewCreateForm from './ReviewCreateForm';
import ReviewCreateList from './ReviewCreateList';

const ReviewCreate = ({setIsClick, reviewId}) => {
    return (
        <>
            <ReviewCreateForm reviewId={reviewId}/>
            <ReviewCreateList setIsClick={setIsClick} reviewId={reviewId}/>
        </>
    );
};




export default ReviewCreate;