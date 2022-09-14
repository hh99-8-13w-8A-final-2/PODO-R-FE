import React,{ useState } from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useMutation, useQuery, useQueryClient } from "react-query"
import { useLocation } from 'react-router-dom';
import ReviewDetailSlide from './ReviewDetailSlide';
import ReviewDetailEval from './ReviewDetailEval';
import { ReactComponent as Like } from '../../assets/img/like.svg'
import { ReactComponent as Comment } from '../../assets/img/comment.svg'
import ReviewCreate from './ReviewCreate';
import { ToastContainer ,toast } from 'react-toastify';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'

const fetchReviewDetail = (musicalId, reviewsId) => {
    const Authorization = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `${Authorization}`,
    }
    return axios.get(`http://3.39.240.159/api/musicals/${musicalId}/reviews/${reviewsId}`, {headers:headers})
}

const deleteReviews = async(deleteId) => {
    const Authorization = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `${Authorization}`,
    }
    const {musicalId, reviewsId} = deleteId
    const response = await axios.delete(`http://3.39.240.159/api/musicals/${musicalId}/reviews/${reviewsId}`, { headers: headers})
    return response
}

const likeReviews = async(reviewsId) => {
    const Authorization = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `${Authorization}`,
    }
    const response = await axios.post(`http://3.39.240.159/api/hearts?reviewId=${reviewsId}`,{}, { headers: headers})
    return response
}

const unLikeReviews = async(reviewsId) => {
    const Authorization = localStorage.getItem('accessToken');
    const headers = {
        'Content-Type': 'application/json',
        Authorization: `${Authorization}`,
    }
    const response = await axios.delete(`http://3.39.240.159/api/hearts?reviewId=${reviewsId}`,{ headers: headers})
    return response
}

