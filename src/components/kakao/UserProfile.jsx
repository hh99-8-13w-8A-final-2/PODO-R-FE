import React from 'react';
import styled from 'styled-components';
import { Buffer } from "buffer";

const UserProfile = () => {

    const accessToken = localStorage.getItem("accessToken");
    const encodeBody = accessToken.split(".")[1];
    const decodeBody = Buffer.from(encodeBody, "base64").toString("utf8");
    const jsonBody = JSON.parse(decodeBody);
    console.log(jsonBody)








    return (
        <StDiv>
            <div>
            
            </div>









        </StDiv>
    );
};

export default UserProfile;

const StDiv = styled.div`
    width: 1400px;
    height: 300px;
    display: flex;
    align-content: center;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    /* background-color: pink; */
    div {
        width: 300px;
        height: 150px;
        border: 1px solid black;
        background-color: white;
    }
`