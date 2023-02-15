import { Link } from "react-router-dom";
import loginImg from "../assets/login-img.png";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const [loginData, setLoginData] = useState({});
    const navigate = useNavigate();

    const handleLoginChange = (e) => {
        const {name, value} = e.target;
        setLoginData(prevData => ({...prevData, [name]: value}));
    };

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://127.0.0.1:8000/food_api/v1/login", loginData).then(response => {
            console.log(response);
            if (response.status === 200) {
                navigate("/profile");
            }
        });
    };

    return (
        <main className="flex-grow pt-6 sm:pt-8 md:pt-12 2xl:pt-14">
            <div className="flex flex-col justify-center items-center">
                <img src={loginImg} className="h-14 mb-2" />
                <h1 className="font-bold font-heading text-2xl lg:text-3xl 2xl:text-4xl mb-4">Login to your page</h1>
                <p className="font-medium mb-5 md:mb-8 xl:mb-12">Don&apos;t have an account yet? <span className="text-form"><Link to="../signup">Signup</Link></span></p>
                <form onSubmit={handleLogin} className="max-w-[80%] sm:max-w-[60%] lg:max-w-[40%] w-full">
                    <input 
                        onChange={handleLoginChange}
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-[#93A8AC]"
                    />
                    <input
                        onChange={handleLoginChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-md focus:outline-none mb-5 border-2 border-[#93A8AC]"
                    />
                    <button
                        className="w-full p-3 rounded-md bg-form text-white font-bold transition-transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Login;