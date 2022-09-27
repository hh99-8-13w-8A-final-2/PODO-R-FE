import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import apis from '../../apis/apis';

const NoticContents = ({onClose, noticeId}) => {
    
    const [data ,setData] = useState()

    const getData = async() => {
        const res = await apis.getNoticeContents(noticeId)
        setData(res.data)
    }

    useEffect(()=>{
        getData()
    },[noticeId])
    
    
    
    
    
    return (
        <StInfoDiv>
            <StLoginBox>
                <button onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className='name'>[공지사항] {data?.title}</div>
            </StLoginBox>
            <div className="contents">
                <div className='title'> 
                    <p>{data?.title}</p>
                    <span>{data?.createdAt.slice(0,10)}</span>
                </div>
                <div className='content'>{data?.content}</div>
            </div>
        </StInfoDiv>
    );
};

export default NoticContents;


const StInfoDiv = styled.div`
padding: 40px;
width: 800px;
text-align: left;
    .name { 
        font-size: 1.2em;
        font-weight: 700;
        
    }
    .contents{
        .title{
            display: flex;
            align-items: flex-start;
            justify-content: space-between;
            p {
                margin-bottom: 20px;
                font-weight: bold;
            }
        }
        .content{
            line-height: 22px;
        }
    }
`
const StLoginBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-end;
  align-items: center;
  flex-direction: row-reverse;
  animation-name: fadeOut;
  padding-bottom: 20px;
  margin-bottom: 20px;
  border-bottom: 1px solid var(--gray-4);
  button {
    border: none;
    border-radius: 10px;
    background-color: var(--white);
    font-size: 1.5em;
    color: var(--gray-2);
    transition: all 0.3s;
    animation-name: fadeOut;
    cursor: pointer;
    &:hover {
      color: var(--gray-3);
    }
  }
`;