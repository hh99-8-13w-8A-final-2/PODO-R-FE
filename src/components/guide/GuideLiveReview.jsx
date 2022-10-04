import React, { useEffect } from 'react';
import styled from 'styled-components';


const GuideLiveReview = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])


    const img1 = 'https://podoal-front.s3.ap-northeast-2.amazonaws.com/static/media/guide+(7).webp'
    const img2 = 'https://podoal-front.s3.ap-northeast-2.amazonaws.com/static/media/guide+(8).webp'

    return (
        <StContent>
            <div className='section1'>
                <div className='num'><p>1</p></div>
                <h2>PODO LIVE에서 실시간으로 작성된 신규 리뷰 확인</h2>
                <img src={img1} alt="" />
            </div>
            <div className='section2'>
                <div className='num'><p>2</p></div>
                <h2>팝업을 통해 리뷰 내용 확인</h2>
                <img src={img2} alt="" />
            </div>
        </StContent>
    );
};

export default GuideLiveReview;

const StContent = styled.div`
    padding: 50px 0;
    box-sizing: border-box;
    color: var(--white);
    display: flex;
    flex-direction: column;
    align-items: center;
    >div{
        display: flex;
        flex-direction: column;
        align-items: center;
        border-bottom: 1px solid var(--gray-3);
        margin-bottom: 50px;
        &:last-of-type{
            border: none;
        }
    }
    div.num{
        width: 40px;
        height: 40px;
        border-radius: 40px;
        border: 3px solid var(--maincolor-1);
        text-align: center;
        margin-bottom: 40px;
        p{
            font-size: 1.7em;
            margin: 0;
            line-height: 40px;
            color:var(--maincolor-1);
            font-weight: 700;
        }
    }
    div.double{
        margin-top: 20px;
    }
    img{
        width: 100%;
        margin-bottom: 20px;
    }
    h2{
        font-weight: 500;
        font-size: 1.5em;
        margin-bottom: 20px;
    }
`