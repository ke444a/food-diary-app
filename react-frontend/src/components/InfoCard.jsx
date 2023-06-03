import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import { customAxios } from "../customAxios";
import defaultAvatar from "../assets/user-img.webp";

const InfoCard = (props) => {
    const [caloriesTotal, setCaloriesTotal] = useState(0);
    const [proteinTotal, setProteinTotal] = useState(0);
    const [fatTotal, setFatTotal] = useState(0);
    const [carbsTotal, setCarbsTotal] = useState(0);

    const fetchResult = useQuery({
        queryKey: ["logs", props.date, props.user.id],
        queryFn: () =>
            customAxios
                .get("/logs/", {
                    params: {
                        user_id: props.user.id,
                        date: props.date.toISOString().split("T")[0],
                    },
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => res.data),
        onSuccess: (data) => {
            const calories = data.reduce(
                (accumulator, logCurrent) =>
                    accumulator + Number(logCurrent.meal.calories),
                0
            );
            const protein = data
                .reduce(
                    (accumulator, logCurrent) =>
                        accumulator +
                        parseFloat(logCurrent.meal.protein_amount),
                    0.0
                )
                .toFixed(1);
            const fat = data
                .reduce(
                    (accumulator, logCurrent) =>
                        accumulator + parseFloat(logCurrent.meal.fat_amount),
                    0.0
                )
                .toFixed(1);
            const carbs = data
                .reduce(
                    (accumulator, logCurrent) =>
                        accumulator + parseFloat(logCurrent.meal.carbs_amount),
                    0.0
                )
                .toFixed(1);

            setCaloriesTotal(calories);
            setProteinTotal(protein);
            setFatTotal(fat);
            setCarbsTotal(carbs);
        },
    });

    return (
        <div className="relative mb-4 h-fit w-[60%] rounded-lg bg-white-new drop-shadow-md min-[500px]:mb-0 min-[500px]:w-1/3 2xl:w-1/4">
            <div className="flex flex-col justify-center px-2 py-3 text-center min-[500px]:py-5 md:py-6 lg:px-4">
                <Link
                    to="/profile"
                    className="absolute top-4 right-1 hidden transition-transform hover:scale-105 min-[500px]:block sm:top-6 sm:right-2 lg:right-4"
                >
                    <FontAwesomeIcon
                        className="text-sm lg:text-base"
                        icon={faPenToSquare}
                        fixedWidth
                    />
                </Link>
                <img
                    className="mb-2 h-20 w-20 self-center rounded-[50%] object-cover min-[500px]:h-auto min-[500px]:w-auto md:mb-3 md:h-40 md:w-40 lg:h-48 lg:w-48"
                    src={props.user?.profile_img || defaultAvatar}
                    alt="Profile image"
                />
                <h1 className="mb-4 hidden font-heading text-base font-medium min-[500px]:block md:text-lg lg:text-xl">
                    {props.fullName}
                </h1>
                {fetchResult.isSuccess && (
                    <>
                        <div className="mb-3 flex justify-between leading-4">
                            <div className="mr-1 flex flex-col">
                                <p className="text-sm md:text-base">
                                    {caloriesTotal}
                                </p>
                                <p className="text-xs leading-3 opacity-50 lg:text-sm">
                                    Total consumed
                                </p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm md:text-base">
                                    {props.caloriesGoal}
                                </p>
                                <p className="text-xs leading-3 opacity-50 lg:text-sm">
                                    Daily limit
                                </p>
                            </div>
                        </div>
                        <progress
                            id="calories-bar"
                            className="h-2 w-full"
                            value={caloriesTotal}
                            max={props.caloriesGoal}
                        ></progress>
                        <label
                            htmlFor="calories-bar"
                            className="text-left text-xs md:text-sm"
                        >
                            {(
                                (caloriesTotal / props.caloriesGoal) *
                                100
                            ).toFixed(0)}
                            %
                        </label>
                        <div className="mt-2 flex justify-around space-x-1 min-[500px]:flex-col min-[500px]:space-x-1 min-[500px]:space-y-2 md:mt-4 md:flex-row md:space-y-0">
                            <div>
                                <h4 className="text-sm font-medium md:text-base">
                                    {proteinTotal}
                                </h4>
                                <p className="text-xs leading-3 opacity-50 md:text-sm">
                                    Protein (g)
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium md:text-base">
                                    {fatTotal}
                                </h4>
                                <p className="text-xs leading-3 opacity-50 md:text-sm">
                                    Fat (g)
                                </p>
                            </div>
                            <div>
                                <h4 className="text-sm font-medium md:text-base">
                                    {carbsTotal}
                                </h4>
                                <p className="text-xs leading-3 opacity-50 md:text-sm">
                                    Carbs (g)
                                </p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InfoCard;
