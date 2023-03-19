import { useForm } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

const ManageFavoritesForm = (props) => {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            meal_name: props?.favoriteToEdit ? props.favoriteToEdit.meal.meal_name : "",
            serving_size: props?.favoriteToEdit ? props.favoriteToEdit.serving_size : "",
            serving_weight: props?.favoriteToEdit ? props.favoriteToEdit.serving_weight : 0,
            protein_amount: props?.favoriteToEdit ? props.favoriteToEdit.meal.protein_amount : 0.0,
            fat_amount: props?.favoriteToEdit ? props.favoriteToEdit.meal.fat_amount : 0.0,
            carbs_amount: props?.favoriteToEdit ? props.favoriteToEdit.meal.carbs_amount : 0.0,
            calories: props?.favoriteToEdit ? props.favoriteToEdit.meal.calories : 0,
        }
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
            serving_weight: formData.serving_weight ? formData.serving_weight : null,
        });
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-[65%] z-10"></div>
            <div className="favorites-form fixed bg-white-new top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 p-7 rounded-md max-w-[500px] animate-fade-in">
                <FontAwesomeIcon icon={faXmark} className="float-right cursor-pointer fa-lg" onClick={() => props.setIsFormOpen(false)} />
                <h2 className="text-center font-heading font-bold text-lg mb-2">Add your best-loved dishes!</h2>
                <form onSubmit={handleSubmit(submitFavorites)}>
                    <div className="flex flex-col">
                        <label className="font-bold text-sm">Name</label>
                        <input
                            {...register("meal_name", { required: true })}
                            type="text"
                            className="border-[1px] border-table-header rounded-md p-2 outline-none mb-3 placeholder:italic placeholder:text-sm"
                            placeholder="Eggs, chicken breast, etc."
                        />
                        <label className="font-bold text-sm">Serving size <span className="italic">(optional)</span></label>
                        <input
                            {...register("serving_size")}
                            type="text"
                            className="border-[1px] border-table-header rounded-md p-2 outline-none mb-3 placeholder:italic placeholder:text-sm"
                            placeholder="2 teaspoons, 1 slice, etc."
                        />
                        <label className="font-bold text-sm">Serving weight <span className="italic">(optional)</span></label>
                        <input
                            {...register("serving_weight")}
                            type="number"
                            className="relative border-[1px] border-table-header rounded-md p-2 outline-none mb-3  placeholder:italic placeholder:text-sm" 
                            placeholder="100 grams"
                        />
                        <div className="flex w-full space-x-2 mb-3">
                            <div>
                                <label className="font-bold text-sm">Protein</label>
                                <input {...register("protein_amount")} type="number" step={0.1} className="border-[1px] border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                            <div>
                                <label className="font-bold text-sm">Fat</label>
                                <input {...register("fat_amount")} type="number" step={0.1} className="border-[1px] border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                            <div>
                                <label className="font-bold text-sm">Carbs</label>
                                <input {...register("carbs_amount")} type="number" step={0.1} className="border-[1px] border-table-header rounded-md p-2 outline-none w-full" />
                            </div>
                        </div>
                        <label className="font-bold text-sm">Calories</label>
                        <input {...register("calories", { required: true })} type="number" className="border-[1px] border-table-header rounded-md p-2 outline-none mb-3" />
                        <button
                            className="px-3 py-1 border-2 rounded-md bg-white-new border-table-header font-bold transition-transform duration-300 hover:scale-105"
                        >
                            {props?.favoriteToEdit ? "Update" : "Add"} favorite
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default ManageFavoritesForm;