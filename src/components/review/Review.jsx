import React from 'react';
import styled from 'styled-components';

const Review = () => {
    return (
        <StReviewDiv>
            {/* 리뷰 map 돌릴 곳 */}
            <div className='top'>
                <div>이미지</div>
                <div>뒷배경</div>
            </div>
            <div className='bottom'>
                <ul>
                    <li>VIP석</li>
                    <li>1층 B구역</li>
                    <li>19열 90</li>
                </ul>
            </div>
        </StReviewDiv>
    );
};

export default Review;

const StReviewDiv = styled.div`
padding: 10px;

width: 200px;
    color: var(--gray-2);
    .top{
        position: relative;
        div{
            &:first-of-type{
                border: 2px solid var(--gray-2);
                border-radius: 10px 10px 0 0;
                border-bottom: none;
                width: 160px;
                height: 120px;
                margin: 0 auto;
                background-color: var(--gray-3);
                position: absolute;
                top: -10px;
                right: 50%;
                transform: translate(50%);
            }
            &:last-of-type{
                border: 2px solid var(--gray-2);
                border-bottom: none;
                height: 110px;
                border-radius: 10px 10px 0 0;
                background-color: var(--gray-3);
            }
        }
    }
    .bottom{
        border: 2px solid var(--gray-2);
        border-radius: 0 0 10px 10px;
        ul{
            display: flex;
            li{
                padding: 8px 10px;
                font-size: 14px;
                border-right: 1px solid var(--gray-2);
                &:first-of-type{
                    font-weight: 700;
                }
                &:last-of-type{
                    border-right: none;
                }
            }
        }
    }
`