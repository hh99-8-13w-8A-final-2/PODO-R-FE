import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import info from '../../assets/img/info.svg'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import apis from '../../apis/apis';
import ModalPortal from '../../assets/modal/Portal';
import Modal from "../../assets/modal/Modal";
import TheaterInfo from './TheaterInfo';
import ModalSeat from './ModalSeat';


const HeaderBottom = () => {
    const URI = {
        BASE: process.env.REACT_APP_BASE_URI
      };
    
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(2,1).toString()
    const [theaterModal, setTheaterModal] = useState(false)
    const [theaterSeatModal, setTheaterSeatModal] = useState(false)
    const [musicals, setMusicals] = useState({
        musicalName: '',
        theaterName: '',
        theaterId: ''
    });
    const getTitle = async() =>{
       //const res = await axios.get(`${URI.BASE}/api/musicals/${musicalId}`)
       const res = await apis.getMusicalId(musicalId)

       setMusicals(res.data)
    }

    useEffect(()=>{
        getTitle()
    },[])


    const handleModal = () =>{
        setTheaterModal(!theaterModal)
    }
    const handleSeatModal = () =>{
        setTheaterSeatModal(!theaterSeatModal)
    }


    return (
        <StHeaderBottom>    
            <Layout>
                <StHeaderBottomCont>
                     <span className='title'>{musicals.musicalName}</span> <span className='theater'>{musicals.theaterName}<img src={info} alt="" className='icon' onClick={handleModal} /> <span className='btn' onClick={handleSeatModal}>좌석 확인하기</span></span> 
                     
                </StHeaderBottomCont>

                <ModalPortal>
                    {theaterModal && (
                        <Modal  onClose ={handleModal} theaterModal={theaterModal} >
                            <TheaterInfo onClose ={handleModal} theaterId={musicals.theaterId}/>
                        </Modal>
                    )}
                    {theaterSeatModal && (
                        <Modal onClose ={handleSeatModal} >
                            <ModalSeat onClose ={handleSeatModal} theaterId={musicals.theaterId}/>
                        </Modal>
                    )}
                </ModalPortal>
            </Layout>
        </StHeaderBottom>
    );
};

const StHeaderBottom = styled.div`
    width: 100%;
    border-bottom: 1px solid var(--maincolor-1);
`

const StHeaderBottomCont = styled.div`
    position: relative;
    color: var(--white);
    width: 100%;
    
    .title{
        text-align: center;
        display: block;
        margin: 30px 0; 
        font-size: 1.3em;
    }
    .theater {
        margin: 0 10px;
        font-size: 14px;
        flex-grow: 0;
        display: flex;
        align-items: center;
        position: absolute;
        right: 0;
        bottom: -3px;
        img{
            width: 26px;
            margin-left: 10px;
            cursor: pointer;
        }
    }
    .btn {
        display: inline-block;
        padding: 5px 10px;
        border-radius: 20px;
        font-weight: 500;
        font-size: 14px;
        background-color: var(--maincolor-1);
        color: var(--white);
        margin-left: 20px;
        cursor: pointer;
    }
`

export default HeaderBottom;