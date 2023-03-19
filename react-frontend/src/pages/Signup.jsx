import { Link } from "react-router-dom";
import axios from "axios";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";


const Signup = () => {
    const [profileImg, setProfileImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm();
    const signupMutation = useMutation({
        mutationFn: formData => axios.post("/api/auth/register/", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        }).then(response => response.data),
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("../");
        }
    });

    const registerUser = (signupData) => {
        let formData = new FormData();
        if (profileImg) {
            formData.append("profile_img", profileImg);
        }
        formData.append("email", signupData.email);
        formData.append("first_name", signupData.first_name);
        formData.append("last_name", signupData.last_name);
        formData.append("password", signupData.password);
        formData.append("password2", signupData.password2);
        signupMutation.mutate(formData);
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            navigate("../");
        }
    }, []);

    const imgInputRef = useRef();
    useEffect(() => {
        if (profileImg) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(profileImg);
        } else {
            setPreview(null);
        }
    }, [profileImg]);
    

    return (
        <main className="flex-grow pt-6 sm:pt-8 md:pt-12 2xl:pt-14">
            <div className="container flex flex-col justify-center items-center mb-6">
                <h1 className="font-bold font-heading text-lg min-[500px]:pb-1 min-[500px]:text-2xl lg:text-3xl 2xl:text-4xl mb-4 border-b-2 border-dark">Create an account</h1>
                <div className="mb-2 md:mb-4 xl:mb-6">
                    {
                        !preview ?
                            <button
                                className="w-40 h-40 rounded-[50%] bg-white-new font-medium drop-shadow transition-transform hover:scale-105"
                                onClick={(e) => {
                                    e.preventDefault();
                                    imgInputRef.current.click();
                                }}
                            >
                                Upload image
                            </button>
                            :
                            <img
                                className="w-40 h-40 rounded-[50%] object-cover cursor-pointer"
                                src={preview}
                                onClick={() => setProfileImg(null)}
                            />
                    }
                </div>
                <form onSubmit={handleSubmit(registerUser)} className="max-w-[80%] sm:max-w-[60%] lg:max-w-[50%] w-full">
                    <input 
                        type="file"
                        {...register("profile_img")}
                        accept="image/*"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-custom-gray hidden"
                        ref={imgInputRef}
                        onChange={(e) => {
                            const file = e.target.files[0];
                            if (file) {
                                setProfileImg(file);
                            } else {
                                setProfileImg(null);
                            }
                        }}
                    />
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Email address"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-custom-gray"
                    />
                    <div className="flex flex-col min-[500px]:flex-row justify-between min-[500px]:space-x-2 w-full">
                        <input
                            type="text"
                            {...register("first_name", { required: true })}
                            placeholder="First name"
                            className="w-full mb-3 p-3 rounded-md focus:outline-none border-2 border-custom-gray"
                        />
                        <input
                            type="text"
                            {...register("last_name", { required: true })}
                            placeholder="Last name"
                            className="w-full mb-3 p-3 rounded-md focus:outline-none border-2 border-custom-gray"
                        />
                    </div>
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Password"
                        className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-custom-gray"
                    />
                    <input
                        type="password"
                        {...register("password2", { required: true })}
                        placeholder="Confirm password"
                        className="w-full p-3 rounded-md focus:outline-none mb-5 border-2 border-custom-gray"
                    />
                    <button
                        className="w-full p-3 rounded-md bg-form text-white font-bold transition-transform hover:scale-105"
                    >
                        Signup
                    </button>
                </form>
                <p className="font-medium mt-3 leading-5 min-[500px]:leading-6">Already have an account? <span className="text-form underline"><Link to="../login">Login</Link></span></p>
            </div>
        </main>
    );
};

export default Signup;