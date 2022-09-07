import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import CreatePage from '../pages/CreatePage'
import ReviewPage from '../pages/ReviewPage'
import NotfindPage from '../pages/NotfindPage'
import Kakao from '../components/kakao/Kakao';
import MyPage from '../pages/MyPage';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/create' element={<CreatePage/>} />
                <Route path='/api/musicals/:musicalsId/reviews' element={<ReviewPage/>} />
                <Route path='/*' element={<NotfindPage/>} />
                <Route path='/api/mypage/:userId' element={<MyPage/>} />
                <Route path='/oauth/kakao' element={<Kakao/>} />
                {/* <Route path='/oauth/twitter' element={<Twiter/>} /> */}
            </Routes>
        </BrowserRouter>
    );
};

export default Router;