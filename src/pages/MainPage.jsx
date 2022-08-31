import React from 'react';
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import MainBanner from '../components/main/MainBanner';
import TicketOpenList from '../components/main/TicketOpenList';
import LiveReview from '../components/main/LiveReview';
import NoticeList from '../components/main/NoticeList';
import CreateBtn from '../components/common/CreateBtn';

const MainPage = () => {
    return (
        <>
            <Header/>
            <Layout>
                <MainBanner/>
                <TicketOpenList/>
                <LiveReview/>
                <NoticeList/>
            </Layout>
            <Footer/>
            <CreateBtn/>
        </>
    );
};

export default MainPage;