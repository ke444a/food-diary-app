import { Link, NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import { Fade as Hamburger } from "hamburger-react";
import logo from "../assets/header-logo.webp";
import { customAxios } from "../customAxios";

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
                <nav className="flex items-center justify-between sm:py-1 md:py-2 2xl:py-3">
                    <Link to="/" className="flex cursor-pointer items-center ">
                        <img src={logo} className="mr-1 h-16 w-16 sm:mr-3" alt="Icon" />
                        <h2 className="font-heading text-base font-bold leading-4 transition sm:text-lg sm:leading-5 2xl:text-xl 2xl:leading-6">
                            Food
                            <br />
                            Diary
                        </h2>
                    </Link>
                    {isSmallScreen ? (
                        <div className="relative z-20 ml-auto text-black">
                            <Hamburger
                                size={isSmallScreen ? 20 : 25}
                                toggled={isHamburgerOpen}
                                toggle={setIsHamburgerOpen}
                                direction="right"
                            />
                        </div>
                    ) : (
                        <ul className="flex items-center space-x-8 text-sm font-medium md:space-x-10 md:text-base">
                            <li>
                                <NavLink
                                    to="/"
                                    className="cursor-pointer opacity-70 transition hover:opacity-100"
                                    style={({ isActive }) => ({
                                        opacity: isActive && "1",
                                    })}
                                >
                                    Logs
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/favorites"
                                    className="cursor-pointer opacity-70 transition hover:opacity-100"
                                    style={({ isActive }) => ({
                                        opacity: isActive && "1",
                                    })}
                                >
                                    Favorites
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/profile"
                                    className="cursor-pointer opacity-70 transition hover:opacity-100"
                                    style={({ isActive }) => ({
                                        opacity: isActive && "1",
                                    })}
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to={isLoggedIn ? "/logout" : "/login"}
                                    className="cursor-pointer opacity-70 transition hover:opacity-100"
                                    style={({ isActive }) => ({
                                        opacity: isActive && "1",
                                    })}
                                    onClick={() => {
                                        if (isLoggedIn) {
                                            setIsLoggedIn(false);
                                            localStorage.removeItem("user");
                                            localStorage.removeItem("token");
                                            customAxios({
                                                method: "post",
                                                url: "/auth/logout/",
                                                headers: {
                                                    Authorization: `Token ${localStorage.getItem(
                                                        "token"
                                                    )}`,
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
                    <ul className="flex animate-fade-in items-center space-x-6 border-t-[1px] border-dark py-4 text-sm font-medium">
                        <li>
                            <NavLink
                                to="/"
                                className="cursor-pointer opacity-70 transition hover:opacity-100"
                                style={({ isActive }) => ({
                                    opacity: isActive && "1",
                                })}
                            >
                                Logs
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/favorites"
                                className="cursor-pointer opacity-70 transition hover:opacity-100"
                                style={({ isActive }) => ({
                                    opacity: isActive && "1",
                                })}
                            >
                                Favorites
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to="/profile"
                                className="cursor-pointer opacity-70 transition hover:opacity-100"
                                style={({ isActive }) => ({
                                    opacity: isActive && "1",
                                })}
                            >
                                Profile
                            </NavLink>
                        </li>
                        <li>
                            <NavLink
                                to={isLoggedIn ? "/logout" : "/login"}
                                className="cursor-pointer opacity-70 transition hover:opacity-100"
                                style={({ isActive }) => ({
                                    opacity: isActive && "1",
                                })}
                                onClick={() => {
                                    if (isLoggedIn) {
                                        setIsLoggedIn(false);
                                        localStorage.removeItem("user");
                                        localStorage.removeItem("token");
                                        customAxios({
                                            method: "post",
                                            url: "/auth/logout/",
                                            headers: {
                                                Authorization: `Token ${localStorage.getItem(
                                                    "token"
                                                )}`,
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
