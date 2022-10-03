import React from 'react';
import styled from 'styled-components';
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
import apis from '../../apis/apis';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"

const postComment = async(new_comment) => {
    const { reviewId, content } = new_comment
    await apis.postComment(reviewId, content)
    .then(() => {
        toast.success("댓글이 등록되었습니다", {
            icon: "✍️",
            autoClose: 500,
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored"
        })
    })
    .catch(() => {
        toast.error("댓글 등록에 실패했습니다. 글자 수를 확인해 보세요(255자 이하)", {
            icon: "✍️",
            autoClose: 500,
            position: toast.POSITION.TOP_RIGHT,
            theme: "colored"
        })
    })
  }

const ReviewCreateForm = ({ reviewId }) => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const black_pattern = /^\s+|\s+$/g;
    const isBlank = (value) => (
        value.replace(black_pattern, '') === "" ? false : true
    )
    const userId = parseInt(localStorage.getItem('userId'))

    const queryClient = useQueryClient()
    const { mutate } = useMutation(postComment, {
        onSuccess: () => {
            queryClient.invalidateQueries("comments")
            queryClient.invalidateQueries("reviews")
            queryClient.invalidateQueries("/ReviewDetail")
        }
    })


    const onSubmit = (data) => {
        const new_comment = {
            content: data.comment,
            reviewId: reviewId,
        }
        if (!userId) {
            toast.error("로그인 해주세요", {
                icon: "🙏",
                autoClose: 500,
                position: toast.POSITION.TOP_CENTER,
                theme: "colored"
            })
        }else {
            mutate(new_comment)
        }
        reset({ comment: " " })
    }



    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <StDiv>
                    <div>
                        <StInput
                            type="text" 
                            placeholder='댓글을 입력하세요(255자 이하)'
                            {...register("comment", { required: true, validate: value => isBlank(value) })}
                        />
                        {errors.comment && errors.comment.type === "required" && <p>댓글 내용을 입력해 주세요~</p>}
                        {errors.comment && errors.comment.type === "validate" && <p>공백만 입력되었어요!</p>}
                    </div>
                    <StButton>등록하기</StButton>
                </StDiv>
            </form>
        </>
    );
};

const StDiv = styled.div`
    display: flex;
    width: 100%;
    align-items: flex-start;
    justify-content: space-between;
    div {
        display: flex;
        width: 100%;
        flex-direction: column;
        p {
            text-align: left;
            color: red;
            margin-top: 10px;
            font-size: 14px;
        }
    }

`

const StInput = styled.input`
    width: 95%;
    height: 37px;
    background-color: #eee;
    margin-right: 4px;
    @media screen and (max-width: 763px) {
        width: 95%;
    }
`

const StButton = styled.button`
    width: 69px;
    font-size: 12px;
    border-radius: 10px;
    height: 36px;
    border: 1px solid var(--gray-2);
    background: none;
    cursor: pointer;
    color: var(--gray-2);
    transition: all 0.3s;
    &:hover {
        color: var(--gray-3);
    }
`

export default ReviewCreateForm;