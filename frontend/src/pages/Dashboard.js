import Address from "../components/Address"
import Bar from "../components/Bar"
import React, { useState, useEffect } from 'react';
import Spinner from "../components/Spinner";
import useStore from "../store";

export default function DashboardPage(){

    const [progress, setprogress] = useState(false)
    const isProgress = useStore((state) => state.isProgress)

    useEffect(() => {
        const taskId = localStorage.getItem('tokenId')
        if(taskId === null) {
            setprogress(false)
        } else {
            setprogress(true)
        }

    }, [isProgress]);

    return(
        <>
        <Bar />
        {progress ?
        <div className="pt-32 text-center"><Spinner /><p className="text-violet-800">In Progress ...</p></div>:
        <Address />
    }
        </>
    )
}