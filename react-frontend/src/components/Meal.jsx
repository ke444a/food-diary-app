import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useMutation } from "react-query";
import axios from "axios";
import { faChevronRight, faCircleInfo, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
// import MealInfo from "./MealInfo";


const Meal = (props) => {
    const [isActive, setIsActive] = useState(true);
    const [showInfoItem, setShowInfoItem] = useState(-1);

    const {data: logsData, ...fetchResult} = useQuery(
        {
            queryKey: ["meal", props.mealType, props.date],
            queryFn: () => axios.get("/api/logs/", 
                { 
                    params: { 
                        user_id: props.userId, meal_type: props.mealType.toUpperCase(), date: props.date.toISOString().split("T")[0]
                    },
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                }).then(res => res.data),
        }
    );

    const deleteLogMutation = useMutation({
        mutationFn: (logId) => axios({
            method: "DELETE",
            url: `/api/logs/${logId}/`,
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }
        }).then(res => res.data),
        onSuccess: () => {
            fetchResult.refetch();
        }
    });

    return (
        <div>
            <div 
                className={`flex items-center justify-between p-2 bg-none rounded-sm border-[1px] border-dark cursor-pointer transition-color duration-300 ${isActive && "bg-table-header text-white-new"}`}
                onClick={() => setIsActive(!isActive)}
            >
                <div className="flex items-start">
                    <FontAwesomeIcon fixedWidth icon={props.icon} className="mr-1 text-base sm:text-lg" />
                    <h3 className="font-heading font-medium text-sm sm:text-base">
                        {props.mealType}
                    </h3>
                </div>
                <FontAwesomeIcon fixedWidth icon={faChevronRight} 
                    className={`cursor-pointer transition-transform duration-300 min-[500px]:text-lg ${isActive && "rotate-90"}`} 
                />
            </div>
            {isActive && (
                <div className="bg-white-new rounded-b-lg animate-fade-in mb-2 md:px-4">
                    <ul>
                        {fetchResult.isSuccess && logsData.length > 0 && logsData.map((log, index) => {
                            const food = log.meal;
                            const isShowInfo = showInfoItem === index;
                            return (
                                <li className="flex flex-col p-2 md:px-4 border-b-[1px] border-dark/[.3] last:border-b-0" key={food.id}>
                                    <div className="flex justify-between items-center">
                                        <p 
                                            className="text-sm min-[500px]:text-base cursor-pointer transition hover:underline"
                                            onClick={() => setShowInfoItem(isShowInfo ? -1 : index)}
                                        >
                                            {food.meal_name}
                                        </p>
                                        <div className="flex items-center">
                                            <p className="font-bold text-custom-green text-lg md:text-xl">{food.calories} cal</p>
                                            <FontAwesomeIcon fixedWidth icon={faCircleInfo} className="fa-lg ml-3 md:ml-4 cursor-pointer transition-color hover:scale-105 hover:text-[#05668D]" onClick={() => setShowInfoItem(isShowInfo ? -1 : index)} />
                                            <FontAwesomeIcon fixedWidth icon={faXmarkCircle} className="fa-lg ml-1 md:ml-2 cursor-pointer transition-color hover:scale-105 hover:text-custom-red" onClick={() => deleteLogMutation.mutate(log.id)} />
                                        </div>
                                    </div>
                                    {/* {isShowInfo && <MealInfo food={food} />} */}
                                </li>
                            );
                        })}
                    </ul>
                </div> 
            )}
        </div>
    );
};

export default Meal;