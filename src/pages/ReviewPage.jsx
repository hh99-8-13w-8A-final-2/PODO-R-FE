import React, { useState } from 'react';
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import HeaderBottom from '../components/common/HeaderBottom'
import Selector from '../components/review/Selector';
import CreateBtn from '../components/common/CreateBtn'
import Portal from '../assets/modal/Portal'
import Modal from '../assets/modal/Modal';

const ReviewPage = () => {
    const [modalOn, setModalOn] = useState(false);

    const handleModal = () => {
      setModalOn(!modalOn);
    };

    return (
        <>
            <Header />
            <HeaderBottom />
            <Layout>
                <Selector handleModal={handleModal}/>
            </Layout>
            <Footer />
            <CreateBtn />
            <Portal>
                {modalOn && <Modal onClose={handleModal} />}
            </Portal>
        </>
    );
};

export default ReviewPage;