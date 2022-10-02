import { useInfiniteQuery } from "react-query";
import { useMutation, useQueryClient } from "react-query"
import React, { useEffect, useState} from 'react';
import styled from 'styled-components';
import { ReactComponent as TextIcon } from '../../assets/img/textIcon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import apis from '../../apis/apis';
import { useForm } from "react-hook-form"
import { toast } from 'react-toastify';
import { useInView } from "react-intersection-observer";
import moment from 'moment'

const getComments = async (reviewId, pageParam) => {
    /* const response = await axios.get(`${URI.BASE}/api/comments?reviewId=${reviewId}&page=${pageParam}`); */
    const response = await apis.getComment(reviewId, pageParam)
    const data = response.data.content;
    const pageData = response.data.totalPages;
    const total = response.data.totalElements
    return {
        data,
        nextPage: pageParam + 1,
        pageData,
        total
    }
}

const postModifyedComment = async (new_comment) => {
    const { modifyId, content } = new_comment
    return await apis.putModifyedComment(modifyId, content)
    .then(() => {
        toast.success("수정이 완료되었습니다", {
            icon:"🔨",
            autoClose: 500,
            position: toast.POSITION.TOP_RIGHT,
        })
    }) 
    .catch(() => {
        toast.error("댓글 수정이 실패했습니다. 글자 수를 확인해 보세요(255자 이하)", {
            icon: "✍️",
            autoClose: 500,
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored"
        })
    })
}

const deleteComment = async (commentId) => {
    return await apis.deleteComment(commentId)
}


const ReviewCreateList = ({ setIsClick, reviewId }) => {
    const [id, setId] = useState('');
    const [modifyId, setModifyId] = useState('');
    const [toggle, setToggle] = useState(false);
    const userId = parseInt(localStorage.getItem('userId'))
    const { ref, inView } = useInView();

    const { data, hasNextPage, fetchNextPage, isFetchingNextPage, status, error } =
        useInfiniteQuery(
            ["comments", reviewId],
            ({ pageParam = 1 }) => {
                return getComments(reviewId, pageParam)
            },
            {
                refetchOnWindowFocus: false,
                getNextPageParam: (_lastPage, pages) => {
                    if (pages.length < pages[0].pageData) {
                        return pages.length + 1
                    } else {
                        return undefined
                    }
                }
            }
        )
    
    console.log(data)
        

    useEffect(() => {
        if (inView) fetchNextPage();
    }, [inView]);

    // 유효성 검사
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const black_pattern = /^\s+|\s+$/g;
    const isBlank = (value) => (
        value.replace(black_pattern, '') === "" ? false : true
    )

    // 수정,삭제 mutation
    const queryClient = useQueryClient()
    const modifyMutation = useMutation(postModifyedComment, {
        onSuccess: () => {
            queryClient.invalidateQueries("comments")
        }
    })
    const deleteMutation = useMutation((commentId) => deleteComment(commentId), {
        errorPolicy: "ignore",
        onSuccess: () => {
            queryClient.invalidateQueries("comments")
        }
    })

    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }

    // 이벤트 핸들러
    const toggleHandler = (commentId) => {
        setId(commentId);
        setToggle(!toggle);
        setModifyId('');
    }

    const onSubmit = (data) => {
        const modify_comment = {
            content: data.modify,
            modifyId: modifyId,
        }
        modifyMutation.mutate(modify_comment)
        setToggle(!toggle)
        reset({ modify: "" })
    }

    const deleteHandler = (commentId) => {
        deleteMutation.mutate(commentId)
        toast.success("댓글 삭제되었습니다", {
            icon:"✂️",
            autoClose: 500,
            position: toast.POSITION.TOP_RIGHT,
            theme:"dark"
        })
    }



    return (
        <StCommentBox>
            <StListHeader>
                <div>댓글 {data.pages[0].total}</div>
                <StToggleDiv onClick={() => setIsClick(false)}>
                    <TextIcon fill='#BB63FF' />
                    <span>본문보기</span>
                </StToggleDiv>
            </StListHeader>
            <StListWrap>
            {data?.pages.map((group, i) => {
                return (
                    <StCommentList key={i} className="StCommentList">
                        {group.data.map((comment) => {
                            const changeToDate = (datetime) => {
                                // 오늘 날짜
                                let now = moment(new Date())
                                // 오늘과의 시간 차이
                                let duration = moment.duration(now.diff(datetime))
                                // 변환
                                // asSeconds 를 하면 오늘과의 시간차이를 
                                // 초단위로 float datatype 으로 보여준다 (3.82 이런식)
                                let seconds = duration.asSeconds()
                                let minute = duration.asMinutes()
                                let hours = duration.asHours()
                                let days = duration.asDays()
                                let weeks = duration.asWeeks()
                                let month = duration.asMonths()
                                let year = duration.asYears()
                                
                                // 그래서 사용할 때는 parseInt 를 사용해 int 로 바꿔야 한다. 
                                if (minute < 1) {
                                    // 1분 미만이면 초 단위로 보여주고,  
                                return parseInt(seconds) + '초 전'
                                } else if (hours < 1) {
                                // 1시간 미만이면 분 단위로 보여주고
                                return parseInt(minute) + '분 전'
                                } else if (hours < 24) {
                                // 하루 미만이면 시간으로 보여주고
                                return parseInt(hours) + '시간 전'
                                } else if (weeks < 1) {
                                // 일주일 미만이면 일 단위로 보여주고
                                return parseInt(days) + '일 전'
                                } else if (month < 1) {
                                // 한 달 미만이면 주 단위로 보여주고
                                return parseInt(weeks) + '주 전'
                                } else if (year < 1) {
                                // 1년 미만이면 달 단위로 보여주고
                                return parseInt(month) + '달 전'
                                } else {
                                // 1년 이상이면 넌 단위로 보여주고
                                return parseInt(year) + '년 전'
                                }
                            }
                            return (
                                <StDiv key={comment.commentId}>
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <StCommentHeaderContainer>
                                            <StCommentHeader>
                                                <StUserImg imgUrl={comment.profilePic}></StUserImg>
                                                <dl>
                                                    <StNameDt>{comment.nickname}</StNameDt>
                                                    <StDateDd>
                                                        {changeToDate(comment.createdAt)}
                                                    </StDateDd>
                                                </dl>
                                            </StCommentHeader>
                                            <StButtonDiv>
                                                {(id === comment.commentId) && toggle ?
                                                    <StButtonToggleDiv>
                                                        {modifyId === comment.commentId ?
                                                            <button>완료</button>
                                                            :
                                                            <button onClick={() => setModifyId(comment.commentId)} type="button" key="notsubmit">수정</button>}
                                                        {modifyId === comment.commentId ?
                                                            <button onClick={() => setModifyId('')} type='button'>취소</button>
                                                            :
                                                            <button type='button' onClick={() => deleteHandler(comment.commentId)}>삭제</button>
                                                        }
                                                    </StButtonToggleDiv>
                                                    :
                                                    null
                                                }
                                                {(comment.memberId === userId) ?
                                                    <StButton onClick={() => toggleHandler(comment.commentId)} type='button'>
                                                        <FontAwesomeIcon icon={faEllipsis} />
                                                    </StButton>
                                                    :
                                                    null
                                                }
                                            </StButtonDiv>
                                        </StCommentHeaderContainer>
                                        {(modifyId === comment.commentId) && toggle ?
                                            <StCommentContDiv>
                                                <StModifyInput
                                                    type="text"
                                                    placeholder='수정할 내용을 입력하세요(225자 이하)'
                                                    {...register("modify", { required: true, validate: value => isBlank(value) })}

                                                />
                                                {errors.modify && errors.modify.type === "required" && <StValidateP>댓글 내용을 입력해 주세요~</StValidateP>}
                                                {errors.modify && errors.modify.type === "validate" && <StValidateP>공백만 입력되었어요!</StValidateP>}
                                            </StCommentContDiv>
                                            :
                                            <StCommentContDiv>
                                                <p>{comment.content}</p>
                                            </StCommentContDiv>
                                        }
                                    </form>
                                </StDiv>
                            )
                        })}
                    </StCommentList>
                )
            })}
            <StObserverDiv ref={ref}>
                {isFetchingNextPage && "Loading more..."}
                {data.pages[0].total === 0 && "아직 댓글이 없네요"}
                {data.pages[0].total !== 0 && !hasNextPage && "더이상 댓글이 없네요"}
            </StObserverDiv>
            </StListWrap>
        </StCommentBox>
    );
};
const StCommentBox = styled.div`
    width: 100%;
    height: 600px;
`

