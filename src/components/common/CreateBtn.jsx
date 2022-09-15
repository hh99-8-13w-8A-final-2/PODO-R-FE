import React from 'react';
import pencil from '../../assets/img/pencil.svg'
import up from '../../assets/img/up.svg'
import { useNavigate, useLocation } from "react-router-dom";
import styled from 'styled-components';
import { useSelector } from "react-redux"

const CreateBtn = ({ onClickHandler }) => {
    /* let location = useLocation();
    const navigate = useNavigate();
    const onClickHandler =()=>{
        navigate(`${location.pathname}/create`)
    } */
    const isLogin = useSelector((state)=> state.user.isLogin);
    const goToTop =() =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }
    return (
        <StCreateDiv>
            <div>
                <img src={up} alt="위로 올라가기" onClick={goToTop} />
            </div>
            {isLogin ?
            <div>
                <img src={pencil} alt="리뷰쓰기" onClick={onClickHandler} />
            </div> :
            null}
            
        </StCreateDiv>
    );
};

export default CreateBtn;

const StCreateDiv = styled.div`
position: fixed;
bottom: 30px;
right: 30px;
div{
    z-index: 10;
    width: 3em;
    height: 3em;
    border-radius: 50px;
    background-color: var(--maincolor-2);
    transition: all .3s;
    margin-top: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    &:hover {
        background-color: var(--maincolor-1);
    }
}

    img{
        width: 24px;
    }
`