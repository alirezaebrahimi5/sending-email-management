import { useEffect } from 'react';
import useStore from "../store";

export default function ProfilePage(){
    const isLogin = useStore((state) => state.isLogin)
    console.log(isLogin)
    useEffect(() => {
        const response = fetch("http://localhost:8000/api/auth/profile/");
        console.log(response)
      }, []);

    return(
        <>
            <h1 className="text-3xl font-bold underline">
            profile
            </h1>
        </>
    )
}