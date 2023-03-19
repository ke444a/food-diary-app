import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Fade as Hamburger } from "hamburger-react";
import logo from "../assets/header-logo.png";
import axios from "axios";

const Header = () => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 540);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const toggleScreen = () => {
            if (window.innerWidth < 540) {
                setIsSmallScreen(true);
            } else {
                setIsSmallScreen(false);
            }
        };
        window.addEventListener("resize", toggleScreen);

        return () => {
            window.removeEventListener("resize", toggleScreen);
        };
    }, []);

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
        }
    }, []);

    return (
        <header className="bg-white-new drop-shadow-md">
            <div className="container">
                <nav className="flex justify-between items-center sm:py-1 md:py-2 2xl:py-3">
                    <Link to="/" className="flex items-center cursor-pointer ">
                        <img src={logo} className="w-16 h-16 mr-1 sm:mr-3" />
                        <h2 className="text-base leading-4 sm:text-lg sm:leading-5 transition 2xl:text-xl font-heading font-bold 2xl:leading-6">Food<br />Diary</h2>
                    </Link>
                    {isSmallScreen ? (
                        <div className="relative z-20 text-black ml-auto">
                            <Hamburger
                                size={isSmallScreen ? 20 : 25}
                                toggled={isHamburgerOpen}
                                toggle={setIsHamburgerOpen}
                                direction="right"
                            />
                        </div>
                    ) : (
                        <ul className="text-sm md:text-base flex font-medium items-center space-x-8 md:space-x-10">
                            <li>
                                <NavLink
                                    to="/"
                                    className="cursor-pointer transition opacity-70 hover:opacity-100"
                                    style={
                                        ({ isActive }) => (
                                            {
                                                opacity: isActive && "1"
                                            }
                                        )}
                                >
                                    Logs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/favorites"
                                    className="cursor-pointer transition opacity-70 hover:opacity-100"
                                    style={
                                        ({ isActive }) => (
                                            {
                                                opacity: isActive && "1"
                                            }
                                        )}
                                >
                                    Favorites
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/profile"
                                    className="cursor-pointer transition opacity-70 hover:opacity-100"
                                    style={
                                        ({ isActive }) => (
                                            {
                                                opacity: isActive && "1"
                                            }
                                        )}
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={isLoggedIn ? "/logout" : "/login"}
                                    className="cursor-pointer transition opacity-70 hover:opacity-100"
                                    style={
                                        ({ isActive }) => (
                                            {
                                                opacity: isActive && "1"
                                            }
                                        )}
                                    onClick={() => {
                                        if (isLoggedIn) {
                                            setIsLoggedIn(false);
                                            localStorage.removeItem("user");
                                            localStorage.removeItem("token");
                                            axios({
                                                method: "post",
                                                url: "api/auth/logout/",
                                                headers: {
                                                    "Authorization": `Token ${localStorage.getItem("token")}`,
                                                },
                                            });
                                        }
                                    }}
                                >
                                    {isLoggedIn ? "Logout" : "Login"}
                                </NavLink>
                            </li>
                        </ul>
                    )}
                </nav>

                {isHamburgerOpen && isSmallScreen && (
                    <ul className="py-4 text-sm flex font-medium items-center animate-fade-in space-x-6 border-t-[1px] border-dark">
                        <li>
                            <NavLink
                                to="/"
                                className="cursor-pointer transition opacity-70 hover:opacity-100"
                                style={
                                    ({ isActive }) => (
                                        {
                                            opacity: isActive && "1"
                                        }
                                    )}
                            >
                                Logs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/favorites"
                                className="cursor-pointer transition opacity-70 hover:opacity-100"
                                style={
                                    ({ isActive }) => (
                                        {
                                            opacity: isActive && "1"
                                        }
                                    )}
                            >
                                Favorites
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile"
                                className="cursor-pointer transition opacity-70 hover:opacity-100"
                                style={
                                    ({ isActive }) => (
                                        {
                                            opacity: isActive && "1"
                                        }
                                    )}
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={isLoggedIn ? "/logout" : "/login"}
                                className="cursor-pointer transition opacity-70 hover:opacity-100"
                                style={
                                    ({ isActive }) => (
                                        {
                                            opacity: isActive && "1"
                                        }
                                    )}
                                onClick={() => {
                                    if (isLoggedIn) {
                                        setIsLoggedIn(false);
                                        localStorage.removeItem("user");
                                        localStorage.removeItem("token");
                                        axios({
                                            method: "post",
                                            url: "api/auth/logout/",
                                            headers: {
                                                "Authorization": `Token ${localStorage.getItem("token")}`,
                                            },
                                        });
                                    }
                                }}
                            >
                                {isLoggedIn ? "Logout" : "Login"}
                            </NavLink>
                        </li>
                    </ul>
                )}
            </div>
        </header>
    );
};

export default Header;