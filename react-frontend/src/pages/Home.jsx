import { useState, useEffect } from "react";
import InfoCard from "../components/InfoCard";
import Meal from "../components/Meal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot, faAppleWhole, faDrumstickBite, faBowlFood, faPlus } from "@fortawesome/free-solid-svg-icons";
import FoodForm from "../components/FoodForm";
import { useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Home = () => {
    const [date, setDate] = useState(new Date());
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const closeForm = (event) => {
            if (event.target.closest(".food-form") || event.target.closest(".food-btn")) {
                return;
            }
            setIsFormOpen(false);
        };
        window.addEventListener("click", closeForm);

        return () => {
            window.removeEventListener("click", closeForm);
        };
    }, []);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser) {
            navigate("/login");
        } else {
            setUser(loggedInUser);
        }
    }, []);

    if (!user) {
        return null;
    }

    return (
        <main className="flex-grow pt-4 md:pt-10 2xl:pt-12">
            <div className="container flex">
                <InfoCard 
                    fullName={user.first_name + " " + user.last_name}
                    caloriesGoal={user.calories_goal}
                    userId={user.id}
                    date={date}
                />
                {isFormOpen && <FoodForm setIsFormOpen={setIsFormOpen} userId={user.id} /> }
                <div className="ml-5 w-full flex flex-col">
                    <div className="mx-auto">
                        <DatePicker 
                            selected={date} 
                            onChange={(date) => setDate(date)} 
                            dateFormat="yyyy-MM-dd"
                            todayButton="Today"
                            className="border-[1px] border-gray-500 px-2 py-1 text-center"
                        />
                    </div>
                    <div className="mt-3">
                        <button
                            onClick={() => setIsFormOpen(true)}
                            className="food-btn float-right px-3 py-1 border-2 rounded-md bg-white-new border-black font-bold transition-transform hover:scale-110">
                            <FontAwesomeIcon className="mr-2 text-[#13620C]" icon={faPlus} />
                            Add food
                        </button>
                        <Meal mealType={"Breakfast"} icon={faMugHot} userId={user.id} date={date} />
                        <Meal mealType={"Lunch"} icon={faBowlFood} userId={user.id} date={date} />
                        <Meal mealType={"Dinner"} icon={faDrumstickBite} userId={user.id} date={date} />
                        <Meal mealType={"Snack"} icon={faAppleWhole} userId={user.id} date={date} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;