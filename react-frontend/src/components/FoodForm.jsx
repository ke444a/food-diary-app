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
            carb_amount: 0.0,
            calories_amount: 0,
        }
    });
    const queryClient = useQueryClient();
    const foodMutation = useMutation(
        formData => axios.post("http://127.0.0.1:8000/food_api/v1/meal/", formData).then(response => console.log(response)), {
            onSuccess: () => {
                queryClient.invalidateQueries(["meal"]);
            }
        }
    );

    const submitFoodForm = (foodData) => {
        props.setIsFormOpen(false);
        foodMutation.mutate(foodData);
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
            <div className="food-form fixed bg-white-new top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-7 rounded-md max-w-[500px] animate-fade-in">
                <FontAwesomeIcon icon={faXmark} className="float-right cursor-pointer fa-lg" onClick={() => props.setIsFormOpen(false)} />
                <h2 className="text-center font-heading font-bold text-lg mb-2">It is time to eat something!</h2>
                <form onSubmit={handleSubmit(submitFoodForm)}>
                    <div className="flex flex-col">
                        <label className="font-bold text-sm">Name</label>
                        <input
                            {...register("meal_name", {required: true})}
                            type="text"
                            className="border-2 border-table-header rounded-md p-2 outline-none mb-3"
                        />
                        <label className="font-bold text-sm">Meal type</label>
                        <select
                            {...register("meal_type")}
                            className="border-2 border-table-header rounded-md p-2 outline-none mb-3"
                            defaultValue=""
                        >
                            <option value="" disabled>Select meal type...</option>
                            <option value="Breakfast">Breakfast</option>
                            <option value="Lunch">Lunch</option>
                            <option value="Dinner">Dinner</option>
                            <option value="Snack">Snack</option>
                        </select>
                        <div className="flex w-full space-x-2 mb-3">
                            <div>
                                <label className="font-bold text-sm">Protein</label>
                                <input {...register("protein_amount")} type="number" step={0.1}  className="border-2 border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                            <div>
                                <label className="font-bold text-sm">Fat</label>
                                <input {...register("fat_amount")} type="number" step={0.1}  className="border-2 border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                            <div>
                                <label className="font-bold text-sm">Carbs</label>
                                <input {...register("carbs_amount")} type="number" step={0.1}  className="border-2 border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                        </div>
                        <label className="font-bold text-sm">Calories</label>
                        <input {...register("calories", {required: true})} type="number" className="border-2 border-table-header rounded-md p-2 outline-none mb-3" />
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