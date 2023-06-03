import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";
import { customAxios } from "../customAxios";

const FoodForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            meal_name: "",
            meal_type: "",
            protein_amount: 0.0,
            fat_amount: 0.0,
            carbs_amount: 0.0,
            calories: 0,
        },
    });
    const queryClient = useQueryClient();
    const foodMutation = useMutation({
        mutationFn: (formData) =>
            customAxios.post("/logs/", formData, {
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries(["meal"]);
            queryClient.invalidateQueries(["logs", props.date]);
        },
    });

    const submitFoodForm = (foodData) => {
        props.setIsFormOpen(false);
        foodMutation.mutate({
            user: props.userId,
            meal: {
                ...foodData,
                meal_type: undefined,
            },
            date: props.date.toISOString().split("T")[0],
            meal_type: foodData.meal_type.toUpperCase(),
        });
    };

    return (
        <>
            <div className="fixed inset-0 z-10 bg-black bg-opacity-[65%]"></div>
            <div
                id="logForm"
                className="fixed top-1/2 left-1/2 z-20 w-4/5 max-w-[500px] -translate-x-1/2 -translate-y-1/2 animate-fade-in rounded-md bg-white-new p-7 sm:w-fit"
            >
                <FontAwesomeIcon
                    icon={faXmark}
                    className="fa-lg float-right cursor-pointer"
                    onClick={() => props.setIsFormOpen(false)}
                />
                <h2 className="mb-2 text-center font-heading text-lg font-bold">
                    It is time to eat something!
                </h2>
                <form onSubmit={handleSubmit(submitFoodForm)}>
                    <div className="flex flex-col">
                        <label className="text-sm font-bold">Name</label>
                        <input
                            {...register("meal_name", { required: true })}
                            type="text"
                            className="rounded-md border-[1px] border-dark p-2 outline-none"
                        />
                        {errors.meal_name && (
                            <p className="mt-1 text-sm leading-3 text-custom-red">
                                This field is required
                            </p>
                        )}
                        <label className="mt-3 text-sm font-bold">
                            Meal type
                        </label>
                        <select
                            {...register("meal_type", { required: true })}
                            className="rounded-md border-[1px] border-dark p-2 outline-none"
                            defaultValue=""
                        >
                            <option value="" disabled>
                                Select meal type...
                            </option>
                            <option value="BREAKFAST">Breakfast</option>
                            <option value="LUNCH">Lunch</option>
                            <option value="DINNER">Dinner</option>
                            <option value="SNACK">Snack</option>
                        </select>
                        {errors.meal_type && (
                            <p className="mt-1 text-sm leading-3 text-custom-red">
                                This field is required
                            </p>
                        )}
                        <div className="mt-3 flex w-full space-x-2">
                            <div>
                                <label className="text-sm font-bold">
                                    Protein
                                </label>
                                <input
                                    {...register("protein_amount", {
                                        required: true,
                                    })}
                                    type="number"
                                    step={0.1}
                                    className="w-full rounded-md border-[1px] border-dark p-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold">Fat</label>
                                <input
                                    {...register("fat_amount", {
                                        required: true,
                                    })}
                                    type="number"
                                    step={0.1}
                                    className="w-full rounded-md border-[1px] border-dark p-2 outline-none"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-bold">
                                    Carbs
                                </label>
                                <input
                                    {...register("carbs_amount", {
                                        required: true,
                                    })}
                                    type="number"
                                    step={0.1}
                                    className="w-full rounded-md border-[1px] border-dark p-2 outline-none"
                                />
                            </div>
                        </div>
                        {(errors.protein_amount ||
                            errors.fat_amount ||
                            errors.carbs_amount) && (
                            <p className="mt-1 text-sm leading-3 text-custom-red">
                                This field is required
                            </p>
                        )}
                        <label className="mt-3 text-sm font-bold">
                            Calories
                        </label>
                        <input
                            {...register("calories", { required: true })}
                            type="number"
                            className="rounded-md border-[1px] border-dark p-2 outline-none"
                        />
                        {errors.calories && (
                            <p className="mt-1 text-sm leading-3 text-custom-red">
                                This field is required
                            </p>
                        )}
                        <button className="mt-3 rounded-md border-2 border-dark bg-white-new px-3 py-1 font-bold transition-transform duration-300 hover:scale-105">
                            Log my food
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FoodForm;
