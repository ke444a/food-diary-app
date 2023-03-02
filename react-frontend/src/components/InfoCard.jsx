import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { useState } from "react";
import axios from "axios";

const InfoCard = (props) => {
    const [date, setDate] = useState(new Date().getFullYear().toString() + "-" + (new Date().getMonth() + 1).toString().padStart(2, "0") + "-" + new Date().getDate().toString().padStart(2, "0"));
    const [caloriesTotal, setCaloriesTotal] = useState(0);
    const [proteinTotal, setProteinTotal] = useState(0);
    const [fatTotal, setFatTotal] = useState(0);
    const [carbsTotal, setCarbsTotal] = useState(0);

    const fetchResult = useQuery(
        {
            queryKey: ["logs", date, props.userId],
            queryFn: () => axios.get("/api/logs/",
                {
                    params: { 
                        user_id: props.userId, 
                        // date: date
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
        <div className="relative w-1/3 bg-white-new rounded-lg h-fit">
            <div className="flex flex-col justify-center px-4 py-6 text-center">
                <Link to="/profile" className="absolute top-6 right-4">
                    <FontAwesomeIcon icon={faPenToSquare} fixedWidth />
                </Link>
                <img className="w-48 h-48 rounded-[50%] mb-3 self-center" src="https://picsum.photos/200" />
                <h1 className="text-lg lg:text-xl font-medium font-heading mb-4">{props.fullName}</h1>
                { fetchResult.isSuccess && (
                    <>
                        <div className="flex justify-between -mb-1">
                            <p>{caloriesTotal}</p>
                            <p>{props.caloriesGoal}</p>
                        </div>
                        <div className="flex justify-between text-sm opacity-50 leading-4 mb-3">
                            <p>Total consumed</p>
                            <p>Daily limit</p>
                        </div>
                        <progress id="calories-bar" className="w-full h-2" value={caloriesTotal} max={props.caloriesGoal}></progress>
                        <label htmlFor="calories-bar" className="text-sm text-left">{(caloriesTotal/props.caloriesGoal*100).toFixed(0)}%</label>
                        <div className="flex justify-around mt-4">
                            <div>
                                <h4 className="font-medium">{proteinTotal} g</h4>
                                <p className="text-sm opacity-50">Protein</p>
                            </div>
                            <div>
                                <h4 className="font-medium">{fatTotal} g</h4>
                                <p className="text-sm opacity-50">Fat</p>
                            </div>
                            <div>
                                <h4 className="font-medium">{carbsTotal} g</h4>
                                <p className="text-sm opacity-50">Carbs</p>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default InfoCard;