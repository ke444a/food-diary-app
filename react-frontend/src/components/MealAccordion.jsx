import Meal from "./Meal";
import accordionData from "../data/accordionData";

const MealAccordion = (props) => {
    return (
        <div className="flex flex-col transition-transform">
            {accordionData.map((data, index) => {
                return (
                    <Meal
                        key={index}
                        mealType={data.meal_type}
                        icon={data.icon}
                        userId={props.userId}
                        date={props.date}
                    />
                );
            })}
        </div>
    );
};

export default MealAccordion;
