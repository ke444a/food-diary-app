import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ManageFavoritesForm = (props) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        defaultValues: {
            meal_name: props?.favoriteToEdit
                ? props.favoriteToEdit.meal.meal_name
                : "",
            serving_size: props?.favoriteToEdit
                ? props.favoriteToEdit.serving_size
                : "",
            serving_weight: props?.favoriteToEdit
                ? props.favoriteToEdit.serving_weight
                : 0,
            protein_amount: props?.favoriteToEdit
                ? props.favoriteToEdit.meal.protein_amount
                : 0.0,
            fat_amount: props?.favoriteToEdit
                ? props.favoriteToEdit.meal.fat_amount
                : 0.0,
            carbs_amount: props?.favoriteToEdit
                ? props.favoriteToEdit.meal.carbs_amount
                : 0.0,
            calories: props?.favoriteToEdit
                ? props.favoriteToEdit.meal.calories
                : 0,
        },
    });

    const submitFavorites = (formData) => {
        props.setIsFormOpen(false);
        props.manageFavorite.mutate({
            id: props?.favoriteToEdit ? props.favoriteToEdit.id : undefined,
            meal: {
                meal_name: formData.meal_name,
                protein_amount: formData.protein_amount,
                fat_amount: formData.fat_amount,
                carbs_amount: formData.carbs_amount,
                calories: formData.calories,
            },
            serving_size: formData.serving_size ? formData.serving_size : null,
            serving_weight: formData.serving_weight
                ? formData.serving_weight
                : null,
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
                <h2 className="mb-2 text-center font-heading text-lg font-bold">
                    Add your best-loved dishes!
                </h2>
                <form onSubmit={handleSubmit(submitFavorites)}>
                    <div className="flex flex-col">
                        <label className="text-sm font-bold">Name</label>
                        <input
                            {...register("meal_name", { required: true })}
                            type="text"
                            className="rounded-md border-[1px] border-dark p-2 outline-none placeholder:text-sm placeholder:italic"
                            placeholder="Eggs, chicken breast, etc."
                        />
                        {errors.meal_name && (
                            <p className="mt-1 text-sm leading-3 text-custom-red">
                                This field is required
                            </p>
                        )}
                        <label className="mt-3 text-sm font-bold">
                            Serving size{" "}
                            <span className="italic">(optional)</span>
                        </label>
                        <input
                            {...register("serving_size")}
                            type="text"
                            className="mb-3 rounded-md border-[1px] border-dark p-2 outline-none placeholder:text-sm placeholder:italic"
                            placeholder="2 teaspoons, 1 slice, etc."
                        />
                        <label className="text-sm font-bold">
                            Serving weight{" "}
                            <span className="italic">(optional)</span>
                        </label>
                        <input
                            {...register("serving_weight")}
                            type="number"
                            className="relative mb-3 rounded-md border-[1px] border-dark p-2 outline-none  placeholder:text-sm placeholder:italic"
                            placeholder="100 grams"
                        />
                        <div className="flex w-full space-x-2">
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
                            errors.carbs_amount ||
                            errors.fat_amount) && (
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
                            {props?.favoriteToEdit ? "Update" : "Add"} favorite
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ManageFavoritesForm;
