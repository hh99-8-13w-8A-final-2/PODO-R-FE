import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Selector from '../components/review/Selector';
import CreateBtn from '../components/common/CreateBtn'
import Portal from '../assets/modal/Portal'
import Modal from '../assets/modal/Modal';
import ReviewDetail from '../components/review/ReviewDetail';
import Create from '../components/create/Create';
import { useQuery } from 'react-query';
import apis from '../apis/apis';


const ReviewPage = () => {
    const navigate = useNavigate();
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
    const musicalInfo = async(musical) => {
        try{
            const res = await apis.getMusicalInfo(musical)
            return res
        } catch(err) {
            if(err.response.status === 400){
                navigate("/notfind")
            }
            console.log(err.response.status)
        }
    }

    const {data} = useQuery(['musicalInfo', musical], () => musicalInfo(musical),
        {
            refetchOnWindowFocus: false,
        }
    )

    useEffect(()=>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    },[])

    return (
        <>
            {create ? <Create create={create} SetCreate={SetCreate} theaterId={data?.data.theaterId} musicalId={data?.data.musicalId}/> : <Selector theaterId={data?.data.theaterId} handleModal={handleModal} />}
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