import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { __getmusicalData } from '../redux/modules/musicalSlice';
import { useDispatch } from "react-redux";
import Selector from '../components/review/Selector';
import CreateBtn from '../components/common/CreateBtn'
import Portal from '../assets/modal/Portal'
import Modal from '../assets/modal/Modal';
import ReviewDetail from '../components/review/ReviewDetail';
import Create from '../components/create/Create';
import apis from '../apis/apis';


const ReviewPage = () => {
    const navigate = useNavigate();
    let location = useLocation();
    let musical = location.pathname.split('/').splice(2,1).toString()
    const dispatch = useDispatch();
    
    const [modalOn, setModalOn] = useState(false);
    const [reviewsId, SetReviewsId ] = useState('');
    const [musicalId, SetMusicalId ] = useState('');
    const [create, SetCreate] = useState(false)
    const [musicals, setMusicals] = useState({});
    const getData = async() =>{
        try{
            const res = await apis.getMusicalData(musical)
            setMusicals(res.data)
        } catch(err){
            if(err.response.status === 400){
                navigate("/notfind")
            }
            console.log(err.response.status)
        }
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
            {create ? <Create create={create} SetCreate={SetCreate} theaterId={musicals.theaterId} /> : <Selector theaterId={musicals.theaterId} handleModal={handleModal} />}
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