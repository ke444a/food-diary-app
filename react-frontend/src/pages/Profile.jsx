import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { customAxios } from "../customAxios";

const Profile = () => {
    const [user, setUser] = useState(() =>
        JSON.parse(localStorage.getItem("user"))
    );
    const [profileImg, setProfileImg] = useState(null);
    const [preview, setPreview] = useState(user.profile_img);
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            calories_goal: user.calories_goal,
        },
    });

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    const profileMutation = useMutation({
        mutationFn: (formData) =>
            customAxios
                .put(`/auth/update_profile/${user.id}/`, formData, {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                        "Content-Type": "multipart/form-data",
                    },
                })
                .then((response) => response.data),
        onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify({ ...data }));
            navigate("/");
        },
        onError: (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        },
    });

    const updateProfile = (profileData) => {
        let formData = new FormData();
        if (profileImg) {
            formData.append("profile_img", profileImg);
        }
        formData.append("email", profileData.email);
        formData.append("first_name", profileData.first_name);
        formData.append("last_name", profileData.last_name);
        formData.append("calories_goal", profileData.calories_goal);
        profileMutation.mutate(formData);
    };

    const imgInputRef = useRef();
    useEffect(() => {
        if (profileImg) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(profileImg);
        } else if (preview !== user.profile_img) {
            setPreview(null);
        }
    }, [profileImg]);

    return (
        <main className="flex-grow pt-4 md:pt-10 2xl:pt-12">
            <div className="container mb-6 flex flex-col items-center justify-center">
                <h1 className="mb-5 inline-block border-b-2 border-dark font-heading text-lg font-bold sm:text-2xl 2xl:text-4xl">
                    Edit My Profile
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
                            className="h-40 w-40 cursor-pointer rounded-[50%] object-cover transition-transform hover:scale-105"
                            src={preview}
                            onClick={() => {
                                setProfileImg(null);
                                setPreview(null);
                                const updatedUser = {
                                    ...user,
                                    profile_img: undefined,
                                };
                                setUser(updatedUser);
                                localStorage.setItem(
                                    "user",
                                    JSON.stringify(updatedUser)
                                );
                            }}
                        />
                    )}
                </div>
                <form
                    onSubmit={handleSubmit(updateProfile)}
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
                    <div className="flex justify-between space-x-2">
                        <div className="w-full">
                            <label className="font-bold opacity-70">
                                First name
                            </label>
                            <input
                                type="text"
                                {...register("first_name", { required: true })}
                                className="w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                            />
                        </div>
                        <div className="w-full">
                            <label className="font-bold opacity-70">
                                Last name
                            </label>
                            <input
                                type="text"
                                {...register("last_name", { required: true })}
                                className="w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                            />
                        </div>
                    </div>
                    {(errors.first_name || errors.last_name) && (
                        <p className="mt-1 text-sm leading-3 text-red-500">
                            First name and last name are required
                        </p>
                    )}
                    <label className="mt-3 inline-block font-bold opacity-70">
                        Email
                    </label>
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        className="w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm leading-3 text-red-500">
                            Email is required
                        </p>
                    )}
                    <label className="mt-3 inline-block font-bold opacity-70">
                        Calories goal
                    </label>
                    <input
                        type="number"
                        {...register("calories_goal")}
                        className="w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                    />
                    {errors.calories_goal && (
                        <p className="mt-1 text-sm leading-3 text-red-500">
                            Calories goal is required
                        </p>
                    )}
                    <button className="mt-3 w-full rounded-md bg-form p-3 font-bold text-white transition-transform hover:scale-105">
                        Update Profile
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Profile;
