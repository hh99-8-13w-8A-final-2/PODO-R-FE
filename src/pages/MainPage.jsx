import React,{useState} from 'react';
import MainBanner from '../components/main/MainBanner';
import TicketOpenList from '../components/main/TicketOpenList';
import Popularity from '../components/main/Popularity';
import LiveReviewList from '../components/main/LiveReviewList';
import NoticeList from '../components/main/NoticeList';
import Portal from '../assets/modal/Portal'
import Modal from '../assets/modal/Modal';
import up from '../assets/img/up.svg'
import ReviewDetail from '../components/review/ReviewDetail';
import styled from 'styled-components';
import { useEffect } from 'react';

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
      const goToTop =() =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
      }
      useEffect(() => {
        sessionStorage.clear()
    }, [])
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
          <StCreateDiv>
              <div>
                  <img src={up} alt="위로 올라가기" onClick={goToTop} />
              </div>
          </StCreateDiv>
        </>
    );
};

export default MainPage;


const StCreateDiv = styled.div`
position: fixed;
bottom: 30px;
right: 30px;
z-index: 100;
div{
    z-index: 10;
    width: 3em;
    height: 3em;
    border-radius: 50px;
    background-color: var(--maincolor-2);
    transition: all .3s;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: var(--maincolor-1);
    }
    img{
        width: 24px;
        height: 100%;
    }
}
   
`