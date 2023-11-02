import React, { useEffect } from 'react';
import useStore from "../store";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Pagination(){

    const navigate = useNavigate();

    const files = useStore((state) => state.files)
    const setFiles = useStore((state) => state.setFiles)

    const nextPage = async() => {
        const api = files.next
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
        .catch(() => {
            navigate('/')
        })
    }

    const pervPage = async() => {
        const api = files.previous
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
        .catch(() => {
            navigate('/')
        })
    }

    useEffect(() => {
      }, [files]);

    return(
        <div className="items-center space-y-2 text-xs sm:space-y-0 sm:space-x-3 sm:flex">
            {files!==undefined &&
            <>
            <span className="block">{files.current} page of {files.total} pages</span>
            <div className="space-x-1">
                {files.previous ? 
                    <button title="previous" onClick={pervPage} type="button" className="bg-blue-600 hover:bg-blue-700 text-white inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>: 
                    <button title="previous" type="button" disabled className="bg-blue-400 text-white inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                            <polyline points="15 18 9 12 15 6"></polyline>
                        </svg>
                    </button>}
                {files.next ? 
                    <button title="next" onClick={nextPage} type="button" className="bg-blue-600 text-white hover:bg-blue-700 inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>:
                    <button title="next" type="button" disabled className="bg-blue-400 text-white inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow">
                        <svg viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className="w-4">
                            <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                    </button>}
            </div>
            </>}
    </div>
    )
}
