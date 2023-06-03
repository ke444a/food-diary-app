import { Link } from "react-router-dom";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { customAxios } from "../customAxios";

const Signup = () => {
    const [profileImg, setProfileImg] = useState(null);
    const [preview, setPreview] = useState(null);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();
    const signupMutation = useMutation({
        mutationFn: (formData) =>
            customAxios
                .post("/auth/register/", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => response.data),
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("../");
        },
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
            {signupMutation.isError && (
                <ErrorMessage
                    message={signupMutation.error.response.data.password[0]}
                />
            )}
            <div className="container mb-6 flex flex-col items-center justify-center">
                <h1 className="mb-4 border-b-2 border-dark font-heading text-lg font-bold min-[500px]:pb-1 min-[500px]:text-2xl lg:text-3xl 2xl:text-4xl">
                    Create an account
                </h1>
                <div className="mb-2 md:mb-4 xl:mb-6">
                    {!preview ? (
                        <button
                            className="h-40 w-40 rounded-[50%] bg-white-new font-medium drop-shadow transition-transform hover:scale-105"
                            onClick={(e) => {
                                e.preventDefault();
                                imgInputRef.current.click();
                            }}
                        >
                            Upload image
                        </button>
                    ) : (
                        <img
                            className="h-40 w-40 cursor-pointer rounded-[50%] object-cover"
                            src={preview}
                            onClick={() => setProfileImg(null)}
                        />
                    )}
                </div>
                <form
                    onSubmit={handleSubmit(registerUser)}
                    className="w-full max-w-[80%] sm:max-w-[60%] lg:max-w-[50%]"
                >
                    <input
                        type="file"
                        {...register("profile_img")}
                        accept="image/*"
                        className="mb-3 hidden w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
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
                        className="w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm leading-3 text-red-500">
                            Email is required
                        </p>
                    )}
                    <div className="flex w-full flex-col justify-between min-[500px]:flex-row min-[500px]:space-x-2">
                        <input
                            type="text"
                            {...register("first_name", { required: true })}
                            placeholder="First name"
                            className="mt-3 w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                        />
                        <input
                            type="text"
                            {...register("last_name", { required: true })}
                            placeholder="Last name"
                            className="mt-3 w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                        />
                    </div>
                    {(errors.first_name || errors.last_name) && (
                        <p className="mt-1 text-sm leading-3 text-red-500">
                            First name and last name are required
                        </p>
                    )}
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Password"
                        className="mt-3 w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm leading-3 text-red-500">
                            Password is required
                        </p>
                    )}
                    <input
                        type="password"
                        {...register("password2", { required: true })}
                        placeholder="Confirm password"
                        className="mt-3 w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                    />
                    {errors.password2 && (
                        <p className="mt-1 text-sm leading-3 text-red-500">
                            Confirm password is required
                        </p>
                    )}
                    <button className="mt-5 w-full rounded-md bg-form p-3 font-bold text-white transition-transform hover:scale-105">
                        Signup
                    </button>
                </form>
                <p className="mt-3 font-medium leading-5 min-[500px]:leading-6">
                    Already have an account?{" "}
                    <span className="text-form underline">
                        <Link to="../login">Login</Link>
                    </span>
                </p>
            </div>
        </main>
    );
};

export default Signup;
