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
        let sockJs = new SockJS("연결할 uri")
        let subscription;
        stompClient.current = webstomp.over(sockJs)
        stompClient.current.connect({}, function() {
            setLoading(true);
            const liveReview = async() => {
                const res = await axios.get("연결할 uri")
                SetReviewList(res.data)
            }
            liveReview();
            setLoading(false);
            subscription = stompClient.current.subscribe(
                "연결할 uri",
                function (fram) {
                    
                }
            )
        })
    },[])

    // stomp_client.connect({}, function() {
    //   // 콜백 함수 이 콜백함수를 통해 서버 연결 후 취할 다양한 액션을 넣어 줄 수 있다.  
    // })

    // stomp_client.subscribe(`/join/room/1`, function(fram) {
    //     // 메세지를 수신 받을 때마다 해당 콜백함수가 실행
    // }, {})

    // stomp_client.subscribe(`/join/room/1`, function(fram) {

    // }, {}).unsubscribe()  // 구독 끊을 때


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