import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useForm } from "react-hook-form";

const FoodForm = (props) => {
    const {register, handleSubmit} = useForm({
        defaultValues: {
            meal_name: "",
            meal_type: "",
            protein_amount: 0.0,
            fat_amount: 0.0,
            carbs_amount: 0.0,
            calories: 0,
        }
    });
    const queryClient = useQueryClient();
    const foodMutation = useMutation(
        formData => axios.post("/api/logs/", formData, {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }), 
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["meal"]);
                queryClient.invalidateQueries(["logs", props.date, props.userId]);
            }
        }
    );

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
            <div className="fixed inset-0 bg-black bg-opacity-[65%] z-10"></div>
            <div id="logForm" className="fixed bg-white-new top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-7 rounded-md w-4/5 sm:w-fit max-w-[500px] animate-fade-in">
                <FontAwesomeIcon icon={faXmark} className="float-right cursor-pointer fa-lg" onClick={() => props.setIsFormOpen(false)} />
                <h2 className="text-center font-heading font-bold text-lg mb-2">It is time to eat something!</h2>
                <form onSubmit={handleSubmit(submitFoodForm)}>
                    <div className="flex flex-col">
                        <label className="font-bold text-sm">Name</label>
                        <input
                            {...register("meal_name", {required: true})}
                            type="text"
                            className="border-[1px] border-table-header rounded-md p-2 outline-none mb-3"
                        />
                        <label className="font-bold text-sm">Meal type</label>
                        <select
                            {...register("meal_type", { required: true })}
                            className="border-[1px] border-table-header rounded-md p-2 outline-none mb-3"
                            defaultValue=""
                        >
                            <option value="" disabled>Select meal type...</option>
                            <option value="BREAKFAST">Breakfast</option>
                            <option value="LUNCH">Lunch</option>
                            <option value="DINNER">Dinner</option>
                            <option value="SNACK">Snack</option>
                        </select>
                        <div className="flex w-full space-x-2 mb-3">
                            <div>
                                <label className="font-bold text-sm">Protein</label>
                                <input {...register("protein_amount")} type="number" step={0.1}  className="border-[1px] border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                            <div>
                                <label className="font-bold text-sm">Fat</label>
                                <input {...register("fat_amount")} type="number" step={0.1}  className="border-[1px] border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                            <div>
                                <label className="font-bold text-sm">Carbs</label>
                                <input {...register("carbs_amount")} type="number" step={0.1}  className="border-[1px] border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                        </div>
                        <label className="font-bold text-sm">Calories</label>
                        <input {...register("calories", {required: true})} type="number" className="border-[1px] border-table-header rounded-md p-2 outline-none mb-3" />
                        <button
                            className="px-3 py-1 border-2 rounded-md bg-white-new border-table-header font-bold transition-transform duration-300 hover:scale-105"
                        >
                            Add your food
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default FoodForm;