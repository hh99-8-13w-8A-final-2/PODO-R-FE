import React, { lazy, Suspense } from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import Twitter from '../components/kakao/Twitter';
import Kakao from '../components/kakao/Kakao';
import MainLayout from './MainLayout';
import MypageLayout from './MypageLayout';
import ReviewLayout from './ReviewLayout';

const MainPage = React.lazy(()=> import('../pages/MainPage'))
const CreatePage = React.lazy(()=> import('../pages/CreatePage'))
const ReviewPage = React.lazy(()=> import('../pages/ReviewPage'))
const NotfindPage = React.lazy(()=> import('../pages/NotfindPage'))
const MyPage = React.lazy(()=> import('../pages/MyPage'))
const GuidePage = React.lazy(()=> import('../pages/GuidePage'))

const Router = () => {
    return (
        <BrowserRouter>
            <Suspense fallback={<div> Loading...</div>}>
                <Routes>
                    <Route element={<MainLayout/>}>
                        <Route path='/' element={<MainPage/>}/>
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
            </Suspense>
        </BrowserRouter>
    );
};

export default Router;