import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { __getmusicalData } from '../redux/modules/musicalSlice';
import { useDispatch, useSelector } from "react-redux";
import Selector from '../components/review/Selector';
import CreateBtn from '../components/common/CreateBtn'
import Portal from '../assets/modal/Portal'
import Modal from '../assets/modal/Modal';
import ReviewDetail from '../components/review/ReviewDetail';
import Create from '../components/create/Create';
import axios from 'axios';


const ReviewPage = () => {

    const URI = {
        BASE: process.env.REACT_APP_BASE_URI
      };
    
    
    let location = useLocation();
    let musical = location.pathname.split('/').splice(2,1).toString()
    const dispatch = useDispatch();
    
    const [modalOn, setModalOn] = useState(false);
    const [reviewsId, SetReviewsId ] = useState('');
    const [musicalId, SetMusicalId ] = useState('');
    const [create, SetCreate] = useState(false)
    const [musicals, setMusicals] = useState({
  
    });
    const getData = async() =>{
        const res = await axios.get(`${URI.BASE}/api/musicals/${musical}`)
        setMusicals(res.data)
     }

    const onClickHandler = () =>{
        SetCreate(!create)
    }
    //console.log(musicals)
    const handleModal = (reviewsId, musicalId) => {
      setModalOn(!modalOn);
      SetReviewsId(reviewsId);
      SetMusicalId(musicalId);
    };
    const modalclose = () =>{
        setModalOn(!modalOn);
    }
    useEffect(()=>{
        getData()
        dispatch(__getmusicalData(musical));
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    },[])


    return (
        <>
            {create ? <Create create={create} SetCreate={SetCreate} theaterId={musicals.theaterId} /> : <Selector theaterId={musicals.theaterId} handleModal={handleModal} /> }
            <CreateBtn onClickHandler={onClickHandler}/>
            <Portal>
                {modalOn && 
                <Modal onClose={modalclose} modalOn={modalOn}>
                    <ReviewDetail reviewsId={reviewsId} musicalId={musicalId} onClose={handleModal}/>
                </Modal>}
            </Portal>
        </>
    );
};

export default ReviewPage;