import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import foodPlaceholder from "../assets/food-placeholder.webp";

const MealInfo = ({ food, setShowInfoItem }) => {
    return (
        <>
            <div className="fixed inset-0 z-10 bg-black bg-opacity-[65%]"></div>
            <div className="food-item fixed top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2 animate-fade-in rounded-md bg-white py-2 px-4">
                <div>
                    <div className="mb-1 flex items-center justify-between md:mb-2">
                        <h4 className="font-heading font-bold">
                            {food.meal_name}
                        </h4>
                        <FontAwesomeIcon
                            icon={faXmark}
                            onClick={() => setShowInfoItem(-1)}
                            className="fa-xl cursor-pointer hover:scale-110 hover:text-custom-red"
                        />
                    </div>
                    <img
                        className="h-56 w-56 object-cover"
                        src={food.meal_image}
                        alt={food.meal_name}
                        placeholder={foodPlaceholder}
                    />
                    <div className="mt-2 mb-1">
                        <div className="flex justify-between border-t-[1px] border-dark border-opacity-30 py-1 text-sm">
                            <div className="flex flex-col justify-end space-y-2">
                                <p>Protein: </p>
                                <p>Fat: </p>
                                <p>Carbs: </p>
                                <p className="font-bold">Calories: </p>
                            </div>
                            <div className="flex flex-col justify-end space-y-2 text-right">
                                <p>{food.protein_amount} g</p>
                                <p>{food.fat_amount} g</p>
                                <p>{food.carbs_amount} g</p>
                                <p className="font-bold">{food.calories} cal</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default MealInfo;
