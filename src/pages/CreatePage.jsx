import React from 'react';
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import HeaderBottom from '../components/common/HeaderBottom'
import Create from '../components/create/Create';


const CreatePage = () => {
    return (
        <>
            <Header/>
            <HeaderBottom/>
            <Layout>
                <Create/>
            </Layout>
            <Footer/>
        </>
    );
};

export default CreatePage;