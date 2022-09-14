import React from 'react';
import styled from 'styled-components';


const Notice = ({isloading, isError, error, data }) => {
    if(isloading) {
        return <h2>Loading ...</h2>
    }
    if (isError) {
        return <h2>{error.message}</h2>
      } 

    return (
        <ul>
            {data?.data.content.map(notice => (
                <StLi key={notice.noticeId}><StCont>{notice.title}</StCont><StDate>{notice.createdAt.slice(0,10)}</StDate></StLi>
            ))}
        </ul>
    );
};

const StLi = styled.li`
    color: var(--white);
    font-size: 16px;
    display: flex;
    justify-content: space-between;
    width: 690px;
    cursor: pointer;
`

const StCont = styled.span`
    width: 400px;
    display: inline-block;
    padding: 10px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`

const StDate = styled.span`
    padding: 10px;
`

export default Notice;