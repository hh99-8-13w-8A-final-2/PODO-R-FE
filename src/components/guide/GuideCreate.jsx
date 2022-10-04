import React, { useEffect } from 'react';
import styled from 'styled-components';

const GuideCreate = () => {

    useEffect(() => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })
    }, [])


    const img1 = 'https://podoal-front.s3.ap-northeast-2.amazonaws.com/static/media/guide+(4).webp'
    const img2 = 'https://podoal-front.s3.ap-northeast-2.amazonaws.com/static/media/guide+(5).webp'
    const img3 = 'https://podoal-front.s3.ap-northeast-2.amazonaws.com/static/media/guide+(6).webp'

    return (
        <StContent>
            <div className='section1'>
                <div className='num'><p>1</p></div>
                <h2>공연 목록에서 리뷰를 작성할 공연 선택</h2>
                <img src={img1} alt="" />
            </div>
            <div className='section2'>
                <div className='num'><p>2</p></div>
                <h2>쓰기 플로팅 버튼을 통해 리뷰 작성 페이지로 이동</h2>
                <img src={img2} alt="" />
            </div>
            <div className='section3'>
                <div className='num'><p>3</p></div>
                <h2>좌석 정보, 항목별 평가 등 리뷰할 내용 입력</h2>
                <div className='num double'><p>4</p></div>
                <h2>파일 업로드를 통해 사진 업로드</h2>
                <p>*사진 업로드 시 저작권 및 초상권에 유의하여 업로드하여 주시길 바랍니다.</p>
                <div className='num double'><p>5</p></div>
                <h2>등록 버튼을 클릭하여 리뷰 등록 완료!</h2>
                <p>*이미지는 총 4장만 입력이 가능하며, 앞에 (<span className='error'>*</span>) 표시가 있다면 필수로 입력하셔야합니다.</p>
                <img src={img3} alt="" />
            </div>
        </StContent>
    );
};

export default GuideCreate;


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
    div p{
        color:var(--gray-2)
    }
`