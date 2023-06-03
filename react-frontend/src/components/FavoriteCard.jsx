import foodPlaceholder from "../assets/food-placeholder.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquarePlus,
    faPenToSquare,
    faTrash,
} from "@fortawesome/free-solid-svg-icons";

const FavoriteCard = (props) => {
    return (
        <div className="flex w-full max-w-[190px] flex-col rounded-md bg-white-new p-1 drop-shadow-lg md:px-3 md:pt-2 lg:max-w-[250px]">
            <img
                className="mb-1 h-24 w-full rounded-md object-cover md:mb-2"
                src={props.favorite.meal.meal_image}
                alt={props.favorite.meal.meal_name}
                placeholder={foodPlaceholder}
            />
            <h4 className="mb-1 cursor-pointer font-heading text-sm font-bold leading-4 md:text-base md:leading-5">
                {props.favorite.meal.meal_name}
            </h4>
            <div className="mb-1 flex justify-between border-y-2 border-dark border-opacity-30 py-1 text-sm">
                <div className="flex flex-col justify-end space-y-1 sm:space-y-2">
                    <p>Serving size: </p>
                    <p>Serving weight: </p>
                    <p>Protein: </p>
                    <p>Fat: </p>
                    <p>Carbs: </p>
                    <p className="font-bold">Calories: </p>
                </div>
                <div className="flex flex-col justify-end space-y-1 text-right sm:space-y-2">
                    <p>
                        {props.favorite.serving_size
                            ? props.favorite.serving_size
                            : "-"}
                    </p>
                    <p>
                        {props.favorite.serving_weight
                            ? props.favorite.serving_weight + " g"
                            : "-"}
                    </p>
                    <p>{props.favorite.meal.protein_amount} g</p>
                    <p>{props.favorite.meal.fat_amount} g</p>
                    <p>{props.favorite.meal.carbs_amount} g</p>
                    <p className="font-bold">
                        {props.favorite.meal.calories} cal
                    </p>
                </div>
            </div>
            <div className="flex justify-around">
                <button
                    className="favorites-btn transition-color cursor-pointer items-center rounded-md p-1 duration-300 hover:border-custom-green hover:text-custom-green sm:py-2"
                    onClick={() => {
                        props.setIsLogFormOpen(true);
                        props.setFavoriteToLog(props.favorite);
                    }}
                >
                    <FontAwesomeIcon
                        fixedWidth
                        className="fa-lg"
                        icon={faSquarePlus}
                    />
                </button>
                <button
                    className="favorites-btn transition-color cursor-pointer items-center rounded-md p-1 duration-300 hover:border-[#EA7317] hover:text-[#EA7317] sm:py-2"
                    onClick={() => {
                        props.setIsEditFormOpen(true);
                        props.setFavoriteToEdit(props.favorite);
                    }}
                >
                    <FontAwesomeIcon
                        fixedWidth
                        className="fa-lg"
                        icon={faPenToSquare}
                    />
                </button>
                <button
                    className="transition-color cursor-pointer items-center rounded-md p-1 duration-300 hover:border-custom-red hover:text-custom-red sm:py-2"
                    onClick={() =>
                        props.deleteFavoriteMutation.mutate(props.favorite.id)
                    }
                >
                    <FontAwesomeIcon
                        fixedWidth
                        className="fa-lg"
                        icon={faTrash}
                    />
                </button>
            </div>
        </div>
    );
};

export default FavoriteCard;
