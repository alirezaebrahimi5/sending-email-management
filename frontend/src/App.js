import React  from 'react';
import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import LoginPage from './pages/Login';
import HomePage from './pages/Home';
import Layout from './Layout/Layout'
import SignUpPage from './pages/SignUp'

function App() {
  return (
  <div className="h-full bg-white">
    <div className="h-full">
     <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/login" element={<LoginPage/>} />
            <Route path="/signup" element={<SignUpPage/>} />
            <Route index element={<HomePage/>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  </div>
  );
}

export default App;