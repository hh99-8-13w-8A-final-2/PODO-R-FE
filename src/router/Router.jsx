import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import CreatePage from '../pages/CreatePage'
import ReviewPage from '../pages/ReviewPage'
import NotfindPage from '../pages/NotfindPage'
import Kakao from '../components/kakao/Kakao';
import MyPage from '../pages/MyPage';
import Twitter from '../components/kakao/Twitter';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/api/musicals/:musicalsId/reviews/create' element={<CreatePage/>} />
                <Route path='/api/musicals/:musicalsId/reviews' element={<ReviewPage/>} />
                <Route path='/*' element={<NotfindPage/>} />
                <Route path='/mypage/:userId' element={<MyPage/>} />
                <Route path='/oauth/kakao' element={<Kakao/>} />
                <Route path='/oauth/twitter' element={<Twitter/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;