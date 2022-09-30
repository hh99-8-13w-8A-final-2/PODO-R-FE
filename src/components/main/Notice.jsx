import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import Modal from '../../assets/modal/Modal';
import ModalPortal from '../../assets/modal/Portal';
import NoticContents from './NoticContents';

const Notice = ({isloading, isError, error, data }) => {
    const [isModal, setIsModal] = useState(false)
    const [targetNoticeId, setTargetNoticeId] = useState()
    if(isloading) {
        return <h2>Loading ...</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
      } 
    const handleModal = (event) =>{
        setIsModal(!isModal)
        setTargetNoticeId(event.target.id)

    }

    return (
        <>
            <ul>
                {data?.data.content.map(notice => (
                    <StLi key={notice.noticeId}>
                        <StCont onClick={handleModal} id={notice.noticeId}>{notice.title}</StCont>
                        <StDate>{notice.createdAt.slice(0,10)}</StDate>
                    </StLi>
                ))}
            </ul>
            <ModalPortal>
                {isModal && (
                    <Modal onClose ={handleModal} isModal={isModal} >
                        <NoticContents  onClose ={handleModal} noticeId={targetNoticeId} />
                    </Modal>
                )}
            </ModalPortal>
        </>
    );
};

const StLi = styled.li`
    color: var(--white);
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 690px;
    @media (max-width: 763px){
        width: 100%;
        font-size: .9em;
    }

`

const StCont = styled.span`
    width: 400px;
    display: inline-block;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
    @media (max-width: 763px){
        width: 300px;
    }
    @media (max-width: 375px){
        font-size: 12px;
        width: 200px;
    }
`

const StDate = styled.span`
    padding: 10px;
    @media (max-width: 763px){
        padding: 0;
        
    }
    @media (max-width: 375px){
       font-size: 12px;
    }
`

export default Notice;