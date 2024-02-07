import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import ResponsiveAppBar from '../../Components/Navbar'
import Home from '../../Screens/Home/Home'
import Login from '../../Screens/Login/Login'
import Register from '../../Screens/Register/Register'
import ProtectedRoutes from './ProtectedRoutes'
const Router = () => {
    return (
        <BrowserRouter>
            <ResponsiveAppBar />
            <Routes>
                <Route path='/' element={<ProtectedRoutes component={<Home/>} />} />
                <Route path='Login' element={<Login />} />
                <Route path='Register' element={<Register />} />

            </Routes>

        </BrowserRouter>
    )
}

export default Router