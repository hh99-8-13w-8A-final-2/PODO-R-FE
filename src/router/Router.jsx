import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import CreatePage from '../pages/CreatePage'
import ReviewPage from '../pages/ReviewPage'
import NotfindPage from '../pages/NotfindPage'
import Kakao from '../components/kakao/Kakao';
import MyPage from '../pages/MyPage';
import Twitter from '../components/kakao/Twitter';
import GuidePage from '../pages/GuidePage';
import MainLayout from './MainLayout';
import MypageLayout from './MypageLayout';
import ReviewLayout from './ReviewLayout';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<MainLayout/>}>
                    <Route path='/' element={<MainPage/>} />
                    <Route path='/*' element={<NotfindPage/>} />
                    <Route path='/oauth/kakao' element={<Kakao/>} />
                    <Route path='/oauth/twitter' element={<Twitter/>} />
                    <Route path='/guide' element={<GuidePage/>} />
                </Route>
                <Route element={<ReviewLayout/>}>
                    <Route path='/musicals/:musicalsId/reviews/create' element={<CreatePage/>} />
                    <Route path='/musicals/:musicalsId/reviews' element={<ReviewPage/>} />
                </Route>
                <Route element={<MypageLayout/>}>
                    <Route path='/mypage/:userId' element={<MyPage/>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;