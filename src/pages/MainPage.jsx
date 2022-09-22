import React from 'react';
import MainBanner from '../components/main/MainBanner';
import TicketOpenList from '../components/main/TicketOpenList';
import Popularity from '../components/main/Popularity';
import LiveReviewList from '../components/main/LiveReviewList';
import NoticeList from '../components/main/NoticeList';

const MainPage = () => {
    return (
        <>
            <MainBanner/>
            <TicketOpenList/>
            <Popularity/>
            <LiveReviewList/>
            <NoticeList/>
        </>
    );
};

export default MainPage;