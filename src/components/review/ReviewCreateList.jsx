import axios from 'axios';
import { useQuery } from "react-query";
import React from 'react';
import styled from 'styled-components';
import { ReactComponent as TextIcon } from '../../assets/img/textIcon.svg'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsis } from '@fortawesome/free-solid-svg-icons';
import { ToastContainer, toast } from 'react-toastify';

const getComments = async () => {
    const { data } = await axios.get("http://localhost:3001/comments");
    return data
}

const ReviewCreateList = ({ setIsClick }) => {
    const { status, data, error } = useQuery("comments", getComments, { refetchOnWindowFocus: false })

    if (status === 'loading') { return <h2>Loading...</h2> }
    if (status === 'error') { return <h2>Error: {error.message}</h2> }

    const notify = () => {
        toast("wow so easy!");
        toast.success("Success Notification !", {
            position: toast.POSITION.TOP_CENTER
        });

        toast.error("Error Notification !", {
            position: toast.POSITION.TOP_LEFT
        });

        toast.warn("Warning Notification !", {
            position: toast.POSITION.BOTTOM_LEFT
        });

        toast.info("Info Notification !", {
            position: toast.POSITION.BOTTOM_CENTER
        });

        toast("Custom Style Notification with css class!", {
            position: toast.POSITION.BOTTOM_RIGHT,
            className: 'foo-bar'
        });
    }

    return (
        <div>
            <StListHeader>
                <div>댓글 4</div>
                <StToggleDiv onClick={() => setIsClick(false)}>
                    <TextIcon />
                    <span>본문보기</span>
                </StToggleDiv>
            </StListHeader>
            <StCommentList>
                {data?.map((comment) => (
                    <StDiv key={comment.id}>
                        <div>
                            <StCommentHeader>
                                <StUserImg></StUserImg>
                                <dl>
                                    <StNameDt>{comment.author}</StNameDt>
                                </dl>
                            </StCommentHeader>
                            <button onClick={notify}>
                                <FontAwesomeIcon icon={faEllipsis} />
                            </button>
                        </div>
                        <StCommentContDiv>
                            <p>{comment.content}</p>
                        </StCommentContDiv>
                    </StDiv>
                ))}
            </StCommentList>
        </div>
    );
};

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

const StCommentList = styled.div`
    max-height: 500px;
    overflow: scroll;
    overflow-x: hidden;
`

const StDiv = styled.div`
    border-top: 1px solid var(--gray-1);
    padding: 20px 0px;
    display: flex;
    flex-direction: column;
    div {
        display: flex;
        justify-content: space-between;
        align-items: center;
        button {
            border: none;
            background: none;
            cursor: pointer;
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

const StCommentContDiv = styled.div`
    padding-left: 50px;
    p {
        text-align: left;
        font-size: 14px;
        width: 434px;
    }
`

export default ReviewCreateList;