import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axios from "axios";

const Profile = () => {
    const [user, setUser] = useState(() => JSON.parse(localStorage.getItem("user")));
    const [profileImg, setProfileImg] = useState(null);
    const [preview, setPreview] = useState(user.profile_img);
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm({
        defaultValues: {
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            calories_goal: user.calories_goal,
        }
    });

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, []);

    const profileMutation = useMutation({
        mutationFn: formData => axios.put(`/api/auth/update_profile/${user.id}/`, formData, 
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                    "Content-Type": "multipart/form-data",
                }
            }).then(response => response.data),
        onSuccess: (data) => {
            localStorage.setItem("user", JSON.stringify({...data}));
            navigate("/");
        }
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
        <main className="flex-grow pt-4 md:pt-10 2xl:pt-12 bg-white-new">
            <div className="container flex flex-col justify-center items-center mb-6">
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
                                className="w-40 h-40 rounded-[50%] object-cover cursor-pointer transition-transform hover:scale-105"
                                src={preview}
                                onClick={() => {
                                    setProfileImg(null);
                                    setPreview(null);
                                    const updatedUser = {
                                        ...user,
                                        profile_img: undefined,
                                    };
                                    setUser(updatedUser);
                                    localStorage.setItem("user", JSON.stringify(updatedUser));
                                }}
                            />
                    }
                </div>
                <form onSubmit={handleSubmit(updateProfile)} className="max-w-[80%] sm:max-w-[60%] lg:max-w-[50%] w-full">
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
                    <div className="flex justify-between space-x-2 mb-3">
                        <div className="w-full">
                            <label className="font-bold opacity-70">First name</label>
                            <input
                                type="text"
                                {...register("first_name", { required: true })}
                                className="w-full p-3 rounded-md focus:outline-none border-2 border-custom-gray"
                            />
                        </div>
                        <div className="w-full">
                            <label className="font-bold opacity-70">Last name</label>
                            <input
                                type="text"
                                {...register("last_name", { required: true })}
                                className="w-full p-3 rounded-md focus:outline-none border-2 border-custom-gray"
                            />
                        </div>
                    </div>
                    <label className="font-bold opacity-70">Email</label>
                    <input type="email" {...register("email", { required: true })} className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-custom-gray" />
                    <label className="font-bold opacity-70">Calories goal</label>
                    <input type="number" {...register("calories_goal")} className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-custom-gray" />
                    <button
                        className="w-full p-3 rounded-md bg-form text-white font-bold transition-transform hover:scale-105"
                    >
                        Update Profile
                    </button>
                </form>
            </div>
        </main>
    );
};

export default Profile;