import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import { useState } from "react";

const LogFavoritesForm = (props) => {
    const [proteinAmount, setProteinAmount] = useState(
        props.favoriteToLog.meal.protein_amount
    );
    const [fatAmount, setFatAmount] = useState(
        props.favoriteToLog.meal.fat_amount
    );
    const [carbsAmount, setCarbsAmount] = useState(
        props.favoriteToLog.meal.carbs_amount
    );
    const [calories, setCalories] = useState(props.favoriteToLog.meal.calories);
    const [servingWeight, setServingWeight] = useState(
        props.favoriteToLog.serving_weight
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            serving_weight: props.favoriteToLog.serving_weight,
        },
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
            <div className="fixed inset-0 z-10 bg-black bg-opacity-[65%]"></div>
            <div className="favorites-form fixed top-1/2 left-1/2 z-20 max-w-[500px] -translate-x-1/2 -translate-y-1/2 animate-fade-in rounded-md bg-white-new p-7">
                <FontAwesomeIcon
                    icon={faXmark}
                    className="fa-lg float-right cursor-pointer"
                    onClick={() => props.setIsFormOpen(false)}
                />
                <h3 className="mb-2 pb-1 font-heading leading-5">
                    {props.favoriteToLog.meal.meal_name}
                </h3>
                <form onSubmit={handleSubmit(logFavorites)}>
                    <div className="flex flex-col">
                        <label className="text-sm font-bold">
                            Serving weight
                        </label>
                        <div className="mb-2 rounded-md border-[1px] border-dark bg-white p-2">
                            <input
                                {...register("serving_weight")}
                                type="number"
                                className="mr-1 focus:outline-none"
                                value={servingWeight}
                                onChange={(e) => {
                                    setServingWeight(e.target.value);
                                    setProteinAmount(
                                        (
                                            (e.target.value /
                                                props.favoriteToLog
                                                    .serving_weight) *
                                            props.favoriteToLog.meal
                                                .protein_amount
                                        ).toFixed(1)
                                    );
                                    setFatAmount(
                                        (
                                            (e.target.value /
                                                props.favoriteToLog
                                                    .serving_weight) *
                                            props.favoriteToLog.meal.fat_amount
                                        ).toFixed(1)
                                    );
                                    setCarbsAmount(
                                        (
                                            (e.target.value /
                                                props.favoriteToLog
                                                    .serving_weight) *
                                            props.favoriteToLog.meal
                                                .carbs_amount
                                        ).toFixed(1)
                                    );
                                    setCalories(
                                        (
                                            (e.target.value /
                                                props.favoriteToLog
                                                    .serving_weight) *
                                            props.favoriteToLog.meal.calories
                                        ).toFixed(0)
                                    );
                                }}
                            />
                            <span className="text-sm font-medium opacity-60">
                                grams
                            </span>
                        </div>
                        <label className="text-sm font-bold">Meal type</label>
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
                        <div className="mb-4 mt-3 flex flex-col space-y-2 font-medium">
                            <p>
                                <span className="font-normal italic">
                                    Protein:
                                </span>{" "}
                                {proteinAmount} g
                            </p>
                            <p>
                                <span className="font-normal italic">Fat:</span>{" "}
                                {fatAmount} g
                            </p>
                            <p>
                                <span className="font-normal italic">
                                    Carbs:
                                </span>{" "}
                                {carbsAmount} g
                            </p>
                            <p>
                                <span className="font-normal italic">
                                    Total calories:
                                </span>{" "}
                                {calories} cal
                            </p>
                        </div>
                        <button className="rounded-md border-2 border-dark bg-white-new px-3 py-1 font-bold transition-transform duration-300 hover:scale-105">
                            Log favorite
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default LogFavoritesForm;
