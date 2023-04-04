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
            if (
                event.target.closest("#logForm") ||
                event.target.closest("#logBtn") ||
                event.target.closest(".food-item")
            ) {
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
        <main className="container flex-grow pt-4 md:pt-10 2xl:pt-12">
            <h1 className="mb-5 inline-block border-b-2 border-dark font-heading text-lg font-bold sm:text-2xl 2xl:text-4xl">
                Log My Food
            </h1>
            <div className="mb-6 flex flex-col items-center justify-center min-[500px]:flex-row min-[500px]:items-start min-[500px]:justify-start">
                <InfoCard
                    fullName={user.first_name + " " + user.last_name}
                    caloriesGoal={user.calories_goal}
                    user={user}
                    date={date}
                />
                {isFormOpen && (
                    <LogFoodForm
                        setIsFormOpen={setIsFormOpen}
                        userId={user.id}
                        date={date}
                    />
                )}
                <div className="ml-0 flex w-full flex-col min-[500px]:ml-5">
                    <div className="-mb-1 flex items-center justify-between">
                        <div className="flex w-36 items-center rounded-md border-b-2 border-dark bg-white-new p-2">
                            <FontAwesomeIcon
                                className="mr-1 text-lg md:mr-2"
                                icon={faCalendar}
                            />
                            <DatePicker
                                selected={date}
                                onChange={(date) => setDate(date)}
                                dateFormat="dd MMM yyyy"
                                className="w-full bg-transparent text-sm font-bold focus:outline-none md:text-base"
                            />
                        </div>
                        <button
                            onClick={() => setIsFormOpen(true)}
                            id="logBtn"
                            className="block rounded-md border-b-2 border-dark bg-white-new p-2.5 text-sm font-bold transition-transform hover:scale-110 md:text-base"
                        >
                            <FontAwesomeIcon
                                className="fa-lg mr-1 text-custom-green md:mr-2"
                                icon={faUtensils}
                            />
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
