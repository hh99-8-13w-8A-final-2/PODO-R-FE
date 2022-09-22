import React from 'react';
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';
import MyPageBottom from "../components/kakao/MyPageBottom";

const MypageLayout = () => {
    return (
        <>
            <Header />
            <MyPageBottom />
            <Layout>
                <Outlet />
            </Layout>
            <Footer />
        </>
    );
};

export default MypageLayout;