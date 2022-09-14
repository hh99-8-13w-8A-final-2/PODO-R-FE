import React,{ useEffect, useState } from 'react';
import Notice from './Notice';
import Event from './Event';
import styled from 'styled-components';
import axios from 'axios';
import { useQuery } from 'react-query'
import pageRigth from '../../assets/img/pageRight.svg'
import pageLeft from '../../assets/img/pageLeft.svg'

const URI = {
    BASE : process.env.REACT_APP_BASE_URI
  }

const fetchNotice = pageNumber => {
    return axios.get(`${URI.BASE}/api/notices?size=4&page=${pageNumber}`)
}

const NoticeList = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const { isLoading, isError, error, data } = useQuery(
        // Array Keys with variables
        // 각각의 pageNumber마다 다른 데이터를 가져와야 함
        ['notice', pageNumber],
        () => fetchNotice(pageNumber),
        {
            keepPreviousData: true,
            refetchOnWindowFocus: false
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
                        <StNumDiv>{pageNumber}/{data?.data.totalPages}</StNumDiv>
                        <StButtonRight
                            onClick={() => setPageNumber(page => page + 1)}
                            disabled={pageNumber === data?.data.totalPages}
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