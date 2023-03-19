import { Link } from "react-router-dom";
import loginImg from "../assets/login-img.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";


const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const loginMutation = useMutation(
        formData => axios.post("/api/auth/login/", formData).then(response => response.data), {
            onSuccess: (data) => {
                localStorage.setItem("token", data.token);
                localStorage.setItem("user", JSON.stringify(data.user));
                navigate("../");
            }
        }
    );

    const loginUser = (loginData) => {
        loginMutation.mutate(loginData);
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            navigate("../");
        }
    }, []);

    return (
        <main className="flex-grow pt-6 sm:pt-8 md:pt-12 2xl:pt-14">
            <div className="container flex flex-col justify-center items-center mb-6">
                <img src={loginImg} className="h-14 mb-2" />
                <h1 className="font-bold font-heading text-lg min-[500px]:text-2xl lg:text-3xl 2xl:text-4xl mb-5 md:mb-8 xl:mb-12 min-[500px]:pb-1 border-b-2 border-dark">Login to your page</h1>
                <form onSubmit={handleSubmit(loginUser)} className="max-w-[80%] sm:max-w-[60%] lg:max-w-[50%] w-full">
                    <input 
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Email address"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-custom-gray"
                    />
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Password"
                        className="w-full p-3 rounded-md focus:outline-none mb-5 border-2 border-custom-gray"
                    />
                    <button
                        className="w-full p-3 rounded-md bg-form text-white font-bold transition-transform hover:scale-105"
                    >
                        Login
                    </button>
                </form>
                <p className="font-medium mt-3 text-center leading-5 min-[500px]:leading-6">Don&apos;t have an account yet? <span className="text-form underline"><Link to="../signup">Signup</Link></span></p>
            </div>
        </main>
    );
};

export default Login;