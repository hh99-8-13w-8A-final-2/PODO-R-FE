import React from 'react';
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';
import HeaderBottom from '../components/common/HeaderBottom'
const ReviewLayout = () => {
    return (
        <div>
            <Header />
            <HeaderBottom />
            <Layout>
                <Outlet />
            </Layout>
            <Footer />
        </div>
    );
};

export default ReviewLayout;