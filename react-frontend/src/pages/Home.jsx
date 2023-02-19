import { useState, useEffect } from "react";
import InfoCard from "../components/InfoCard";
import Meal from "../components/Meal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMugHot, faAppleWhole, faDrumstickBite, faBowlFood, faPlus } from "@fortawesome/free-solid-svg-icons";
import FoodForm from "../components/FoodForm";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [user, setUser] = useState({});
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
                    full_name={user.first_name + " " + user.last_name}
                    calories_goal={user.calories_goal}
                />
                {isFormOpen && <FoodForm setIsFormOpen={setIsFormOpen} /> }
                <div className="ml-5 w-full">
                    <button
                        onClick={() => setIsFormOpen(true)}
                        className="food-btn float-right px-3 py-1 border-2 rounded-md bg-white-new border-black font-bold transition-transform hover:scale-110">
                        <FontAwesomeIcon className="mr-2 text-[#13620C]" icon={faPlus} />
                            Add food
                    </button>
                    <Meal mealType={"Breakfast"} icon={faMugHot} />
                    <Meal mealType={"Lunch"} icon={faBowlFood} />
                    <Meal mealType={"Dinner"} icon={faDrumstickBite} />
                    <Meal mealType={"Snack"} icon={faAppleWhole} />
                </div>
            </div>
        </main>
    );
};

export default Home;