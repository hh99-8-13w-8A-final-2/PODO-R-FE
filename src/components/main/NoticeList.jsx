import React,{ useState } from 'react';
import Notice from './Notice';
import Event from './Event';
import styled from 'styled-components';
import apis from '../../apis/apis';
import { useQuery } from 'react-query'
import pageRigth from '../../assets/img/pageRight.svg'
import pageLeft from '../../assets/img/pageLeft.svg'


const fetchNotice = pageNumber => {
    return apis.getFetchNotice(pageNumber)
}

const NoticeList = () => {
    const [pageNumber, setPageNumber] = useState(1)
    const { isLoading, isError, error, data } = useQuery(
        // Array Keys with variables
        // 각각의 pageNumber마다 다른 데이터를 가져와야 함
        ['notice', pageNumber],
        () => fetchNotice(pageNumber),
        {
            staleTime: 1000,
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
                            title={"이전 페이지"}
                        ><span>Prev Page</span>
                        </StButtonLeft>
                        <StNumDiv>{pageNumber}/{data?.data.totalPages}</StNumDiv>
                        <StButtonRight
                            onClick={() => setPageNumber(page => page + 1)}
                            disabled={pageNumber === data?.data.totalPages}
                            pageRigth={pageRigth}
                            title={"다음 페이지"}
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
    @media (max-width: 763px){
        width: 100%;
    }
`

const StCont = styled.div`
    display: flex;
    justify-content: space-between;
    @media (max-width: 763px){
        flex-direction: column;
    }
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