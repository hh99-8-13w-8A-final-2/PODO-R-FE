import React,{ useEffect, useState } from 'react';
import Notice from './Notice';
import Event from './Event';
import styled from 'styled-components';
import axios from 'axios';

export interface INotice {
    id: number;
    contents: string;
    date: string;
  }

const NoticeList = () => {
    const [loading, setLoading] = useState(false)
    const [notice, setNotice] = useState<INotice[]>([])

    useEffect(() => {
        const fetchNotice = async () => {
            setLoading(true)
            const res = await axios.get<INotice[]>("http://localhost:3001/notice")
            setNotice(res.data)
            setLoading(false)
        }
        fetchNotice();
    }, [])



    return (
        <StCont>
            <div>
                <StDiv>
                    <h3>공지사항</h3>
                    <div>더보기</div>
                </StDiv>
                <Notice loading={loading} notice={notice}/>
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