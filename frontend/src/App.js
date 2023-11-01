import React,{useEffect} from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import { Outlet, Navigate } from "react-router-dom";
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import Layout from './Layout/Layout'
import SignUpPage from './pages/SignUp'
import ProfilePage from './pages/Profile'
import useStore from "./store";
import DashboardPage from './pages/Dashboard';
import axios from "axios";

function App() {

  const setLogout = useStore((state) => state.setLogout)
  const setLogin = useStore((state) => state.setLogin)
  const isLogin = useStore((state) => state.isLogin)

  const checkAuth = async() => {
    const api = 'http://localhost:8000/api/auth/login/refresh/'
    if(localStorage.getItem('refresh')==null) {
        setLogout()
    } else {
    var refresh = localStorage.getItem('refresh').replace(/^"(.*)"$/, '$1')
    const formData = new FormData();
    formData.append("refresh", refresh);
    await axios.post(api, formData, {
    headers: {
        "content-type": "multipart/form-data",
    }})
    .then((response) => {
      localStorage.setItem('access',JSON.stringify(response.data.access))
      setLogin()
    })
    .catch(() => {
        setLogout()
    })    
}}

  useEffect(() => {
    checkAuth()
    },[isLogin]);

    const PrivateWrapper = (isLogin) => {
      return isLogin.element ? <Outlet /> : <Navigate to="/login" />;
    };
    
  return (
  <div className="bg-slate-100">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route element={<PrivateWrapper element={isLogin} />}>
              <Route path="/profile" element={<ProfilePage/>} />
            </Route>
            <Route element={<PrivateWrapper element={isLogin} />}>
              <Route path="/dashboard" element={<DashboardPage />} />
            </Route>
            <Route element={<PrivateWrapper element={isLogin} />}>
              <Route index element={<HomePage/>} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
  </div>
  );
}

export default App;