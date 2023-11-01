
import React from 'react';
import { useState, useEffect } from 'react';
import Spinner from './Spinner'
import axios from "axios";
import { FileUploader } from "react-drag-drop-files";
import Files from './Files';
import useStore from "../store";
import { useNavigate } from "react-router-dom";

export default function UploadTemplate() {
    const navigate = useNavigate();
    const setLogout = useStore((state) => state.setLogout)
    const setFiles = useStore((state) => state.setFiles)
    const fileTypes = ["CSV"];
    const [uploading, setUploading] = useState(false)
    const [res, setRes] = useState('')

    const updater = async() => {
        const api = 'http://localhost:8000/files/'
        if(localStorage.getItem('refresh')==null) {
            setLogout()
            navigate('/login')
        } else {
        const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
        await axios.get(api, {
        headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((response) => {
            setFiles(response.data)
        })
        .catch((error) => {if(error.message==='Request failed with status code 401'){
            checkFile()
        }})
    }}

    const checkFile = async() => {
        const api = 'http://localhost:8000/api/auth/login/refresh/'
        if(localStorage.getItem('refresh')==null) {
            setLogout()
            navigate('/login')
        } else {
        var refresh = localStorage.getItem('refresh').replace(/^"(.*)"$/, '$1')
        const formData = new FormData();
        formData.append("refresh", refresh);
        await axios.post(api, formData, {
        headers: {
            "content-type": "multipart/form-data",
        }})
        .then((response) => localStorage.setItem('access',JSON.stringify(response.data.access)))
        .catch(() => {
            setLogout()
            navigate("/login");
        })
        updater()
        
    }}

    const checkLogin = async(e) => {
        if(localStorage.getItem('refresh')==null) {
            setLogout()
            navigate('/login')
        } else {
        const api = 'http://localhost:8000/api/auth/login/refresh/'
        var refresh = localStorage.getItem('refresh').replace(/^"(.*)"$/, '$1');
        const formData = new FormData();
        formData.append("refresh", refresh);
        await axios.post(api, formData, {
        headers: {
            "content-type": "multipart/form-data",
        }})
        .then((response) => localStorage.setItem('access',JSON.stringify(response.data.access)))
        .catch(() => {
            setLogout()
            navigate("/login");
        })
        uploader(e)
        
    }}
      
      
    const uploader = async(e) => {
        const api = 'http://localhost:8000/upload/'
        if(localStorage.getItem('refresh')==null) {
            setLogout()
            navigate('/login')
        } else {
        const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
        setUploading(true)
        const formData = new FormData();
        formData.append("file", e);
        await axios.post(api, formData, {
        headers: {
            "content-type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
        },
        })
        .then((resp) => {
            updater()
            if(resp.status===200) {
                setUploading(false)
                if(resp.data==='wrongType'){
                    setRes('wrongType')
                } else if(resp.data==='ok'){
                    setRes('ok')
                }
            } else {
                setUploading(false)
                setRes('error')
            }
        })
        .catch((error) => {if(error.message==='Request failed with status code 401'){
            checkLogin(e)
        }})

    }}
    const closeAlert = () => {
        setRes('')
      }
      
      useEffect(() => {
        setUploading(false)
      }, [res]);

      updater()
    
    return (
        <div className='flex-col'>
        <div className="w-full p-8 flexbg-slate-100">
            <div className="extraOutline p-4 bg-white w-max bg-whtie m-auto rounded-lg">
                <div className="file_upload p-5 relative border-4 border-dotted border-gray-300 rounded-lg w-96">
                    <svg className="text-indigo-500 w-24 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" /></svg>
                    <div className="input_field flex flex-col w-max mx-auto text-center">
                        <label>
                            <FileUploader handleChange={uploader} name="file" types={fileTypes} />
                            <div className="mt-2 text bg-indigo-600 text-white border border-gray-300 rounded font-semibold cursor-pointer p-1 px-3 hover:bg-indigo-500">Select</div>
                        </label>

                        <div className="title text-indigo-500 uppercase">or drop CSV file here</div>
                    </div>
                    {uploading && <Spinner/>}
                    {res==='wrongType' && 
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Wrong!</strong>
                        <span className="block sm:inline">Upload just CSV file.</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={closeAlert} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                        </div>
                    }
                    {res==='error' && 
                        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Wrong!</strong>
                        <span className="block sm:inline">Upload again, something happened.</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={closeAlert} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                        </div>
                    }
                    {res==='ok' && 
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
                        <strong className="font-bold">Successful!</strong>
                        <span className="block sm:inline">Thanks, file uoloaded successfully.</span>
                        <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                            <svg onClick={closeAlert} className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
                        </span>
                        </div>
                    }
                </div>
            </div>
        </div>
        <Files />
        </div>
    )
}
        