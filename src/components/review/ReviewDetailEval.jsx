import React from 'react';
import styled from 'styled-components';
import { ReactComponent as Angry } from '../../assets/img/angry.svg'
import { ReactComponent as Slightly } from '../../assets/img/slightly.svg'
import { ReactComponent as Smiling } from '../../assets/img/smiling.svg'
import { ReactComponent as AngryBad } from '../../assets/img/angry_bad.svg'
import { ReactComponent as SlightlyAver } from '../../assets/img/slightly_aver.svg'
import { ReactComponent as SmilingGood } from '../../assets/img/smiling_good.svg'

const ReviewDetailEval = ({ data }) => {
    console.log(data.data.evaluation)

    return (
        <StEvalBox>
            <StGapDiv>
                <span>단차</span>
                <div>
                    {data?.data.evaluation.gap === 1 && <><div><Angry /><span>나쁨</span></div><div><SlightlyAver /></div><div><SmilingGood /></div></>}
                    {data?.data.evaluation.gap === 2 && <><div><AngryBad /></div><div><Slightly /><span>보통</span></div><div><SmilingGood /></div></>}
                    {data?.data.evaluation.gap === 3 && <><div><AngryBad /></div><div><SlightlyAver /></div><div><Smiling /><span>좋음</span></div></>}
                </div>
            </StGapDiv>
            <StViewDiv>
                <span>시야</span>
                <div>
                    {data?.data.evaluation.sight === 1 && <><div><Angry /><span>나쁨</span></div><div><SlightlyAver /></div><div><SmilingGood /></div></>}
                    {data?.data.evaluation.sight === 2 && <><div><AngryBad /></div><div><Slightly /><span>보통</span></div><div><SmilingGood /></div></>}
                    {data?.data.evaluation.sight === 3 && <><div><AngryBad /></div><div><SlightlyAver /></div><div><Smiling /><span>좋음</span></div></>}
                </div>
            </StViewDiv>
            <StSoundDiv>
                <span>음향</span>
                <div>
                    {data?.data.evaluation.sound === 1 && <><div><Angry /><span>나쁨</span></div><div><SlightlyAver /></div><div><SmilingGood /></div></>}
                    {data?.data.evaluation.sound === 2 && <><div><AngryBad /></div><div><Slightly /><span>보통</span></div><div><SmilingGood /></div></>}
                    {data?.data.evaluation.sound === 3 && <><div><AngryBad /></div><div><SlightlyAver /></div><div><Smiling /><span>좋음</span></div></>}
                </div>
            </StSoundDiv>
            <StLightDiv>
                <span>조명</span>
                <div>
                    {data?.data.evaluation.light === 1 && <><div><Angry /><span>나쁨</span></div><div><SlightlyAver /></div><div><SmilingGood /></div></>}
                    {data?.data.evaluation.light === 2 && <><div><AngryBad /></div><div><Slightly /><span>보통</span></div><div><SmilingGood /></div></>}
                    {data?.data.evaluation.light === 3 && <><div><AngryBad /></div><div><SlightlyAver /></div><div><Smiling /><span>좋음</span></div></>}
                </div>
            </StLightDiv>
        </StEvalBox>
    );
};

const StEvalBox = styled.div`
    display: flex;
    justify-content: space-between;
`

const StGapDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    &::after {
        display: block;
        position: absolute;
        top: 15px;
        right: -30px;
        width: 1px;
        height: 70px;
        content: '';
        background: var(--gray-1);
    }
    span {
        line-height: 42px;
    }
    div {
        display: flex;
        justify-content: space-between;
        width: 88px;
        div {
            display: flex;
            flex-direction: column;
            font-size: 12px;
            align-items: center;
            span {
                line-height: 20px;
                color: var(--maincolor-1);
                font-weight: bold;
            }
        }
    }
`

const StViewDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    &::after {
        display: block;
        position: absolute;
        top: 15px;
        right: -29px;
        width: 1px;
        height: 70px;
        content: '';
        background: var(--gray-1);
    }
    span {
        line-height: 42px;
    }
    div {
        display: flex;
        justify-content: space-between;
        width: 88px;
        div {
            display: flex;
            flex-direction: column;
            font-size: 12px;
            align-items: center;
            span {
                line-height: 20px;
                color: var(--maincolor-1);
                font-weight: bold;
            }
        }
    }
`

const StSoundDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    position: relative;
    &::after {
        display: block;
        position: absolute;
        top: 15px;
        right: -30px;
        width: 1px;
        height: 70px;
        content: '';
        background: var(--gray-1);
    }
    span {
        line-height: 42px;
    }
    div {
        display: flex;
        justify-content: space-between;
        width: 88px;
        div {
            display: flex;
            flex-direction: column;
            font-size: 12px;
            align-items: center;
            span {
                line-height: 20px;
                color: var(--maincolor-1);
                font-weight: bold;
            }
        }
    }
`

const StLightDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    span {
        line-height: 42px;
    }
    div {
        display: flex;
        justify-content: space-between;
        width: 88px;
        div {
            display: flex;
            flex-direction: column;
            font-size: 12px;
            align-items: center;
            span {
                line-height: 20px;
                color: var(--maincolor-1);
                font-weight: bold;
            }
        }
    }
`


export default ReviewDetailEval;