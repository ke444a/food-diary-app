import { useState, useEffect } from "react";
import InfoCard from "../components/InfoCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { faCalendar } from "@fortawesome/free-regular-svg-icons";
import LogFoodForm from "../components/LogFoodForm";
import { useLocation, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import MealAccordion from "../components/MealAccordion";

const Home = () => {
    const [date, setDate] = useState(new Date());
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const closeForm = (event) => {
            if (event.target.closest("#logForm") || event.target.closest("#logBtn")) {
                return;
            }
            setIsFormOpen(false);
        };
        window.addEventListener("click", closeForm);

        return () => {
            window.removeEventListener("click", closeForm);
        };
    }, []);

    const location = useLocation();
    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (!loggedInUser) {
            navigate("/login");
        } else {
            setUser(loggedInUser);
        }
    }, [location]);

    if (!user) {
        return null;
    }

    return (
        <main className="flex-grow pt-4 md:pt-10 2xl:pt-12">
            <div className="container flex flex-col justify-center items-center min-[500px]:flex-row min-[500px]:justify-start min-[500px]:items-start">
                <InfoCard 
                    fullName={user.first_name + " " + user.last_name}
                    caloriesGoal={user.calories_goal}
                    user={user}
                    date={date}
                />
                {isFormOpen && <LogFoodForm setIsFormOpen={setIsFormOpen} userId={user.id} date={date} /> }
                <div className="ml-0 min-[500px]:ml-5 w-full flex flex-col">
                    <div className="flex justify-between items-center -mb-1">
                        <div className="flex items-center w-36 p-2 border-b-2 border-table-header rounded-md bg-white-new">
                            <FontAwesomeIcon className="mr-1 md:mr-2 text-lg" icon={faCalendar} />
                            <DatePicker 
                                selected={date} 
                                onChange={(date) => setDate(date)} 
                                dateFormat="dd MMM yyyy"
                                className="bg-transparent focus:outline-none font-bold w-full text-sm md:text-base"
                            />
                        </div>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            id="logBtn"
                            className="block p-2.5 border-b-2 border-table-header rounded-md bg-white-new font-bold transition-transform text-sm md:text-base hover:scale-110"
                        >
                            <FontAwesomeIcon className="mr-1 md:mr-2 text-custom-green fa-lg" icon={faUtensils} />
                            Log food
                        </button>
                    </div>
                    <div className="mt-3">
                        <MealAccordion userId={user.id} date={date} />
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Home;