import React,{useState} from 'react';
import MainBanner from '../components/main/MainBanner';
import TicketOpenList from '../components/main/TicketOpenList';
import Popularity from '../components/main/Popularity';
import LiveReviewList from '../components/main/LiveReviewList';
import NoticeList from '../components/main/NoticeList';
import Portal from '../assets/modal/Portal'
import Modal from '../assets/modal/Modal';
import ReviewDetail from '../components/review/ReviewDetail';


const MainPage = () => {
    const [modalOn, setModalOn] = useState(false);
    const [reviewsId, SetReviewsId ] = useState('');
    const [musicalId, SetMusicalId ] = useState('');
    const handleModal = (reviewsId, musicalId) => {
        setModalOn(!modalOn);
        SetReviewsId(reviewsId);
        SetMusicalId(musicalId);
      };
      const modalclose = () =>{
          setModalOn(!modalOn);
      }
    return (
        <>
            <MainBanner/>
            <TicketOpenList/>
            <Popularity/>
            <LiveReviewList handleModal={handleModal}/>
            <NoticeList/>
            <Portal>
        {modalOn && (
          <Modal onClose={modalclose} modalOn={modalOn}>
            <ReviewDetail reviewsId={reviewsId} onClose={handleModal} musicalId={musicalId}/>
          </Modal>
        )}
      </Portal>
        </>
    );
};

export default MainPage;