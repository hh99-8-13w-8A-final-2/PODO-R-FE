import axios from 'axios';

const customAxios = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL, // 기본 서버 주소 입력
    headers: {
        "Content-Type": "application/json",
    },
  });

export default customAxios