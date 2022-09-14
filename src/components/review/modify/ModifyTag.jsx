import React, {useEffect} from 'react';
import styled from 'styled-components';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ModifyTag = ({ setTagList, tagList, data }) => {
    useEffect(()=>{
        for(var i in data?.data.tags){
            tagList.push(data?.data.tags[i])
        }
    },[])

    const handelKeyDown = (e) => {
        if (e.keyCode !== 32) return
        const value = e.target.value
        if (!value.trim()) return
        setTagList([...tagList, value])
        e.target.value = ''
    }
    const removeTag = (index) => {
        setTagList(tagList.filter((el, i) => i !== index))
    }
    return (
        <div>
            <h4>태그 입력</h4>
            <StTagDiv>
                <input onKeyDown={handelKeyDown} type="text" placeholder='스페이스바를 눌러 태그를 입력하세요.' />
            </StTagDiv>
            <StTagDiv>
                {tagList.map((tag, index) => (
                    <div key={tag} className='tagObject'>
                        <span key={tag}>{tag}</span>
                        <span onClick={() => removeTag(index)}><FontAwesomeIcon icon={faXmark}></FontAwesomeIcon></span>
                    </div>
                ))}
            </StTagDiv>
        </div>
    )
};

export default ModifyTag;


const StTagDiv = styled.div`
    margin-top: 10px;
    border-radius: 8px;
    display: flex;
    flex-wrap: wrap;
    gap:2px;
    
    .tagObject{
        background-color: var(--white);
        border: 1px solid var(--gray-1);
        color: var(--gray-2);
        display: inline-block;
        padding: 8px 15px;
        border-radius: 20px;
        margin-left: 5px;
        margin-top: 5px;
        >span:first-of-type{
         line-height: 20px;
         cursor: pointer;
        }
        >span:first-of-type::before{
            content: '#';
        }
        >span:last-of-type{
            color: var(--white);
            margin-left: 8px;
            background-color: var(--gray-1);
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
        background-color: var(--white);
    }
`