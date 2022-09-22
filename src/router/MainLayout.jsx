import React from 'react';
import { Outlet } from 'react-router-dom'
import Footer from '../components/common/Footer';
import Layout from '../components/common/Layout';
import Header from '../components/common/Header';

const MainLayout = () => {
    return (
        <>
            <Header />
            <Layout>
                <Outlet />
            </Layout>
            <Footer />
        </>
    );
};

export default MainLayout;