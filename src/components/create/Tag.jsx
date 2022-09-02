import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


const Tag = () => {
    const [tagList, setTagList] =useState([]);

    const handelKeyDown = (e) =>{
        if(e.keyCode !== 32) return
        const value = e.target.value
        if(!value.trim())return
        setTagList([...tagList, value])
        e.target.value = ''
    }

    const removeTag = (index)=>{
        setTagList(tagList.filter((el, i) => i !== index))
    }

    return (
        <StTagDiv>
            {/* <div className='tagObject'>
                <span>hello</span>
                <span><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></span>
            </div> */}
            {tagList.map((tag, index) => (
                <div className='tagObject'>
                    <span key={index}>{tag}</span>
                    <span onClick={()=>removeTag(index)}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></span>
                </div>
            ))}
            <input onKeyDown={handelKeyDown} type="text" name='tag' placeholder='스페이스바를 눌러 태그를 입력하세요.'/>
        </StTagDiv>
    );
};

export default Tag;

const StTagDiv = styled.div`
    margin-top: 20px;
    background-color: var(--gray-3);
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    
    .tagObject{
        background-color: var(--black);
        border: 1px solid var(--gray-2);
        color: var(--gray-2);
        display: inline-block;
        padding: 8px 15px;
        border-radius: 20px;
        margin-left: 5px;
        >span:first-of-type{
         line-height: 20px;
        }
        >span:first-of-type::before{
            content: '#';
        }
        >span:last-of-type{
            color: var(--white);
            margin-left: 8px;
            background-color: var(--gray-3);
            padding: .04em .4em;
            border-radius:20px ;
            font-size: 14px;
            transition: all .3s;
            cursor: pointer;
            &:hover{
                background-color:var(--gray-2);
            }
        }
    }
    input {
        flex-grow: 1;
        outline: none;
    }
`