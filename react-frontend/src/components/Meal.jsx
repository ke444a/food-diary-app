import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import axios from "axios";

const Meal = (props) => {
    const {data: logsData, ...fetchResult} = useQuery(
        {
            queryKey: ["meal", props.mealType],
            queryFn: () => axios.get("/api/logs/", 
                { 
                    params: { 
                        user_id: props.userId, meal_type: props.mealType.toUpperCase()
                    },
                    headers: {
                        "Authorization": `Token ${localStorage.getItem("token")}`
                    }
                }
            ).then(res => res.data),
        }
    );

    return (
        <div className="mb-4">
            <div className="flex justify-between items-end p-2">
                <h3 className="font-heading font-medium">
                    <FontAwesomeIcon fixedWidth size="lg" icon={props.icon} className="mr-1" />
                    {props.mealType}
                </h3>
            </div>
            <div className="bg-white rounded-b-lg">
                <table className="text-left table-fixed w-full">
                    <thead className="bg-table-header text-white">
                        <tr>
                            <th className="w-[40%]">Food</th>
                            <th>Protein (g)</th>
                            <th>Fat (g)</th>
                            <th>Carbs (g)</th>
                            <th>Calories (kcal)</th>
                        </tr>
                    </thead>
                    <tbody>
                        {fetchResult.isSuccess && logsData.length > 0 && logsData.map(log => {
                            const food = log.meal;
                            return (
                                <tr key={food.id}>
                                    <td className="w-[40%]">{food.meal_name}</td>
                                    <td>{food.protein_amount}</td>
                                    <td>{food.fat_amount}</td>
                                    <td>{food.carbs_amount}</td>
                                    <td>{food.calories}</td>
                                </tr>
                            );
                        })}
                        <tr className="border-t-4 font-bold">
                            <td className="w-[40%]">Total</td>
                            <td>{logsData && logsData.length > 0 ? logsData.reduce((accumulator, logCurrent) => accumulator + parseFloat(logCurrent.meal.protein_amount), 0.0).toFixed(1) : "0.0"}</td>
                            <td>{logsData && logsData.length > 0 ? logsData.reduce((accumulator, logCurrent) => accumulator + parseFloat(logCurrent.meal.fat_amount), 0.0).toFixed(1) : "0.0"}</td>
                            <td>{logsData && logsData.length > 0 ? logsData.reduce((accumulator, logCurrent) => accumulator + parseFloat(logCurrent.meal.carbs_amount), 0.0).toFixed(1) : "0.0"}</td>
                            <td>{logsData && logsData.length > 0 ? logsData.reduce((accumulator, logCurrent) => accumulator + Number(logCurrent.meal.calories), 0) : "0"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Meal;