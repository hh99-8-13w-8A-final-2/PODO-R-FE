import React,{ useEffect, useState } from 'react';
import Notice from './Notice';
import Event from './Event';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from 'react-query'
import pageRigth from '../../assets/img/pageRight.svg'
import pageLeft from '../../assets/img/pageLeft.svg'

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
                    <div>
                        <StButtonLeft
                            onClick={() => setPageNumber(page => page - 1)}
                            disabled={pageNumber === 1}
                            pageLeft={pageLeft}
                        ><span>Prev Page</span>
                        </StButtonLeft>
                        <StNumDiv>{pageNumber}/3</StNumDiv>
                        <StButtonRight
                            onClick={() => setPageNumber(page => page + 1)}
                            disabled={pageNumber === 3}
                            pageRigth={pageRigth}
                        ><span>Next Page</span>
                        </StButtonRight>
                    </div>
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
        display: flex;
        align-items: center;
        justify-content: center;
    }
`

const StCont = styled.div`
    display: flex;
    justify-content: space-between;
`

const StButtonLeft = styled.button`
    width: 20px;
    height: 20px;
    background: ${props => `url(${props.pageLeft})`} no-repeat center transparent ;
    border: none;
    cursor: pointer;
    span {
        display: none;
    }
`

const StButtonRight = styled.button`
    width: 20px;
    height: 20px;
    background: ${props => `url(${props.pageRigth})`} no-repeat center transparent ;
    border: none;
    cursor: pointer;
    span {
        display: none;
    }
`

const StNumDiv = styled.div`
    width: 40px;

`

export default NoticeList;