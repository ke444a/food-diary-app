import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import { useMutation, useQueryClient } from "react-query";
import { useState } from "react";

const FoodForm = (props) => {
    const [formData, setFormData] = useState({});

    const queryClient = useQueryClient();
    const mutation = useMutation(
        formData => axios.post("http://127.0.0.1:8000/food_api/v1/meal/", formData).then(response => console.log(response)), {
            onSuccess: () => {
                queryClient.invalidateQueries(["meal"]);
            }
        }
    );

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({ ...prevFormData, [name]: value }));
    };

    const handleSelectChange = (e) => {
        setFormData(prevFormData => ({ ...prevFormData, meal_type: e.target.value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        props.setIsFormOpen(false);
        mutation.mutate(formData);
    };


    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-10"></div>
            <div className="food-form fixed bg-white-new top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-7 rounded-md max-w-[500px] animate-fade-in">
                <FontAwesomeIcon icon={faXmark} className="float-right cursor-pointer fa-lg" onClick={() => props.setIsFormOpen(false)} />
                <h2 className="text-center font-heading font-bold text-lg mb-2">It is time to eat something!</h2>
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label className="font-bold text-sm" htmlFor="name">Name</label>
                        <input
                            type="text"
                            name="name"
                            id="name"
                            onChange={handleChange}
                            className="border-2 border-table-header rounded-md p-2 outline-none mb-3"
                        />
                        <label className="font-bold text-sm" htmlFor="meal_type">Meal type</label>
                        <select
                            name="meal_type"
                            id="meal_type"
                            className="border-2 border-table-header rounded-md p-2 outline-none mb-3"
                            onChange={handleSelectChange}
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
                                <label className="font-bold text-sm" htmlFor="protein_amount">Protein</label>
                                <input type="number" name="protein_amount" id="protein_amount" onChange={handleChange} className="border-2 border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                            <div>
                                <label className="font-bold text-sm" htmlFor="fat_amount">Fat</label>
                                <input type="number" name="fat_amount" id="fat_amount" onChange={handleChange} className="border-2 border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                            <div>
                                <label className="font-bold text-sm" htmlFor="carbs_amount">Carbs</label>
                                <input type="number" name="carbs_amount" id="carbs_amount" onChange={handleChange} className="border-2 border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                        </div>
                        <label className="font-bold text-sm" htmlFor="calories">Calories</label>
                        <input type="number" name="calories" id="calories" onChange={handleChange} className="border-2 border-table-header rounded-md p-2 outline-none mb-3" />
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