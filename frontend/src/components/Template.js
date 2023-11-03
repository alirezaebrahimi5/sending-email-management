import axios from "axios";
import React, { useState, useEffect } from 'react';
import useStore from "../store";
import { useNavigate } from "react-router-dom";

export default function Template(){

    const navigate = useNavigate();

    const [subject, setSubject] = useState()
    const [err, setErr] = useState(false)
    const [body, setBody] = useState()

    const isLogin = useStore((state) => state.isLogin)
    const setLogin = useStore((state) => state.setLogin)
    const setLogout = useStore((state) => state.setLogout)
   
    const closeAlert = () => {
        setErr(false)
      }

    const handle_subject = (e) => {
        setSubject(e.target.value)
    }

    const handle_body = (e) => {
        setBody(e.target.value)
    }

    const getTemplate = async() => {
        if(isLogin) {
            const api = 'http://localhost:8000/template/'
            const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
            await axios.get(api, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
            })
              .then(response => {
                setSubject(response.data.subject)
                setBody(response.data.body)
              })
              .catch(() => {
                  Auth()
              })
          } else {
              navigate('/login')
          }
      }

      const saveTemplate = async(e) => {
        e.preventDefault()
        if(isLogin) {
            const api = 'http://localhost:8000/template/'
            const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
            await axios.get(api, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
              },
              params: {
                'subject': subject,
                'body': body
                }
            })
              .then(response => {
                if(response.status === 200) {
                    setErr(true)
                }
              })
              .catch(() => {
                  Auth()
              })
          } else {
              navigate('/login')
          }
      }

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
        })
        .catch(() => {
            setLogout()
        })    
    }}

    useEffect(() => {
        getTemplate()
      }, [isLogin]);

      useEffect(() => {
      }, [body, subject]);

    return(
        <div className="flex justify-center">
        <form>
        <div className="w-96 m-4">
        <label htmlFor="subject" className="block mb-2 text-sm font-medium text-gray-600">Subject:</label>
            <textarea id="subject" onChange={handle_subject} value={subject} rows="1" className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400 text-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your subject here..."></textarea>
        </div>
        <div className="w-96 m-4">
        <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-600">Body</label>
            <textarea id="body" onChange={handle_body} value={body} rows="4" className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 placeholder-gray-400text-gray-600 focus:ring-blue-500 focus:border-blue-500" placeholder="Write your template here..."></textarea>
        </div>
            <div className="flex items-center justify-between px-3 py-2 border-t">
                <button type="submit" onClick={saveTemplate} className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
                    Save
                </button>
            </div>
        
        {err && 
            <div className="bg-blue-100 border mt-4 border-blue-400 text-blue-700 px-4 py-3 rounded relative w-96" role="alert">
                <strong className="font-bold">Successfull! </strong>
                <span className="block sm:inline">Template Updated.</span>
                <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg onClick={closeAlert} className="fill-current h-6 w-6 text-blue-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                </span>
            </div>
            }
            </form>
        </div>
    )
}