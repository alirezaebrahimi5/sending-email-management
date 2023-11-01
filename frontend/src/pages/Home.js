import Uploader from '../components/Uploader'
import useStore from "../store";
import { useNavigate } from "react-router-dom"; 

export default function HomePage(){
    const navigate = useNavigate();
    const isLogin = useStore((state) => state.isLogin)
    const LoginFirst = () => {
        navigate("/login");
    }
    return(
        <>
        {isLogin &&
        <>
            <Uploader />
        </>
        }
        {!isLogin && 
            <button onClick={LoginFirst} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Login
            </button>
        }
        </>
    )
}