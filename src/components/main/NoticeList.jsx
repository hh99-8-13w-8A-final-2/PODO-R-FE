import React,{ useEffect, useState } from 'react';
import Notice from './Notice';
import Event from './Event';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from 'react-query'

const fetchNotice = pageNumber => {
    return axios.get(`http://localhost:3001/notice?_limit=3&_page=${pageNumber}`)
}

const NoticeList = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const { isLoading, isError, error, data } = useQuery(
        ['notice', pageNumber],
        () => fetchNotice(pageNumber),
        {
            keepPreviousData: true
        }
    )


    return (
        <StCont>
            <div>
                <StDiv>
                    <h3>공지사항</h3>
                    <button
                        onClick={() => setPageNumber(page => page - 1)}
                        disabled={pageNumber === 1}
                    >Prev Page
                    </button>
                    <button
                        onClick={() => setPageNumber(page => page + 1)}
                        disabled={pageNumber === 3}
                    >
                    Next Page
                    </button>
                </StDiv>
                <Notice 
                    isLoading={isLoading} 
                    isError={isError}
                    error={error}
                    data={data}
                    />
            </div>
            <div>
                <Event/>
            </div>
        </StCont>
    );
};

const StDiv = styled.div`
    color: var(--white);
    width: 690px;
    display: flex;
    justify-content: space-between;
    box-sizing: border-box;
    padding: 20px 10px;
    h3 {
        font-size: 18px;
    }
    div {
        font-size: 16px;
    }
`

const StCont = styled.div`
    display: flex;
    justify-content: space-between;
`

export default NoticeList;