const StListHeader = styled.div`
    margin-top: 25px;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    div {
        display: flex;
        align-items: center;
    }

`

const StToggleDiv = styled.div`
    cursor: pointer;
`
const StListWrap = styled.div`
    max-height: 500px;
    overflow-y: scroll;
    width: 100%;
`

const StCommentList = styled.div`
`

const StDiv = styled.div`
    border-top: 1px solid var(--gray-1);
    padding: 20px 0px;
    display: flex;
    width: 100%;
    flex-direction: column;
`

const StCommentHeaderContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`

const StButtonDiv = styled.div`
    display: flex;
    align-items: center;
`

const StButtonToggleDiv = styled.div`
    font-size: 12px;
    border: 1px solid var(--gray-2);
    border-radius: 5px;
    & :first-of-type {
        position: relative;
    }
    & :first-of-type::after {
        position: absolute;
        display: block;
        content: '';
        width: 1px;
        height: 15px;
        background-color: var(--gray-2);
        right: 0;
        top: 7px;
    }
    button {
        background: none;
        border: none;
        padding: 5px;
        cursor: pointer;
        color: var(--gray-2);
        transition: all 0.3s;
        cursor: pointer;
        &:hover {
        color: var(--gray-3);
        }
    }
`

const StCommentHeader = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 5px;
`


const StUserImg = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 20px;
    background-color: var(--gray-1);
    margin-right: 10px;
    background: ${props => `url(${props.imgUrl})`};
    background-size: cover;
    background-position: center;
`
const StNameDt = styled.dt`
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 5px;
`

const StDateDd = styled.dd`
    font-size: 10px;
    text-align: left;
`

const StButton = styled.button`
    border: none;
    border-radius: 10px;
    background-color: var(--white);
    font-size: 1.2em;
    color: var(--gray-2);
    transition: all 0.3s;
    cursor: pointer;
    margin-left: 10px;
    &:hover {
    color: var(--gray-3);
    }
`

const StCommentContDiv = styled.div`
    padding-left: 50px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    p {
        text-align: left;
        font-size: 14px;
        width: 90%;
        word-break:break-all;
    }
`
const StValidateP = styled.p`
    color: red;
`

const StModifyInput = styled.input`
    display: block;
    background-color: #eee;
    width: 90%;
    margin-bottom: 10px;
`
const StObserverDiv = styled.div`
    padding: 10px;
    color: var(--gray-1);
`

export default ReviewCreateList;