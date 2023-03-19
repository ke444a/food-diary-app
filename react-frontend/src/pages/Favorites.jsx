import { useQuery, useMutation,useQueryClient } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils, faTrash, faPenToSquare, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ManageFavoritesForm from "../components/ManageFavoritesForm";
import LogFavoritesForm from "../components/LogFavoritesForm";
import { useNavigate } from "react-router-dom";


const Favorites = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const [isAddFormOpen, setIsAddFormOpen] = useState(false);
    const [isEditFormOpen, setIsEditFormOpen] = useState(false);
    const [isLogFormOpen, setIsLogFormOpen] = useState(false);
    const [favoriteToEdit, setFavoriteToEdit] = useState(null);
    const [favoriteToLog, setFavoriteToLog] = useState(null);
    const queryClient = useQueryClient();

    useEffect(() => {
        const closeForm = (event) => {
            if (event.target.closest(".favorites-form") || event.target.closest(".favorites-btn")) {
                return;
            }
            setIsAddFormOpen(false);
            setIsEditFormOpen(false);
            setIsLogFormOpen(false);
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

    const { data: favorites, ...favoritesRes} = useQuery({
        queryFn: () => axios.get("/api/favorites/", {
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            }, 
            params: {
                user_id: JSON.parse(localStorage.getItem("user")).id
            }
        }).then(res => res.data),
        queryKey: "favorites",
    });  
    
    const deleteFavoriteMutation = useMutation({
        mutationFn: (id) => axios({
            method: "DELETE",
            url: `/api/favorites/${id}/`,
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
        }),
        onSuccess: () => {
            queryClient.invalidateQueries("favorites");
        }
    });

    const editFavoriteMutation = useMutation({
        mutationFn: (data) => {
            const { id, ...updatedData } = data;
            return axios({
                method: "PUT",
                url: `/api/favorites/${id}/`,
                data: {
                    user: user.id,
                    ...updatedData
                },
                headers: {
                    "Authorization": `Token ${localStorage.getItem("token")}`
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries("favorites");
        }
    });

    const addFavoriteMutation = useMutation({
        mutationFn: (data) => axios({
            method: "POST",
            url: "/api/favorites/", 
            data: {
                user: user.id, 
                ...data
            },
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
        }),
        onSuccess: () => {
            queryClient.invalidateQueries("favorites");
        }
    });

    const logFavoriteMutation = useMutation({
        mutationFn: (data) => axios({
            method: "POST",
            url: "/api/logs/", 
            data: {
                user: user.id,
                date: new Date().toISOString().split("T")[0],
                ...data,
            },
            headers: {
                "Authorization": `Token ${localStorage.getItem("token")}`
            },
        }),
    });

    if (!user) {
        return null;
    }

    return (
        <main className="flex-grow pt-4 md:pt-10 2xl:pt-12">
            <div className="container">
                <h1 className="inline-block font-heading font-bold text-lg sm:text-2xl 2xl:text-4xl border-b-2 border-dark">My Favorite Foods</h1>
                <div className="mt-5">
                    <button
                        onClick={() => setIsAddFormOpen(true)}
                        className="favorites-btn text-sm min-[500px]:text-base inline-block mb-3 p-2 border-2 border-table-header rounded-md bg-white-new font-bold transition-transform hover:scale-110">
                        <FontAwesomeIcon className="mr-2 text-custom-green sm:text-lg" icon={faUtensils} />
                        Add favorite
                    </button>
                    {isAddFormOpen && <ManageFavoritesForm manageFavorite={addFavoriteMutation} setIsFormOpen={setIsAddFormOpen} />}
                    {isEditFormOpen && <ManageFavoritesForm manageFavorite={editFavoriteMutation} setIsFormOpen={setIsEditFormOpen} favoriteToEdit={favoriteToEdit} />}
                    {isLogFormOpen && <LogFavoritesForm logFavorite={logFavoriteMutation} setIsFormOpen={setIsLogFormOpen} favoriteToLog={favoriteToLog} />}
                    { favoritesRes.isSuccess && favorites.length > 0 ?
                        <div className="flex flex-wrap gap-x-2 gap-y-3 sm:gap-y-4">
                            {
                                favorites.map(favorite =>
                                    <div key={favorite.id} className="flex flex-col w-full max-w-[190px] lg:max-w-[250px] bg-white-new rounded-md drop-shadow-lg p-1 md:pt-2 md:px-3">
                                        <div className="flex justify-between items-start mb-1 md:mb-2 flex-grow">
                                            <h4 
                                                className="font-bold font-heading text-sm leading-4 md:text-base md:leading-5 cursor-pointer">
                                                {favorite.meal.meal_name}
                                            </h4>
                                        </div>
                                        <div className="flex justify-between text-sm mb-2 sm:mb-3 py-1 border-y-2 border-opacity-30 border-dark">
                                            <div className="flex flex-col justify-end space-y-1 sm:space-y-2">
                                                <p>Serving size: </p>
                                                <p>Serving weight: </p>
                                                <p>Protein: </p>
                                                <p>Fat: </p>
                                                <p>Carbs: </p>
                                                <p className="font-bold">Calories: </p>
                                            </div>
                                            <div className="flex flex-col justify-end space-y-1 sm:space-y-2 text-right">
                                                <p>{favorite.serving_size ? favorite.serving_size : "-"}</p>
                                                <p>{favorite.serving_weight ? favorite.serving_weight + " g" : "-"}</p>
                                                <p>{favorite.meal.protein_amount} g</p>
                                                <p>{favorite.meal.fat_amount} g</p>
                                                <p>{favorite.meal.carbs_amount} g</p>
                                                <p className="font-bold">{favorite.meal.calories} cal</p>
                                            </div>
                                        </div>
                                        <div className="flex justify-between font-medium">
                                            <button 
                                                className="favorites-btn flex flex-col items-center transition-color hover:text-custom-green duration-300 p-1 sm:p-2 sm:px-3" 
                                                onClick={() => {
                                                    setIsLogFormOpen(true);
                                                    setFavoriteToLog(favorite);
                                                }}
                                            >
                                                <FontAwesomeIcon fixedWidth className="fa-sm" icon={faPlus} />
                                                <span className="inline-block underline">Log</span>
                                            </button>
                                            <button 
                                                className="favorites-btn flex flex-col items-center transition-color hover:text-[#EA7317] duration-300 p-1 sm:p-2 sm:px-3" 
                                                onClick={() => { 
                                                    setIsEditFormOpen(true);
                                                    setFavoriteToEdit(favorite);
                                                }}>
                                                <FontAwesomeIcon fixedWidth className="fa-sm" icon={faPenToSquare} />
                                                <span className="inline-block underline">Edit</span>
                                            </button>
                                            <button 
                                                className="flex flex-col items-center transition-color hover:text-custom-red duration-300 p-1 sm:p-2 sm:px-3" 
                                                onClick={() => deleteFavoriteMutation.mutate(favorite.id)}
                                            >
                                                <FontAwesomeIcon fixedWidth className="fa-sm" icon={faTrash} />
                                                <span className="inline-block underline">Delete</span>
                                            </button>
                                        </div>
                                    </div>

                                )
                            }
                        </div>
                        : 
                        <p className="font-bold text-lg">
                            No meals in your favorites yet? Add some to quickly log them later!
                        </p>
                    }
                </div>
            </div>
        </main>
    );
};

export default Favorites;