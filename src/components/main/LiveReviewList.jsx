import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import LiveReview from './LiveReview';
import webstomp from 'webstomp-client';
import SockJS from 'sockjs-client';
import axios from 'axios';

const LiveReviewList = () => {
    const [loading, setLoading] = useState(false);
    const [reviewList, SetReviewList] = useState([])
    let stompClient = useRef(null)

    useEffect(() => {
        let sockJs = new SockJS("http://3.39.240.159/live")
        let subscription;
        stompClient.current = webstomp.over(sockJs)
        stompClient.current.connect({}, function() {
            setLoading(true);
            const liveReview = async() => {
                const res = await axios.get("http://3.39.240.159/api/reviews/live")
                SetReviewList(res.data)
                console.log(res.data)
            }
            liveReview();
            setLoading(false);
            subscription = stompClient.current.subscribe(
                "/sub/reviews",
                function (fram) {
                    SetReviewList(reviewList => [...reviewList, JSON.parse(fram.body)].slice(1))
                    console.log(fram.body)
                }
            )
        }, 
        );
    },[])

    return (
        <StReviewBox>
            <StH3>LivePodo</StH3>
            <LiveReview loading={loading} reviewList={reviewList}/>
        </StReviewBox>
    );
};

const StReviewBox = styled.div`
`

const StH3 = styled.h3`
    font-size: 18px;
    color: var(--white);
    padding: 20px 10px;
`


export default LiveReviewList;