const ReviewDetail = ({ reviewsId, onClose }) => {
    let location = useLocation();
    let musicalId = location.pathname.split('/').splice(3, 1).toString()
    let today = new Date();
    let currentYear = today.getFullYear(); // 년도
    let currentMonth = today.getMonth() + 1;  // 월
    let currentDate = today.getDate();  // 날짜
    let currentHours = today.getHours(); // 시
    let currentMinutes = today.getMinutes();  // 분

    const [ toggle, setToggle ] = useState(false);
    const [ isClick, setIsClick ] = useState(false);
    const { status, data, error } = useQuery(
        ['/ReviewDetail', musicalId, reviewsId],
        () => fetchReviewDetail(musicalId, reviewsId),
        {
            refetchOnWindowFocus: false,
        }
    )
    const MySwal = withReactContent(Swal)
    const queryClient = useQueryClient();
    const deleteId = {
        musicalId: musicalId,
        reviewsId: reviewsId
    }
    const deleteReview = useMutation((deleteId) => deleteReviews(deleteId),{
        onSuccess: () => {
            queryClient.invalidateQueries("reviews")
        }}
    )

    const likeReview = useMutation((reviewsId) => likeReviews(reviewsId),{
        onSuccess: () => {
            queryClient.invalidateQueries("/ReviewDetail")
            queryClient.invalidateQueries("reviews")
        }}
    )

    const unLikeReview = useMutation((reviewsId) => unLikeReviews(reviewsId),{
        onSuccess: () => {
            queryClient.invalidateQueries("/ReviewDetail")
            queryClient.invalidateQueries("reviews")
        }}
    )

    const deleteHandler = () => {
        MySwal.fire({
            title: "정말 삭제하시겠어요?",
            text: "삭제를 하면 되돌릴 수 없어요!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "네",
            cancelButtonText: '아니오'
          }).then((result) => {
            if(result.isConfirmed) {
                deleteReview.mutate(deleteId)
            } 
          })
        onClose()       
    }

    const likeHandler = () => {
        if (!data?.data.heartChecked) {
            likeReview.mutate(reviewsId)
            toast.success("좋아요 +1 ~!", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER
            })
        }else {
            unLikeReview.mutate(reviewsId)
            toast.success("좋아요 취소 ㅜㅜ", {
                autoClose: 3000,
                position: toast.POSITION.TOP_CENTER
            })
        }
    }

    console.log(data)

    const convertToDate = new Date(data?.data.createdAt);
    const createYear = convertToDate.getFullYear();
    const createMonth = convertToDate.getMonth() + 1;
    const createDate = convertToDate.getDate();
    const createHours = convertToDate.getHours();
    const createMinute = convertToDate.getMinutes();

    const year = currentYear - createYear;
    const month = currentMonth - createMonth;
    const date = currentDate - createDate;
    const hours = currentHours - createHours;
    const minutes = currentMinutes - createMinute;

    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }


    return (
        <StReviewDetailBox>
            <ToastContainer/>
            <StSideImgBox>
                <ReviewDetailSlide data={data} isClick={isClick} year={year} month={month} date={date} hours={hours} minutes={minutes} nickname={data?.data.member.nickname}/>
            </StSideImgBox>
            <StInfoDiv>
                <StDetailHeader>
                    <StH3>{data?.data.grade}석 {data?.data.floor} {data?.data.section !== "0" && <>{data.data.section}구역</>} {data.data.row}열 {data.data.seat}</StH3>
                    <StHeaderRight>
                        {toggle ? 
                        <StToggleButtonBox>
                            <StModifyButton>수정</StModifyButton>
                            <button onClick={() => deleteHandler()}>삭제</button>
                        </StToggleButtonBox>
                        :
                        null    
                        }
                        <button>
                            <FontAwesomeIcon icon={faEllipsis} onClick={(() => setToggle(!toggle))}/>
                        </button>
                        <button onClick={onClose}>
                            <FontAwesomeIcon icon={faXmark} />
                        </button>
                    </StHeaderRight>
                </StDetailHeader>
                {isClick ? 
                <ReviewCreate setIsClick={setIsClick} reviewId={data.data.reviewId} onClose={onClose} /> 
                :
                <>
                <StDetailHeaderBottom>
                    <StProfileDiv>
                        <StProfile imgUrl={data?.data.member.profilePic}></StProfile>
                        <StProfileInfo>
                            <StNickName>{data?.data.member.nickname}</StNickName>
                            <StDate>
                                {
                                    year > 0 &&
                                    <span>{currentYear - createYear}년 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month > 0 &&
                                    <span>{currentMonth - createMonth}달 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date > 6 &&
                                    <span>{(currentDate - createDate) / 7}주일 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date > 0 && date < 7 &&
                                    <span>{currentDate - createDate}일 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date === 0 &&
                                    hours > 0 &&
                                    <span>{currentHours - createHours}시간 전 작성</span>
                                }
                                {
                                    year === 0 &&
                                    month === 0 &&
                                    date === 0 &&
                                    hours === 0 &&
                                    minutes >= 0 &&
                                    <span>방금 전 작성</span>
                                }
                            </StDate>
                        </StProfileInfo>
                    </StProfileDiv>
                    <StScoreDiv><StSpan>평점</StSpan><StScore>{data?.data.reviewScore}</StScore></StScoreDiv>
                </StDetailHeaderBottom>
                <ReviewDetailEval data={data}/>
                <StP>
                    {data?.data.reviewContent}
                </StP>
                
                {data?.data.tags[0] !== '' &&
                    <StTagDiv>
                        {data?.data.operaGlass && <div>오페라글라스필수</div>}
                        {data?.data.block && <div>시야방해</div>}
                        {data?.data.tags.map((tag, index) => (
                            <div key={index}>{tag}</div>
                        ))}
                    </StTagDiv>
                }
            </>    
            }
                <StBottomCont>
                        <StBottomLeftDiv>
                            <StThumbDiv imgUrl={data?.data.musical.musicalPoster}></StThumbDiv>
                            <StDl>
                                <dt>{data?.data.musical.musicalName}</dt>
                                <dd>{data?.data.musical.theaterName}</dd>
                                <dd>{data?.data.musical.openDate} ~ {data?.data.musical.closeDate}</dd>
                            </StDl>
                        </StBottomLeftDiv>
                        <StBottomRightDiv>
                            <div onClick={() => likeHandler()}>{data?.data.heartChecked ? <Like fill='#BB63FF'/> : <Like fill='#000'/> }<span>{data?.data.heartCount}</span></div>
                            <div onClick={() => setIsClick(true)}><Comment fill='#000'/><span>{data?.data.commentCount}</span></div>
                        </StBottomRightDiv>
                </StBottomCont>
            </StInfoDiv>
        </StReviewDetailBox>
    );
};

