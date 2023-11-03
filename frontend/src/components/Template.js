import axios from "axios";
import React, { useState, useEffect } from 'react';
import useStore from "../store";
import { useNavigate } from "react-router-dom";

export default function Template(){

    const navigate = useNavigate();

    const [subject, setSubject] = useState()
    const [body, setBody] = useState()

    const isLogin = useStore((state) => state.isLogin)
    const setLogin = useStore((state) => state.setLogin)
    const setLogout = useStore((state) => state.setLogout)
   

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
    <textarea id="subject" value={subject} rows="1" className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400 text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your subject here..."></textarea>
</div>
<div className="w-96 m-4">
   <label htmlFor="body" className="block mb-2 text-sm font-medium text-gray-600">Body</label>
    <textarea id="body" value={body} rows="4" className="block p-2.5 w-full text-sm text-gray-500 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:placeholder-gray-400text-gray-600 dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Write your template here..."></textarea>
</div>
       <div className="flex items-center justify-between px-3 py-2 border-t">
           <button type="submit" className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
               Save
           </button>
       </div>
</form>
</div>
    )
}