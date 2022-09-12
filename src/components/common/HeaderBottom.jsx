import React, {useState} from 'react';
import styled from 'styled-components';
import Layout from './Layout';
import info from '../../assets/img/info.svg'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import ModalPortal from '../../assets/modal/Portal';
import Modal from "../../assets/modal/Modal";
import TheaterInfo from './TheaterInfo';

const HeaderBottom = () => {
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(3,1).toString()
    const [theaterModal, setTheaterModal] = useState(false)
    const getTitle = async() =>{
       const res = await axios.get(`http://3.39.240.159/api/theaters/${musicalId}/reviews`)
    }

    const handleModal = () =>{
        setTheaterModal(!theaterModal)
    }

    return (
        <StHeaderBottom>    
            <Layout>
                <StHeaderBottomCont>
                    <span className='title'> 2022 푸에르자 부르타 웨이라 인 서울 [2022 FUERZA BEUTA WAYRA IN SEOUL]</span> <span className='theater'>잠실 종합운동장 FB 씨어터 <img src={info} alt="" className='icon' onClick={handleModal} /> </span> 
                </StHeaderBottomCont>

                <ModalPortal>
                    {theaterModal && (
                        <Modal onClose ={handleModal}>
                            <TheaterInfo/>
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