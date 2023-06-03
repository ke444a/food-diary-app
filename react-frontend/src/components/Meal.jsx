import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { customAxios } from "../customAxios";
import {
    faChevronRight,
    faCircleInfo,
    faXmarkCircle,
    faSeedling,
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import MealInfo from "./MealInfo";
import { useNavigate } from "react-router-dom";

const Meal = (props) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState(true);
    const [showInfoItem, setShowInfoItem] = useState(-1);
    const queryClient = useQueryClient();

    const { data: logsData, ...fetchResult } = useQuery({
        queryKey: ["meal", props.mealType, props.date],
        queryFn: () =>
            customAxios
                .get("/logs/", {
                    params: {
                        user_id: props.userId,
                        meal_type: props.mealType.toUpperCase(),
                        date: props.date.toISOString().split("T")[0],
                    },
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                })
                .then((res) => res.data),
        onError: (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        },
    });

    const deleteLogMutation = useMutation({
        mutationFn: (logId) =>
            customAxios({
                method: "DELETE",
                url: `/logs/${logId}/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            }).then((res) => res.data),
        onSuccess: () => {
            fetchResult.refetch();
            queryClient.invalidateQueries(["logs", props.date]);
        },
    });

    return (
        <div>
            <div
                className={`transition-color flex cursor-pointer items-center justify-between rounded-sm bg-none p-2 duration-300 mb-1 ${
                    isActive
                        ? "drop-shadow-xl bg-white-new"
                        : "border-[1px] border-dark"
                }`}
                onClick={() => setIsActive(!isActive)}
            >
                <div className="flex items-start">
                    <FontAwesomeIcon
                        fixedWidth
                        icon={props.icon}
                        className="mr-1 text-base sm:text-lg"
                    />
                    <h3 className="font-heading text-sm font-medium sm:text-base">
                        {props.mealType}
                    </h3>
                </div>
                <FontAwesomeIcon
                    fixedWidth
                    icon={faChevronRight}
                    className={`cursor-pointer transition-transform duration-300 min-[500px]:text-lg ${
                        isActive && "rotate-90"
                    }`}
                />
            </div>
            {isActive && (
                <div className="mb-2 animate-fade-in rounded-b-lg bg-[#E1E6EC]">
                    <ul>
                        {fetchResult.isSuccess &&
                            logsData.length > 0 &&
                            logsData.map((log, index) => {
                                const food = log.meal;
                                const isShowInfo = showInfoItem === index;
                                return (
                                    <li
                                        className="flex flex-col border-b-[1px] border-dark/[.3] p-2 last:border-b-0"
                                        key={food.id}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div
                                                className="flex cursor-pointer items-center"
                                                onClick={() =>
                                                    setShowInfoItem(
                                                        isShowInfo ? -1 : index
                                                    )
                                                }
                                            >
                                                <FontAwesomeIcon
                                                    fixedWidth
                                                    icon={faSeedling}
                                                    className="mr-1"
                                                />
                                                <p className="text-sm transition hover:underline min-[500px]:text-base">
                                                    {food.meal_name}
                                                </p>
                                            </div>
                                            <div className="flex items-center">
                                                <p className="text-lg font-bold text-custom-green md:text-xl">
                                                    {food.calories} cal
                                                </p>
                                                <FontAwesomeIcon
                                                    fixedWidth
                                                    icon={faCircleInfo}
                                                    className="fa-lg transition-color ml-3 cursor-pointer hover:scale-105 hover:text-[#05668D] md:ml-4"
                                                    onClick={() =>
                                                        setShowInfoItem(
                                                            isShowInfo
                                                                ? -1
                                                                : index
                                                        )
                                                    }
                                                />
                                                <FontAwesomeIcon
                                                    fixedWidth
                                                    icon={faXmarkCircle}
                                                    className="fa-lg transition-color ml-1 cursor-pointer hover:scale-105 hover:text-custom-red md:ml-2"
                                                    onClick={() =>
                                                        deleteLogMutation.mutate(
                                                            log.id
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        {isShowInfo && (
                                            <MealInfo
                                                food={food}
                                                setShowInfoItem={
                                                    setShowInfoItem
                                                }
                                            />
                                        )}
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
