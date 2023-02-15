import loginImg from "../assets/login-img.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const Signup = () => {
    const [signupData, setSignupData] = useState({});

    const handleSignup = (e) => {
        e.preventDefault();

    };

    const handleSignupChange = (e) => {
        const { name, value } = e.target;
        setSignupData(prevData => ({ ...prevData, [name]: value }));
    };

    // Redirect to page with info about the user

    return (
        <main className="flex-grow pt-6 sm:pt-8 md:pt-12 2xl:pt-14">
            <div className="flex flex-col justify-center items-center">
                <img src={loginImg} className="h-14 mb-2" />
                <h1 className="font-bold font-heading text-2xl lg:text-3xl 2xl:text-4xl mb-4">Create an account</h1>
                <p className="font-medium mb-4 md:mb-6 xl:mb-9">Already have an account? <span className="text-form"><Link to="../login">Login</Link></span></p>
                <form onSubmit={handleSignup} className="max-w-[80%] sm:max-w-[60%] lg:max-w-[40%] w-full">
                    <input
                        onChange={handleSignupChange}
                        type="text"
                        name="username"
                        placeholder="Username"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-[#93A8AC]"
                    />
                    <input
                        onChange={handleSignupChange}
                        type="email"
                        name="email"
                        placeholder="Email address"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-[#93A8AC]"
                    />
                    <input
                        onChange={handleSignupChange}
                        type="password"
                        name="password"
                        placeholder="Password"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-[#93A8AC]"
                    />
                    <input
                        onChange={handleSignupChange}
                        type="text"
                        name="password"
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