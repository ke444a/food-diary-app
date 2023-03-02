import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import userImg from "../assets/user-img.png";

const Profile = () => {
    const user = JSON.parse(localStorage.getItem("user"));
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

    const profileMutation = useMutation(
        formData => axios.put(
            `/api/auth/update_profile/${user.id}/`, 
            formData, 
            {
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`,
                }
            }
        ).then(response => response.data), {
            onSuccess: (data) => {
                localStorage.setItem("user", JSON.stringify({...data}));
            }
        }
    );

    const updateProfile = (data) => {
        profileMutation.mutate(data);
    };

    return (
        <main className="flex-grow pt-4 md:pt-10 2xl:pt-12 bg-white-new">
            <div className="container flex flex-col justify-center items-center">
                <img className="w-12 h-12 rounded-[50%] mb-3" src={userImg} />
                <form onSubmit={handleSubmit(updateProfile)} className="max-w-[80%] sm:max-w-[60%] lg:max-w-1/2 w-full">
                    <div className="flex justify-between space-x-2 mb-3">
                        <div className="w-full">
                            <label className="font-bold opacity-70">First name</label>
                            <input
                                type="text"
                                {...register("first_name", { required: true })}
                                className="w-full p-3 rounded-md focus:outline-none border-2 border-[#93A8AC]"
                            />
                        </div>
                        <div className="w-full">
                            <label className="font-bold opacity-70">Last name</label>
                            <input
                                type="text"
                                {...register("last_name", { required: true })}
                                className="w-full p-3 rounded-md focus:outline-none border-2 border-[#93A8AC]"
                            />
                        </div>
                    </div>
                    <label className="font-bold opacity-70">Email</label>
                    <input type="email" {...register("email", { required: true })} className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-[#93A8AC]" />
                    <label className="font-bold opacity-70">Calories goal</label>
                    <input type="number" {...register("calories_goal")} className="w-full p-3 rounded-md focus:outline-none mb-3 border-2 border-[#93A8AC]" />
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