import React from 'react';
import styled from "styled-components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import Modify from './modify/Modify';


const ReviewModify = ({ onClose, setModify, data }) => {
    return (
        <StDiv>
            <div className='header'>
                <h3>{data?.data.grade}석 {data?.data.floor} {data?.data.section !== "0" && <>{data.data.section}구역</>} {data.data.row}열 {data.data.seat}</h3>
                <button onClick={onClose}>
                    <FontAwesomeIcon icon={faXmark} />
                </button>
            </div>
            <Modify data={data} setModify={setModify}/>
        </StDiv>
    );
};

export default ReviewModify;

const StDiv = styled.div`
    width: 175%;
    height: 800px;
    padding: 30px;
    box-sizing: border-box;
    background-color: var(--white);
    border-radius: 10px;
    overflow: scroll;
    .header {
        display: flex;
        justify-content: space-between;
        h3{font-size: 18px; }
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
    }
`