import React from 'react';
import styled from 'styled-components';
import podoal from '../../assets/img/podoal_gray.png'
import { useNavigate } from 'react-router-dom'

const Notfind = () => {
    const navigate = useNavigate();
    const onClickHandler = () => {
        navigate("/")
    }
    return (
        <StDiv img = {podoal}>
            <p className='big'>페이지를 찾을 수 없습니다!</p>
            <p className='not'>(404 Not Found)</p>
            <p className='small'>페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.</p>
            <p className='small'>입력하신 주소가 정확한지 다시 한번 확인해주시기 바랍니다.</p>
            <button onClick={onClickHandler}>홈으로 돌아가기</button>
        </StDiv>
    );
};

export default Notfind;

const StDiv = styled.div`
    text-align: center;
    padding: 50px 0;
    background: url(${props => props.img}) no-repeat right center;
    width: 1200px;
    margin-top: 100px;
    background-size: 300px;
    p{
        color: var(--gray-1);
        &.big{
            font-size: 2em;
            margin-bottom: 4px;
        }
        &.not{
            font-size: 2em;
            margin-bottom: 20px;
        }
        &.small{
            font-size: 1.1em;
            color:var(--gray-2);
            margin-bottom: 5px;
        }
    }
    button{
        margin-top: 20px;
        padding: 15px 20px;
        border-radius: 40px;
        border: none;
        background-color: var(--maincolor-2);
        color:var(--white);
        transition: all .3s;
        cursor: pointer;
        &:hover{
            background-color:var(--maincolor-1)
        }
    }
`