import React from 'react';

import styled from 'styled-components';
const RadioSelect = () => {
    return (
        <StRadioDiv>
                <div>
                    <h4><span style={{color:'var(--error)'}}>*</span> 단차</h4>
                    <div className='radio'>
                        <div>
                            <input type="radio" id="gap1" name="gap" value="1"/><label htmlFor="gap1"> <span></span> 나쁨</label>
                        </div>
                        <div>
                            <input type="radio" id="gap2" name="gap" value="2" defaultChecked/><label htmlFor="gap2"> <span></span> 보통</label>
                        </div>
                        <div>
                            <input type="radio" id="gap3" name="gap" value="3"/><label htmlFor="gap3"><span></span> 좋음</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h4><span style={{color:'var(--error)'}}>*</span> 시야</h4>
                    <div className='radio'>
                        <div>
                            <input type="radio" id="sight1" name="sight" value="1"/><label htmlFor="sight1"> <span></span> 나쁨</label>
                        </div>
                        <div>
                            <input type="radio" id="sight2" name="sight" value="2" defaultChecked/><label htmlFor="sight2"> <span></span> 보통</label>
                        </div>
                        <div>
                            <input type="radio" id="sight3" name="sight" value="3"/><label htmlFor="sight3"><span></span> 좋음</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h4><span style={{color:'var(--error)'}}>*</span> 음향</h4>
                    <div className='radio'>
                       <div>
                            <input type="radio" id="sound1" name="sound" value="1"/><label htmlFor="sound1"> <span></span> 나쁨</label>
                        </div>
                        <div>
                            <input type="radio" id="sound2" name="sound" value="2" defaultChecked/><label htmlFor="sound2"> <span></span> 보통</label>
                        </div>
                        <div>
                            <input type="radio" id="sound3" name="sound" value="3"/><label htmlFor="sound3"><span></span> 좋음</label>
                        </div>
                    </div>
                </div>
                <div>
                    <h4><span style={{color:'var(--error)'}}>*</span> 조명</h4>
                    <div className='radio'>
                        <div>
                            <input type="radio" id="light1" name="light" value="1"/><label htmlFor="light1"> <span></span> 나쁨</label>
                        </div>
                        <div>
                            <input type="radio" id="light2" name="light" value="2" defaultChecked/><label htmlFor="light2"> <span></span> 보통</label>
                        </div>
                        <div>
                            <input type="radio" id="light3" name="light" value="3"/><label htmlFor="light3"><span></span> 좋음</label>
                        </div>
                    </div>
                </div>
            </StRadioDiv>
    );
};

export default RadioSelect;


const StRadioDiv=styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    >div{
        width: 18%;
    }
    .radio{
        display: flex;
        justify-content: space-between;
        >div{
            label{
                display: flex;
                flex-direction: column;
                align-items: center;
            }
            span{
                margin-bottom: 10px;
                text-align: center;
                z-index: 2;
                &::after{
                    content:'';
                    display: block;
                    width: 4em;
                    height: 2px;
                    background-color:var(--gray-3);
                    margin: 50%;
                    transform: translate(7px, -50%);
                }
            }
        }
        >div:last-of-type{
            span::after{
                display: none;
            }
        }
    }
    input[type="radio"] {
        display:none;
    }
    input[type="radio"] + label span {
        display:inline-block;
        width: 14px;
        height: 14px;
        border-radius: 12px;
        transition: all .3s;
        background-color: var(--gray-3);
    }
    input[type="radio"]:checked + label{
        color: var(--maincolor-1);
    }
    input[type="radio"]:checked + label span {
        background-color: var(--maincolor-1);
        
    }
    label{
        color: var(--gray-2);
    }
`