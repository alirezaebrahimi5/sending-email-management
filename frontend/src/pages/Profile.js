import { useEffect } from 'react';

export default function ProfilePage(){
    
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