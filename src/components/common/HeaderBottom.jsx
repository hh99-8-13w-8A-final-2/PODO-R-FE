import React, {useState} from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import info from '../../assets/img/info.svg'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ModalPortal from '../../assets/modal/Portal';
import Modal from "../../assets/modal/Modal";
import TheaterInfo from './TheaterInfo';
import { useEffect } from 'react';

const HeaderBottom = () => {
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(3,1).toString()
    const [theaterModal, setTheaterModal] = useState(false)
    const [musicals, setMusicals] = useState({
        musicalName: '',
        theaterName: '',
        theaterId: ''
    });
    const getTitle = async() =>{
       const res = await axios.get(`http://3.39.240.159/api/musicals/${musicalId}`)
       setMusicals(res.data)
    }

    useEffect(()=>{
        getTitle()
    },[])


    const handleModal = () =>{
        setTheaterModal(!theaterModal)
    }

    return (
        <StHeaderBottom>    
            <Layout>
                <StHeaderBottomCont>
                     <span className='title'>{musicals.musicalName}</span> <span className='theater'>{musicals.theaterName}<img src={info} alt="" className='icon' onClick={handleModal} /> </span> 
                </StHeaderBottomCont>

                <ModalPortal>
                    {theaterModal && (
                        <Modal  onClose ={handleModal} theaterModal={theaterModal} >
                            <TheaterInfo onClose ={handleModal} theaterId={musicals.theaterId}/>
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
`

export default HeaderBottom;