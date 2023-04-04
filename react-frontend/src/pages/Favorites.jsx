import { useQuery, useMutation, useQueryClient } from "react-query";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUtensils } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import ManageFavoritesForm from "../components/ManageFavoritesForm";
import LogFavoritesForm from "../components/LogFavoritesForm";
import { useNavigate } from "react-router-dom";
import FavoriteCard from "../components/FavoriteCard";

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
            if (
                event.target.closest(".favorites-form") ||
                event.target.closest(".favorites-btn")
            ) {
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

    const { data: favorites, ...favoritesRes } = useQuery({
        queryFn: () =>
            axios
                .get("/api/favorites/", {
                    headers: {
                        Authorization: `Token ${localStorage.getItem("token")}`,
                    },
                    params: {
                        user_id: JSON.parse(localStorage.getItem("user")).id,
                    },
                })
                .then((res) => res.data),
        queryKey: "favorites",
        onSuccess: () => {
            queryClient.invalidateQueries("meal");
        },
        onError: (error) => {
            if (error.response.status === 401) {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
                navigate("/login");
            }
        },
    });

    const deleteFavoriteMutation = useMutation({
        mutationFn: (id) =>
            axios({
                method: "DELETE",
                url: `/api/favorites/${id}/`,
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries("favorites");
        },
    });

    const editFavoriteMutation = useMutation({
        mutationFn: (data) => {
            const { id, ...updatedData } = data;
            return axios({
                method: "PUT",
                url: `/api/favorites/${id}/`,
                data: {
                    user: user.id,
                    ...updatedData,
                },
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            });
        },
        onSuccess: () => {
            queryClient.invalidateQueries("favorites");
        },
    });

    const addFavoriteMutation = useMutation({
        mutationFn: (data) =>
            axios({
                method: "POST",
                url: "/api/favorites/",
                data: {
                    user: user.id,
                    ...data,
                },
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            }),
    });

    const logFavoriteMutation = useMutation({
        mutationFn: (data) =>
            axios({
                method: "POST",
                url: "/api/logs/",
                data: {
                    user: user.id,
                    date: new Date().toISOString().split("T")[0],
                    ...data,
                },
                headers: {
                    Authorization: `Token ${localStorage.getItem("token")}`,
                },
            }),
        onSuccess: () => {
            queryClient.invalidateQueries("favorites");
        },
    });

    if (!user) {
        return null;
    }

    return (
        <main className="flex-grow pt-4 md:pt-10 2xl:pt-12">
            <div className="container">
                <h1 className="mb-5 inline-block border-b-2 border-dark font-heading text-lg font-bold sm:text-2xl 2xl:text-4xl">
                    My Favorite Foods
                </h1>
                <div className="mb-5">
                    <button
                        onClick={() => setIsAddFormOpen(true)}
                        className="favorites-btn mb-3 inline-block rounded-md border-2 border-dark bg-white-new p-2 text-sm font-bold transition-transform hover:scale-110 min-[500px]:text-base"
                    >
                        <FontAwesomeIcon
                            className="mr-2 text-custom-green sm:text-lg"
                            icon={faUtensils}
                        />
                        Add favorite
                    </button>
                    {isAddFormOpen && (
                        <ManageFavoritesForm
                            manageFavorite={addFavoriteMutation}
                            setIsFormOpen={setIsAddFormOpen}
                        />
                    )}
                    {isEditFormOpen && (
                        <ManageFavoritesForm
                            manageFavorite={editFavoriteMutation}
                            setIsFormOpen={setIsEditFormOpen}
                            favoriteToEdit={favoriteToEdit}
                        />
                    )}
                    {isLogFormOpen && (
                        <LogFavoritesForm
                            logFavorite={logFavoriteMutation}
                            setIsFormOpen={setIsLogFormOpen}
                            favoriteToLog={favoriteToLog}
                        />
                    )}
                    {favoritesRes.isSuccess && favorites.length > 0 ? (
                        <div className="flex flex-col flex-wrap items-center justify-center gap-x-2 gap-y-3 min-[500px]:flex-row min-[500px]:items-start min-[500px]:justify-start sm:gap-y-4">
                            {favorites.map((favorite) => (
                                <FavoriteCard
                                    key={favorite.id}
                                    favorite={favorite}
                                    setIsLogFormOpen={setIsLogFormOpen}
                                    setFavoriteToLog={setFavoriteToLog}
                                    setIsEditFormOpen={setIsEditFormOpen}
                                    setFavoriteToEdit={setFavoriteToEdit}
                                    deleteFavoriteMutation={
                                        deleteFavoriteMutation
                                    }
                                />
                            ))}
                        </div>
                    ) : (
                        <p className="text-lg font-bold">
                            No meals in your favorites yet? Add some to quickly
                            log them later!
                        </p>
                    )}
                </div>
            </div>
        </main>
    );
};

export default Favorites;
