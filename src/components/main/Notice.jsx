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
        console.log(targetNoticeId)
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
    width: 690px;

`

const StCont = styled.span`
    width: 400px;
    display: inline-block;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    cursor: pointer;
`

const StDate = styled.span`
    padding: 10px;
`

export default Notice;