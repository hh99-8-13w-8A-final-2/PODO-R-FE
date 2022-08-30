import React from 'react';
import { Route, Routes, BrowserRouter } from 'react-router-dom'
import MainPage from '../pages/MainPage'
import CreatePage from '../pages/CreatePage'
import ReviewPage from '../pages/ReviewPage'
import NotfindPage from '../pages/NotfindPage'

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<MainPage/>} />
                <Route path='/create' element={<CreatePage/>} />
                <Route path='/reviews' element={<ReviewPage/>} />
                <Route path='/*' element={<NotfindPage/>} />
            </Routes>
        </BrowserRouter>
    );
};

export default Router;