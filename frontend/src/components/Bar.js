import axios from "axios";
import React, { useState, useEffect } from 'react';
import useStore from "../store";
import { useNavigate } from "react-router-dom";

export default function Bar(){

    const myStyle = {
        strokeDasharray: '10.35px, 100px',
        strokeDashoffset: '0px',
        transition: 'stroke-dashoffset 0.3s ease 0s, stroke-dasharray 0.3s ease 0s, stroke 0.3s linear 0s, 0.06s'
    }

    const navigate = useNavigate();

    const [start, setStart] = useState(false)
    const isLogin = useStore((state) => state.isLogin)
    const setLogout = useStore((state) => state.setLogout)
    const setLogin = useStore((state) => state.setLogin)

    const Auth = async() => {
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
            sendMAil()
        })
        .catch(() => {
            setLogout()
        })    
    }}
    
      const sendMAil = async() => {
        if(isLogin) {
            setStart(true)
              const api = 'http://localhost:8000/start_mail/'
              const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
              await axios.get(api, {
              headers: {
                  "content-type": "multipart/form-data",
                  Authorization: `Bearer ${token}`,
              },
              })
              .then(() => {
                setStart(true)
              })
              .catch(() => {
                  Auth()
              })
          } else {
              navigate('/login')
          }
      }
    
      useEffect(() => {
    }, [start]);    

    return(
        <div className="bg-slate-200 max-w-min mx-auto mt-8 px-8 pb-8 rounded-lg drop-shadow-xl border-solid border-2 border-slate-200">
        <div className="max-w-xl mx-auto p-4 mt-16">
           <div className="mb-7">
                <div className="flex justify-between py-1">
                    <span className="text-base text-gray-lite font-semibold dark:text-blue-600">In Progress</span>
                    <span className="text-base font-semibold text-gray-lite pr-5 dark:text-blue-600">65%</span>
                </div>
                <svg className="rc-progress-line h-2 w-full" viewBox="0 0 100 1" preserveAspectRatio="none">
                    <path className="rc-progress-line-trail" d="M 0.5,0.5
                L 99.5,0.5" strokeLinecap="round" stroke="#D9D9D9" strokeWidth="1" fillOpacity="0"></path>
                    <path className="rc-progress-line-path" d="M 0.5,0.5
                L 99.5,0.5" strokeLinecap="round" stroke="#5185D4" strokeWidth="1" fillOpacity="0"
                        style={myStyle}>
                    </path>
                </svg>
            </div> 
        </div>
        {start ? 
        <div className="flex flex-row justify-center bg-white p-2 rounded-full shadow-inner shadow-gray-400">
            <button className="mx-2" disabled>
            <div className="flex justify-between">
                    <div className="text-white p-8 rounded-full bg-green-200 shadow-inner">
                    <div className="text-white p-1 rounded-full bg-green-100 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                        </div>
                    </div>
                </div>
            </button>
            <button className="mx-2">
                <div className="flex justify-between">
                    <div className="text-white p-8 rounded-full bg-yellow-500 shadow-inner">
                    <div className="text-white p-1 rounded-full bg-yellow-400 shadow-lg">
                        <svg className="w-10 h-10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
                    </div>
                    </div>
                </div>
            </button>
            <button className="mx-2">
                <div className="flex justify-between">
                    <div className="text-white p-8 rounded-full bg-red-600 shadow-inner">
                    <div className="text-white p-1 rounded-full bg-red-500 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                        </svg>
                    </div>
                    </div>
                </div>
            </button>
        </div>:
        <div className="flex flex-row justify-center bg-white p-2 rounded-full shadow-inner shadow-gray-400">
            <button className="mx-2" onClick={sendMAil}>
            <div className="flex justify-between">
                    <div className="text-white p-8 rounded-full bg-green-600 shadow-inner">
                    <div className="text-white p-1 rounded-full bg-green-500 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
                        </svg>
                        </div>
                    </div>
                </div>
            </button>
            <button className="mx-2" disabled>
                <div className="flex justify-between">
                    <div className="text-white p-8 rounded-full bg-yellow-200 shadow-inner">
                    <div className="text-white p-1 rounded-full bg-yellow-100 shadow-lg">
                        <svg className="w-10 h-10" fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z"/></svg>
                    </div>
                    </div>
                </div>
            </button>
            <button className="mx-2" disabled>
                <div className="flex justify-between">
                    <div className="text-white p-8 rounded-full bg-red-200 shadow-inner">
                    <div className="text-white p-1 rounded-full bg-red-100 shadow-lg">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-10 h-10">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 7.5A2.25 2.25 0 017.5 5.25h9a2.25 2.25 0 012.25 2.25v9a2.25 2.25 0 01-2.25 2.25h-9a2.25 2.25 0 01-2.25-2.25v-9z" />
                        </svg>
                    </div>
                    </div>
                </div>
            </button>
        </div>}
        </div>
        
    )
}

