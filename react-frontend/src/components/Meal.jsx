import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useQuery } from "react-query";
import axios from "axios";

const Meal = (props) => {
    const {data: mealData, ...fetchResult} = useQuery(
        {
            queryKey: ["meal", props.mealType],
            queryFn: () => axios.get(`http://127.0.0.1:8000/food_api/v1/meal?meal_type=${props.mealType}`).then(res => res.data),
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
                        {fetchResult.isSuccess && mealData.length > 0 && mealData.map(food => {
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
                            <td>{mealData && mealData.length > 0 ? mealData.reduce((accumulator, foodCurrent) => accumulator + parseFloat(foodCurrent.protein_amount), 0.0).toFixed(1) : "0.0"}</td>
                            <td>{mealData && mealData.length > 0 ? mealData.reduce((accumulator, foodCurrent) => accumulator + parseFloat(foodCurrent.fat_amount), 0.0).toFixed(1) : "0.0"}</td>
                            <td>{mealData && mealData.length > 0 ? mealData.reduce((accumulator, foodCurrent) => accumulator + parseFloat(foodCurrent.carbs_amount), 0.0).toFixed(1) : "0.0"}</td>
                            <td>{mealData && mealData.length > 0 ? mealData.reduce((accumulator, foodCurrent) => accumulator + Number(foodCurrent.calories), 0) : "0"}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Meal;