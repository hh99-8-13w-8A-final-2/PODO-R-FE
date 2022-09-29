import React from 'react';
import styled from 'styled-components'
import { ReactComponent as Gap } from '../../assets/img/gap.svg'
import { ReactComponent as View } from '../../assets/img/view.svg'
import { ReactComponent as Sound } from '../../assets/img/sound.svg'
import { ReactComponent as Light } from '../../assets/img/light.svg'

const ReviewDetailEval = ({ data }) => {
    //console.log(data.data.evaluation)

    return (
        <StEvalBox>
            <StDiv className='icon'>
                <span>단차</span>
                <div>
                    {data?.data.evaluation.gap === 1 && <><div><Gap fill='#aaa'/><span style={{color:'var(--gray-2)'}}>나쁨</span></div></>}
                    {data?.data.evaluation.gap === 2 && <><div><Gap fill='#aaa'/><span style={{color:'var(--gray-2)'}}>보통</span></div></>}
                    {data?.data.evaluation.gap === 3 && <><div><Gap fill='var(--maincolor-1)'/><span style={{color:'var(--maincolor-1)'}}>좋음</span></div></>}
                </div>
            </StDiv>
            <StDiv className='icon'>
                <span>시야</span>
                <div>
                    {data?.data.evaluation.sight === 1 && <><div><View fill='#aaa'/><span style={{color:'var(--gray-2)'}}>나쁨</span></div></>}
                    {data?.data.evaluation.sight === 2 && <><div><View fill='#aaa'/><span style={{color:'var(--gray-2)'}}>보통</span></div></>}
                    {data?.data.evaluation.sight === 3 && <><div><View fill='var(--maincolor-1)'/><span style={{color:'var(--maincolor-1)'}}>좋음</span></div></>}
                </div>
            </StDiv>
            <StDiv className='icon'>
                <span>음향</span>
                <div>
                    {data?.data.evaluation.sound === 1 && <><div><Sound fill='#aaa'/><span style={{color:'var(--gray-2)'}}>나쁨</span></div></>}
                    {data?.data.evaluation.sound === 2 && <><div><Sound fill='#aaa'/><span style={{color:'var(--gray-2)'}}>보통</span></div></>}
                    {data?.data.evaluation.sound === 3 && <><div><Sound fill='var(--maincolor-1)'/><span style={{color:'var(--maincolor-1)'}}>좋음</span></div></>}
                </div>
            </StDiv>
            <StDiv>
                <span>조명</span>
                <div>
                    {data?.data.evaluation.light === 1 && <><div><Light fill='#aaa'/><span style={{color:'var(--gray-2)'}}>나쁨</span></div></>}
                    {data?.data.evaluation.light === 2 && <><div><Light fill='#aaa'/><span style={{color:'var(--gray-2)'}}>보통</span></div></>}
                    {data?.data.evaluation.light === 3 && <><div><Light fill='var(--maincolor-1)'/><span style={{color:'var(--maincolor-1)'}}>좋음</span></div></>}
                </div>
            </StDiv>
        </StEvalBox>
    );
};

const StEvalBox = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    justify-items: center;
    width: 100%;
    div{
        width: 100%;
    }
    div.icon{
        border-right: 1px solid var(--gray-4) ;
    }
    
`

const StDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    width: 20%;

    span {
        line-height: 42px;
    }
    @media screen and (max-width: 1200px) {
        font-size: 14px;
    }
    div {
        display: flex;
        justify-content: space-between;
        width: 88px;
        div {
            font-size: 16px;
            align-items: center;
            span {
                font-family: 'SUIT';
                line-height: 20px;
                font-weight: 600;
            }
            @media screen and (max-width: 1200px) {
                display: flex;
                flex-direction: column;
                font-size: 12px;
            }
        }
    }

`



export default ReviewDetailEval;