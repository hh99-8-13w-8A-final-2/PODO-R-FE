import axios from 'axios';
import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TheaterMap from './TheaterMap';
import styled from "styled-components";
import CONVENIENCE from '../../assets/img/CONVENIENCE.svg'
import DISABLED from '../../assets/img/DISABLED.svg'
import PARK from '../../assets/img/PARK.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const TheaterInfo = () => {
    const [signupModalOn, setSignupModalOn] = useState(false);
    const [theaterInfo, setTheaterInfo] = useState({
        theaterName:'',
        theaterAddr:'',
        theaterUrl:'',
        la:'',
        lo:'',
        conveniences:['']
    })
    const convenience = []
    const disabled = []
    const park = [] 

    const getTheater = async() => {
        const res = await axios.get(`http://3.39.240.159/api/theaters/2`)
        setTheaterInfo(res.data)
        console.log(res.data)

    }

    for(var i in theaterInfo.conveniences){
            if(theaterInfo.conveniences[i].type === 'CONVENIENCE'){
                convenience.push(<li>{theaterInfo.conveniences[i].value}</li>)
                console.log(convenience)
            }else if(theaterInfo.conveniences[i].type === 'DISABLED'){
                disabled.push(<li>{theaterInfo.conveniences[i].value}</li>)
                console.log(disabled)
            }else{
                park.push(<li>{theaterInfo.conveniences[i].value}</li>)
                console.log(park)
            }
        }

      const coordinate = [theaterInfo.la, theaterInfo.lo]

    useEffect(()=>{
        getTheater()
    },[theaterInfo.la])
    
    const handleModal = () => {
        setSignupModalOn(!signupModalOn);
    };
    

    return (
        <StInfoDiv>
            <StLoginBox>
                <button onClick={handleModal}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </StLoginBox>
            <div className='name'>{theaterInfo.theaterName}</div>
            <div className='info'>
                <p><span>전화번호</span> {theaterInfo.theaterTel} </p>
                <p><span>주소</span>{theaterInfo.theaterAddr}</p>
                <p><span>홈페이지</span>{theaterInfo.theaterUrl}</p>
            </div>
            <div className='conveniences'>
                <div className='convenience'>
                {convenience.length !== 0 ? 
                    <img src={CONVENIENCE} alt="" />
                    :null}
                    <div>{convenience}</div>
                </div>
                <div className='DISABLED'>
                {disabled.length !== 0 ? 
                    <img src={DISABLED} alt="" />
                    :<></>}
                    <div>{disabled}</div>
                </div>
                <div className='PARK'>
                {park.length !== 0 ? 
                    <img src={PARK} alt="" />
                    :<></>}
                    <div>{park}</div>
                </div>
            </div>
            <div className='map'>
                <TheaterMap coordinate={coordinate}/>
            </div>
        </StInfoDiv>
    );
};

export default TheaterInfo;

const StInfoDiv = styled.div`
padding: 20px;
    .name { 
        font-size: 1.2em;
        font-weight: 700;
        
    }
    .info{
        text-align: left;
        color: var(--gray-2);
        p{
            margin: 10px 0;
            span{
                margin-right: 10px;
            }
        }
        margin-bottom: 20px;
    }
    .map{
        margin-top: 20px;
    }
    .conveniences{
        display: flex;
        >div{
            display: flex;
            align-items: flex-start;
            margin-right: 40px;
            padding: 10px 0;
            >img{
                width: 60px;
                margin-right: 10px;
            }
            >div{
                 text-align: left;
                 color: var(--gray-2);
                 li{
                    padding:2px 0;
                 }
                 padding: 10px 0;
            }
        }
    }
    
`
const StLoginBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-content: flex-end;
  button {
    border: none;
    border-radius: 10px;
    background-color: var(--white);
    font-size: 1.5em;
    color: var(--gray-2);
    transition: all 0.3s;
    cursor: pointer;
    &:hover {
      color: var(--gray-3);
    }
  }
`;