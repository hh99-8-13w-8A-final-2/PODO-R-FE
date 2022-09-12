import React, { useState } from 'react';
import Header from '../components/common/Header';
import Layout from '../components/common/Layout';
import Footer from '../components/common/Footer';
import HeaderBottom from '../components/common/HeaderBottom'
import Selector from '../components/review/Selector';
import CreateBtn from '../components/common/CreateBtn'
import Portal from '../assets/modal/Portal'
import Modal from '../assets/modal/Modal';
import ReviewDetail from '../components/review/ReviewDetail';


const ReviewPage = () => {
    const [modalOn, setModalOn] = useState(false);
    const [reviewsId, SetReviewsId ] = useState('');

    const handleModal = (reviewsId) => {
      setModalOn(!modalOn);
      SetReviewsId(reviewsId)
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
                {modalOn && 
                <Modal>
                    <ReviewDetail reviewsId={reviewsId} onClose={handleModal}/>
                </Modal>}
            </Portal>
        </>
    );
};

export default ReviewPage;