import React from 'react';
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import MainBanner from '../components/main/MainBanner';
import TicketOpenList from '../components/main/TicketOpenList';
import LiveReviewList from '../components/main/LiveReviewList';
import NoticeList from '../components/main/NoticeList';

const MainPage = () => {
    return (
        <>
            <Header/>
            <Layout>
                <MainBanner/>
                <TicketOpenList/>
                <LiveReviewList/>
                <NoticeList/>
            </Layout>
            <Footer/>
        </>
    );
};

export default MainPage;