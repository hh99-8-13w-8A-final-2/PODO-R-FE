import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import apis from '../../apis/apis';
import { useState } from 'react';
import { useEffect } from 'react';


const ModalSeat = ({ onClose, theaterId }) => {

    const [seatInfo, satSeatInfo] = useState()
    const seatimg = seatInfo?.theaterSeatImage

    const getSeatInfo = async() =>{
        const res = await apis.getTheater(theaterId)
        satSeatInfo(res.data)
    }
    useEffect(()=>{
        getSeatInfo()
    },[])

    return (
        <StInfoDiv>
            <StLoginBox>
                <button onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
                <div className='name'>좌석 확인하기</div>
            </StLoginBox>
            <div className="contents">
            <img src={seatimg} alt="" />
            </div>
        </StInfoDiv>
    );
};

export default ModalSeat;


const StInfoDiv = styled.div`
padding: 40px;
width: 800px;
box-sizing: border-box;
text-align: left;
    .name { 
        font-size: 1.2em;
        font-weight: 700;
        
    }
    .contents{
        width: 100%;
        height: 600px;
        overflow: auto;
        img{
            width: 100%;
        }
    }
@media (max-width: 763px){
    width: 100%;
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