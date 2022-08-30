import React from 'react';
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import MainBanner from '../components/main/MainBanner';
import TicketOpenList from '../components/main/TicketOpenList';
import LiveReview from '../components/main/LiveReview';

const MainPage = () => {
    return (
        <>
            <Header/>
            <Layout>
                <MainBanner/>
                <TicketOpenList/>
                <LiveReview/>
            </Layout>
            <Footer/>
        </>
    );
};

export default MainPage;