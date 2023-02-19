import loginImg from "../assets/login-img.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect } from "react";


const Signup = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const signupMutation = useMutation(
        formData => axios.post("http://127.0.0.1:8000/food_api/v1/register", formData).then(response => response.data), {
            onSuccess: (data) => {
                const userData = data.user;
                userData["token"] = data.token;
                localStorage.setItem("user", JSON.stringify(userData));
                navigate("../");
            }
        }
    );

    const registerUser = (signupData) => {
        signupMutation.mutate(signupData);
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            navigate("../");
        }
    }, []);

    return (
        <main className="flex-grow pt-6 sm:pt-8 md:pt-12 2xl:pt-14">
            <div className="flex flex-col justify-center items-center">
                <img src={loginImg} className="h-14 mb-2" />
                <h1 className="font-bold font-heading text-2xl lg:text-3xl 2xl:text-4xl mb-4">Create an account</h1>
                <p className="font-medium mb-4 md:mb-6 xl:mb-9">Already have an account? <span className="text-form"><Link to="../login">Login</Link></span></p>
                <form onSubmit={handleSubmit(registerUser)} className="max-w-[80%] sm:max-w-[60%] lg:max-w-[40%] w-full">
                    <input
                        type="text"
                        {...register("username", { required: true })}
                        placeholder="Username"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-[#93A8AC]"
                    />
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Email address"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-[#93A8AC]"
                    />
                    <div className="flex justify-between space-x-2 w-full mb-3">
                        <input
                            type="text"
                            {...register("first_name", { required: true })}
                            placeholder="First name"
                            className="w-full p-3 rounded-md focus:outline-none border-2 border-[#93A8AC]"
                        />
                        <input
                            type="text"
                            {...register("last_name", { required: true })}
                            placeholder="Last name"
                            className="w-full p-3 rounded-md focus:outline-none border-2 border-[#93A8AC]"
                        />
                    </div>
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Password"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-[#93A8AC]"
                    />
                    <input
                        type="password"
                        {...register("password2", { required: true })}
                        placeholder="Confirm password"
                        className="w-full p-3 rounded-md focus:outline-none mb-5 border-2 border-[#93A8AC]"
                    />
                    <button
                        className="w-full p-3 rounded-md bg-form text-white font-bold transition-transform hover:scale-105"
                    >
                        Signup
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Signup;