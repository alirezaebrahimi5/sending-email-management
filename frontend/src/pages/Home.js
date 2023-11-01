import Uploader from '../components/Uploader'
import useStore from "../store";
import { useNavigate } from "react-router-dom";
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primeflex/primeflex.css';                                   // css utility
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';      

export default function HomePage(){
    const navigate = useNavigate();
    const isLogin = useStore((state) => state.isLogin)
    const LoginFirst = () => {
        navigate("/login");
    }
    return(
        <>
        {isLogin &&
        <PrimeReactProvider>
            <div className='p-4 bg-slate-100'>
            <Uploader />
            </div>
        </PrimeReactProvider>
        }
        {!isLogin && 
            <button onClick={LoginFirst} className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded">
                Login
            </button>
        }
        </>
    )
}