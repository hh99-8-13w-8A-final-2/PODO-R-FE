import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Selector from '../components/review/Selector';
import CreateBtn from '../components/common/CreateBtn'
import Portal from '../assets/modal/Portal'
import Modal from '../assets/modal/Modal';
import ReviewDetail from '../components/review/ReviewDetail';
import Create from '../components/create/Create';
import { useRecoilValue } from 'recoil';
import muslicalSelector from '../atoms/musicalSelector';


const ReviewPage = () => {
        
    let location = useLocation();
    let musical = location.pathname.split('/').splice(2,1).toString()
    
    const [modalOn, setModalOn] = useState(false);
    const [reviewsId, SetReviewsId ] = useState('');
    const [musicalId, SetMusicalId ] = useState('');
    const [create, SetCreate] = useState(false)

    const onClickHandler = () =>{
        SetCreate(!create)
    }

    const handleModal = (reviewsId, musicalId) => {
      setModalOn(!modalOn);
      SetReviewsId(reviewsId);
      SetMusicalId(musicalId);
    };
    const modalclose = () =>{
        setModalOn(!modalOn);
    }

    const musicalInfo = useRecoilValue(muslicalSelector(musical))

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    },[])


    return (
        <>
            {create ? <Create create={create} SetCreate={SetCreate} theaterId={musicalInfo.theaterId} musicalId={musicalInfo.musicalId}/> : <Selector theaterId={musicalInfo.theaterId} handleModal={handleModal} />}
            <CreateBtn onClickHandler={onClickHandler}/>
            <Portal>
                {modalOn && 
                <Modal onClose={modalclose} >
                    <ReviewDetail reviewsId={reviewsId} musicalId={musicalId} onClose={handleModal}/>
                </Modal>}
            </Portal>
        </>
    );
};

export default ReviewPage;