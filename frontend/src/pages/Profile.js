import axios from "axios";

import React, { useState, useEffect } from 'react';
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";

export default function ProfilePage(){

    const navigate = useNavigate();

    const [input, setInput] = useState({
        password: '',
        password2: ''
      });
     
      const [error, setError] = useState({
        password: '',
        password2: ''
      })

      
    const [err, setErr] = useState(false)
    const [loading, setLoading] = useState(false)
    const [profile, setProfile] = useState()
    const isLogin = useStore((state) => state.isLogin)


    const getProfile = async() => {
        if(isLogin) {
        const api = "http://localhost:8000/api/auth/profile/"
            const token = localStorage.getItem('access').replace(/^"(.*)"$/, '$1');
            await axios.get(api, {
            headers: {
                "content-type": "multipart/form-data",
                Authorization: `Bearer ${token}`,
            }})
            .then(response => {
                setProfile(response.data.email)
            })
        } else {
            navigate('/login')
        }
    }

    const closeAlert = () => {
        setErr(false)
      }

    useEffect(() => {
        getProfile()
    }, []);

    const passReset = async(e) => {
        setLoading(true)
        e.preventDefault()
        const requestOptions = {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(input)
        };
        const response = await fetch("http://localhost:8000/api/auth/reset/", requestOptions);
        response.json().then(data => 
          ({status: response.status, body: data})).then(obj => {
            if(obj.status===200) {
              localStorage.setItem('access',JSON.stringify(obj.body.access))
              localStorage.setItem('refresh',JSON.stringify(obj.body.refresh))
              setLoading(false)
              navigate("/");
            } else {
              setErr(true)
              setLoading(false)
            }
            
          });
      }

      const onInputChange = e => {
        const { name, value } = e.target;
        setInput(prev => ({
          ...prev,
          [name]: value
        }));
        validateInput(e);
      }
       
      const validateInput = e => {
        let { name, value } = e.target;
        setError(prev => {
          const stateObj = { ...prev, [name]: "" };
       
          switch (name) {
            case "email":
              if (!value) {
                stateObj[name] = "Please enter Email.";
              }
              break;
       
            case "password":
              if (!value) {
                stateObj[name] = "Please enter Password.";
              } else if (input.password2 && value !== input.password2) {
                stateObj["password2"] = "Password and Confirm Password does not match.";
              } else {
                stateObj["password2"] = input.password2 ? "" : error.password2;
              }
              break;
       
            case "password2":
              if (!value) {
                stateObj[name] = "Please enter Confirm Password.";
              } else if (input.password && value !== input.password) {
                stateObj[name] = "Password and Confirm Password does not match.";
              }
              break;
       
            default:
              break;
          }
       
          return stateObj;
        });
      }

    return(
        <>
       <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://img.icons8.com/ios-filled/100/7950F2/user-shield.png"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Reset {profile} password
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form className="space-y-6" action="#" method="POST">

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  placeholder='Enter Password'
                  value={input.password}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  autoComplete="current-password"
                  required
                  className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {error.password && <span className='err text-red-600'>{error.password}</span>}
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                  Confirm Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password2"
                  type="password"
                  placeholder='Enter Confirm Password'
                  value={input.password2}
                  onChange={onInputChange}
                  onBlur={validateInput}
                  autoComplete="current-password"
                  required
                  className="block p-4 w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
                {error.password2 && <span className='err text-red-600'>{error.password2}</span>}
              </div>
            </div>
            <div>
              <button
                onClick={passReset}
                type="submit"
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Reset
              </button>
            </div>
          </form>

          {err && 
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
              <strong className="font-bold">Wrong!</strong>
              <span className="block sm:inline">Enter Email and password again.</span>
              <span className="absolute top-0 bottom-0 right-0 px-4 py-3">
                <svg onClick={closeAlert} className="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
              </span>
            </div>
          }
        </div>

          {loading && <Spinner />}
      </div>
        </>
    )
}