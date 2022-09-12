import React from 'react';
import styled from 'styled-components';
import ReviewCreateForm from './ReviewCreateForm';
import ReviewCreateList from './ReviewCreateList';

const ReviewCreate = ({setIsClick}) => {
    return (
        <>
            <ReviewCreateForm/>
            <ReviewCreateList setIsClick={setIsClick}/>
        </>
    );
};




export default ReviewCreate;