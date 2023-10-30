import React  from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import Navbar from './Layout/Header'

function App() {
  return (
  <html class="h-full bg-white">
    <body class="h-full">
      <Navbar/>
     <BrowserRouter>
        <Routes>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/" element={<HomePage/>} />
        </Routes>
      </BrowserRouter>
    </body>
  </html>
  );
}

export default App;