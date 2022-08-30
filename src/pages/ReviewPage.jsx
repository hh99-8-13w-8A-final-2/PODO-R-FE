import React from 'react';
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import HeaderBottom from '../components/common/HeaderBottom'
import Selector from '../components/review/Selector';
import ReviewList from '../components/review/ReviewList';

const ReviewPage = () => {
    return (
        <>
            <Header/>
            <HeaderBottom/>
            <Layout>
                <Selector/>
                <ReviewList/>
            </Layout>
            <Footer/>
        </>
    );
};

export default ReviewPage;