import React from 'react';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import Notfind from '../components/common/Notfind';
import Layout from '../components/common/Layout';

const NotfindPage = () => {
    return (
        <>
            <Header/>
            <Layout>
                <Notfind/>
            </Layout>
            <Footer/>
        </>
    );
};

export default NotfindPage;