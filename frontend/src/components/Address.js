import axios from "axios";
import React, { useState, useEffect } from 'react';
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import Spinner from './Spinner';
import Pagination from "./Pagination";

export default function Address(){
    
    const navigate = useNavigate();

    const files = useStore((state) => state.files)
    const isLogin = useStore((state) => state.isLogin)
    const setFiles = useStore((state) => state.setFiles)
    const [loading, setLoading] = useState(false)
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
        getAddress()
      })
      .catch(() => {
          setLogout()
      })    
    }}

    const getAddress = async() => {
        if(isLogin) {
            setLoading(true)
            const api = 'http://localhost:8000/address/'
            const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
            await axios.get(api, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            })
            .then((response) => {
                setLoading(false)
                setFiles(response.data)
            })
            .catch(() => {
                setLoading(false)
                Auth()
            })
        } else {
            navigate('/login')
        }
    }
    

    useEffect(() => {
        getAddress()
    }, [isLogin]);

    const filtering = async(e) => {
        if(isLogin) {
            setLoading(true)
            const api = 'http://localhost:8000/address_filter/'
            const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
            await axios.get(api, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            params: {
                'filtering': e.target.value
            }
            })
            .then((response) => {
                setLoading(false)
                setFiles(response.data)
                
            })
            .catch(() => {
                setLoading(false)
                Auth()
            })
        } else {
            navigate('/login')
        }
    }

    const search = async(e) => {
        if(isLogin) {
            setLoading(true)
            const api = 'http://localhost:8000/address_search/'
            const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
            await axios.get(api, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            params: {
                'search': e.target.value
            }
            })
            .then((response) => {
                setLoading(false)
                setFiles(response.data)
            })
            .catch(() => {
                setLoading(false)
                Auth()
            })
        } else {
            navigate('/login')
        }
    }

      const deleting = async(e, file) => {
        if(isLogin) {
            setLoading(true)
            const api = 'http://localhost:8000/delete/'
            const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
            await axios.delete(api, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            params: {
                'nid': file.nid,
                'email': file.email
            }
            })
            .then((response) => {
                setLoading(false)
                getAddress()
            })
            .catch(() => {
                setLoading(false)
                Auth()
            })
        } else {
            navigate('/login')
        }
    }

    const deletingAll = async() => {
        if(isLogin) {
            setLoading(true)
            const api = 'http://localhost:8000/delete_all/'
            const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
            await axios.get(api, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            },
            })
            .then((response) => {
                setLoading(false)
                getAddress()
                
            })
            .catch(() => {
                setLoading(false)
                Auth()
            })
        } else {
            navigate('/login')
        }
    }
    
    return(
        <>
            <div className="antialiased font-sans">
                <div className="container mx-auto px-4 sm:px-8">
                    <div className="py-8">
                        <div>
                            <h2 className="text-2xl font-semibold leading-tight">Emails</h2>
                        </div>
                        <div className="my-2 flex sm:flex-row flex-col justify-between">
                            <div className="flex flex-col sm:flex-row">
                                <div className="flex flex-row mb-1 sm:mb-0">
                                    <div className="relative">
                                        <select onChange={filtering}
                                            className="appearance-none h-full rounded-l border block appearance-none w-full bg-white border-gray-400 text-gray-700 py-2 px-4 pr-8 leading-tight focus:outline-none focus:bg-white focus:border-gray-500">
                                            <option value='all'>All</option>
                                            <option value='waiting'>wating</option>
                                            <option value='sent'>sent</option>
                                            <option value='failed'>failed</option>
                                        </select>
                                        <div
                                            className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                            <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                                <div className="block relative">
                                    <span className="h-full absolute inset-y-0 left-0 flex items-center pl-2">
                                        <svg viewBox="0 0 24 24" className="h-4 w-4 fill-current text-gray-500">
                                            <path
                                                d="M10 4a6 6 0 100 12 6 6 0 000-12zm-8 6a8 8 0 1114.32 4.906l5.387 5.387a1 1 0 01-1.414 1.414l-5.387-5.387A8 8 0 012 10z">
                                            </path>
                                        </svg>
                                    </span>
                                    <input onChange={search} placeholder="Search"
                                        className="appearance-none rounded-r rounded-l sm:rounded-l-none border border-gray-400 border-b block pl-8 pr-6 py-2 w-full bg-white text-sm placeholder-gray-400 text-gray-700 focus:bg-white focus:placeholder-gray-600 focus:text-gray-700 focus:outline-none" />
                                </div>
                            </div>
                            <Pagination />
                        </div>
                        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 overflow-scroll h-96">
                            <div className="inline-block min-w-full shadow rounded-lg">
                            {loading ? <Spinner/> :
                                <table className="relative min-w-full leading-normal">
                                    <thead>
                                        <tr>
                                            <th
                                                className="sticky top-0 px-5 py-3 border-b-2 border-blue-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Email
                                            </th>
                                            <th
                                                className="sticky top-0 px-5 py-3 border-b-2 border-blue-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                ID
                                            </th>
                                            <th
                                                className="sticky top-0 px-5 py-3 border-b-2 border-blue-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                Status
                                            </th>
                                            <th
                                                className="sticky top-0 px-5 py-3 border-b-2 border-blue-200 bg-blue-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                                                <button onClick={deletingAll} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                                Clear All
                                                </button>
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody className="overflow-auto">
                                    {files.results!==undefined && files.results.map((file, key) =>
                                        <tr key={key}>
                                            <td className="py-5 border-b border-gray-200 bg-white text-sm">
                                                <div className="ml-3">
                                                    <p className="text-gray-900 whitespace-no-wrap">
                                                        {file.email}
                                                    </p>
                                                </div>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <p className="text-gray-900 whitespace-no-wrap">{file.nid}</p>
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                            {file.wating ?
                                                <span className="bg-yellow-100 text-yellow-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-yellow-900 dark:text-yellow-300">Waiting</span>
                                                :
                                            file.sent ? 
                                                <span className="bg-green-100 text-green-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-green-900 dark:text-green-300">Sent</span>
                                                :
                                                <span className="bg-red-100 text-red-800 text-xs font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-red-900 dark:text-red-300">Failed</span>
                                            }
                                            </td>
                                            <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
                                                <button onClick={e => deleting(e, file)} className="bg-transparent hover:bg-red-500 text-red-700 font-semibold hover:text-white py-2 px-4 border border-red-500 hover:border-transparent rounded">
                                                Delete
                                                </button>
                                            </td>
                                        </tr>
                                    )}
                                    </tbody>
                                </table>
                            }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}