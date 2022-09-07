import React from 'react';
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import HeaderBottom from '../components/common/HeaderBottom';
import UserProfile from '../components/kakao/UserProfile';


const MyPage = () => {
    return (
        <>
        <Header/>
            <HeaderBottom/>
            <Layout>
                <UserProfile/>
            </Layout>
            <Footer/>
            
        </>
    );
};

export default MyPage;