const StReviewDetailBox = styled.div`
    width: 1400px;
    display: flex;
`

const StSideImgBox = styled.div`
    width: 800px;
`

const StInfoDiv = styled.div`
    padding: 30px;
    position: relative;
`

const StDetailHeader = styled.div`
  align-items: center;
  box-sizing: border-box;
  width: 540px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-content: flex-end;
  button {
    border: none;
    border-radius: 10px;
    background-color: var(--white);
    font-size: 1.5em;
    color: var(--gray-2);
    transition: all 0.3s;
    cursor: pointer;
    margin-left: 10px;
    &:hover {
      color: var(--gray-3);
    }
  }
  margin-bottom: 30px;
`;

const StHeaderRight = styled.div`
    display: flex;
    align-items: center;
`

const StToggleButtonBox = styled.div`
    border: 1px solid var(--gray-2);
    border-radius: 5px;
    font-size: 12px;
    button {
        margin: 0;
    }
`

const StModifyButton = styled.button`
    position: relative;
    &::after {
        position: absolute;
        display: block;
        content: '';
        width: 1px;
        height: 15px;
        background-color: var(--gray-2);
        right: 0;
        top: 7px;
    }
`

const StH3 = styled.h3`
    font-size: 18px;
`

const StDetailHeaderBottom = styled.div`
    display: flex;
    justify-content: space-between;
    width: 540px;
    align-items: center;
    margin-bottom: 40px;
`
const StProfileDiv = styled.div`
    display: flex;
    align-items: center;
`

const StProfile = styled.div`
    width: 60px;
    height: 60px;
    border-radius: 30px;
    background: ${props => `url(${props.imgUrl})`};
    background-position: center;
    background-size: cover;
    margin-right: 10px;
`

const StProfileInfo = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const StNickName = styled.span`
    font-weight: bold;
    margin-bottom: 5px;
`

const StDate = styled.span`
    font-size: 12px;
    color: var(--gray-2);
`

const StScoreDiv = styled.div`
    display: flex;
`

const StSpan = styled.div`
    font-size: 14px;
    display: block;
    margin-bottom: 10px;
    font-weight: bold;
`

const StScore = styled.div`
    font-family: 'Inter', sans-serif;
    font-style: italic;
    font-size: 40px;
`

const StP = styled.p`
    margin-top: 40px;
    margin-bottom: 40px;
    text-align: start;
    max-height: 300px;
`
const StTagDiv = styled.div`
    display: flex;
    div {
        border: 1px solid var(--gray-1);
        padding: 6px 16px; 
        border-radius: 20px;
        margin-right: 10px;
    }
`

const StBottomCont = styled.div`
    position: absolute;
    padding: 20px 0px;
    bottom: 0;
    width: 540px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-top: 2px solid var(--gray-1);
`

const StThumbDiv = styled.div`
    width: 40px;
    height: 40px;
    background: ${props => `url(${props.imgUrl})`};
    border-radius: 5px;
    margin-right: 8px;
    background-size: cover;
    background-position: center;
`

const StDl = styled.dl`
    dt {
        width: 250px;
        font-size: 14px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        text-align: left;
        margin-bottom: 4px;
    }
    dd {
        font-size: 10px;
        color: var(--gray-2);
        text-align: left;
    }
`

const StBottomLeftDiv = styled.div`
    display: flex;
    align-items: center;
`

const StBottomRightDiv = styled.div`
    display: flex;
    align-items: center;
    div {
        cursor: pointer;
        display: flex;
        align-items: center;
        svg {
            margin: 0px 5px 0px 10px;
        }
    }
`

export default ReviewDetail;