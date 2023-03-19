import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useState } from "react";

const LogFavoritesForm = (props) => {
    const [proteinAmount, setProteinAmount] = useState(props.favoriteToLog.meal.protein_amount);
    const [fatAmount, setFatAmount] = useState(props.favoriteToLog.meal.fat_amount);
    const [carbsAmount, setCarbsAmount] = useState(props.favoriteToLog.meal.carbs_amount);
    const [calories, setCalories] = useState(props.favoriteToLog.meal.calories);
    const [servingWeight, setServingWeight] = useState(props.favoriteToLog.serving_weight);

    const { register, handleSubmit } = useForm({
        defaultValues: {
            serving_weight: props.favoriteToLog.serving_weight,
        }
    });

    const logFavorites = (formData) => {
        props.setIsFormOpen(false);
        props.logFavorite.mutate({
            meal: {
                meal_name: props.favoriteToLog.meal.meal_name,
                protein_amount: proteinAmount,
                fat_amount: fatAmount,
                carbs_amount: carbsAmount,
                calories: calories,
            },
            meal_type: formData.meal_type,
        });
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-[65%] z-10"></div>
            <div className="favorites-form fixed bg-white-new top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-7 rounded-md max-w-[500px] animate-fade-in">
                <FontAwesomeIcon icon={faXmark} className="float-right cursor-pointer fa-lg" onClick={() => props.setIsFormOpen(false)} />
                <h3 className="font-heading mb-2 pb-1 leading-5 mb-2">{props.favoriteToLog.meal.meal_name}</h3>
                <form onSubmit={handleSubmit(logFavorites)}>
                    <div className="flex flex-col">
                        <label className="font-bold text-sm">Serving weight</label>
                        <div className="border-[1px] border-table-header p-2 rounded-md bg-white mb-2">
                            <input
                                {...register("serving_weight")}
                                type="number"
                                className="focus:outline-none mr-1"
                                value={servingWeight}
                                onChange={(e) => {
                                    setServingWeight(e.target.value);
                                    setProteinAmount((e.target.value / props.favoriteToLog.serving_weight * props.favoriteToLog.meal.protein_amount).toFixed(1));
                                    setFatAmount((e.target.value / props.favoriteToLog.serving_weight * props.favoriteToLog.meal.fat_amount).toFixed(1));
                                    setCarbsAmount((e.target.value / props.favoriteToLog.serving_weight * props.favoriteToLog.meal.carbs_amount).toFixed(1));
                                    setCalories((e.target.value / props.favoriteToLog.serving_weight * props.favoriteToLog.meal.calories).toFixed(0));
                                }}
                            />
                            <span className="font-medium opacity-60 text-sm">grams</span>
                        </div>
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
                        <div className="mb-4 flex flex-col space-y-2 font-medium">
                            <p><span className="italic font-normal">Protein:</span> {proteinAmount} g</p>
                            <p><span className="italic font-normal">Fat:</span> {fatAmount} g</p>
                            <p><span className="italic font-normal">Carbs:</span> {carbsAmount} g</p>
                            <p><span className="italic font-normal">Total calories:</span> {calories} cal</p>
                        </div>
                        <button
                            className="px-3 py-1 border-2 rounded-md bg-white-new border-table-header font-bold transition-transform duration-300 hover:scale-105"
                        >
                        Log favorite
                        </button>
                    </div>
                </form>
            </div>
        </>    );
};

export default LogFavoritesForm;