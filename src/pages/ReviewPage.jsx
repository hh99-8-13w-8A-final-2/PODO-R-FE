import React from 'react';
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import HeaderBottom from '../components/common/HeaderBottom'
import Selector from '../components/review/Selector';
import CreateBtn from '../components/common/CreateBtn'

const ReviewPage = () => {
    return (
        <>
            <Header/>
            <HeaderBottom/>
            <Layout>
                <Selector/>
            </Layout>
            <Footer/>
            <CreateBtn/>
        </>
    );
};

export default ReviewPage;