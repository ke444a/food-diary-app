import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";

const InfoCard = (props) => {
    const [caloriesTotal, setCaloriesTotal] = useState(0);
    const [proteinTotal, setProteinTotal] = useState(0);
    const [fatTotal, setFatTotal] = useState(0);
    const [carbsTotal, setCarbsTotal] = useState(0);

    const fetchResult = useQuery(
        {
            queryKey: ["logs", props.date, props.user.id],
            queryFn: () => axios.get("/api/logs/",
                {
                    params: { 
                        user_id: props.user.id, 
                        date: props.date.toISOString().split("T")[0]
                    },
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                }
            ).then(res => res.data),
            onSuccess: (data) => {
                const calories = data.reduce((accumulator, logCurrent) => accumulator + Number(logCurrent.meal.calories), 0);
                const protein = data.reduce((accumulator, logCurrent) => accumulator + parseFloat(logCurrent.meal.protein_amount), 0.0).toFixed(1);
                const fat = data.reduce((accumulator, logCurrent) => accumulator + parseFloat(logCurrent.meal.fat_amount), 0.0).toFixed(1);
                const carbs = data.reduce((accumulator, logCurrent) => accumulator + parseFloat(logCurrent.meal.carbs_amount), 0.0).toFixed(1);

                setCaloriesTotal(calories);
                setProteinTotal(protein);
                setFatTotal(fat);
                setCarbsTotal(carbs);
            }
        }
    );

    return (
        <div className="relative w-[60%] min-[500px]:w-1/3 2xl:w-1/4 bg-white-new rounded-lg h-fit drop-shadow-md mb-4 min-[500px]:mb-0">
            <div className="flex flex-col justify-center px-2 lg:px-4 py-3 min-[500px]:py-5 md:py-6 text-center">
                <Link to="/profile" className="hidden min-[500px]:block absolute top-4 right-1 sm:top-6 sm:right-2 lg:right-4 transition-transform hover:scale-105">
                    <FontAwesomeIcon className="text-sm lg:text-base" icon={faPenToSquare} fixedWidth />
                </Link>
                <img className="hidden min-[500px]:block w-20 h-20 min-[500px]:w-auto min-[500px]:h-auto md:w-40 md:h-40 lg:w-48 lg:h-48 rounded-[50%] mb-2 md:mb-3 self-center object-cover" src={props.user.profile_img} />
                <h1 className="hidden min-[500px]:block text-base md:text-lg lg:text-xl font-medium font-heading mb-4">{props.fullName}</h1>
                { fetchResult.isSuccess && (
                    <>
                        <div className="flex justify-between leading-4 mb-3">
                            <div className="flex flex-col mr-1">
                                <p className="text-sm md:text-base">{caloriesTotal}</p>
                                <p className="text-xs lg:text-sm opacity-50 leading-3">Total consumed</p>
                            </div>
                            <div className="flex flex-col">
                                <p className="text-sm md:text-base">{props.caloriesGoal}</p>
                                <p className="text-xs lg:text-sm opacity-50 leading-3">Daily limit</p>
                            </div>
                        </div>
                        <progress id="calories-bar" className="w-full h-2" value={caloriesTotal} max={props.caloriesGoal}></progress>
                        <label htmlFor="calories-bar" className="text-xs md:text-sm text-left">{(caloriesTotal/props.caloriesGoal*100).toFixed(0)}%</label>
                        <div className="flex space-x-1 min-[500px]:space-x-1 min-[500px]:flex-col min-[500px]:space-y-2 md:space-y-0 md:flex-row justify-around mt-2 md:mt-4">
                            <div>
                                <h4 className="font-medium text-sm md:text-base">{proteinTotal}</h4>
                                <p className="text-xs md:text-sm opacity-50 leading-3">Protein (g)</p>
                            </div>
                            <div>
                                <h4 className="font-medium text-sm md:text-base">{fatTotal}</h4>
                                <p className="text-xs md:text-sm opacity-50 leading-3">Fat (g)</p>
                            </div>
                            <div> 
                                <h4 className="font-medium text-sm md:text-base">{carbsTotal}</h4>
                                <p className="text-xs md:text-sm opacity-50 leading-3">Carbs (g)</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InfoCard;