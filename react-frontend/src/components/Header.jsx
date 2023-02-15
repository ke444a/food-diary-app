import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Fade as Hamburger } from "hamburger-react";
import logo from "../assets/header-logo.png";

const Header = () => {
    const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
    const [isSmallScreen, setIsSmallScreen] = useState(window.innerWidth < 540);

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

    return (
        <header className="bg-white-new drop-shadow-md">
            <div className="container">
                <nav className="flex items-center justify-between py-1 md:py-2 2xl:py-3">
                    <Link to="/" className="flex items-center cursor-pointer ">
                        <img src={logo} className="w-16 h-16 mr-3" />
                        <h2 className="text-base sm:text-lg sm:leading-5 transition 2xl:text-xl font-heading font-bold 2xl:leading-6">Food<br/>Diary</h2>
                    </Link>
                    {isSmallScreen ? (
                        <>
                            <div
                                className="relative z-20 text-black"
                            >
                                <Hamburger
                                    size={isSmallScreen ? 20 : 25}
                                    toggled={isHamburgerOpen}
                                    toggle={setIsHamburgerOpen}
                                    direction="right"
                                />
                            </div>
                            {isHamburgerOpen && (
                                <div className="fixed top-0 right-0 z-10 h-screen animate-slide-in pt-14 pr-14 pl-3 sm:pt-9 drop-shadow-md bg-white">
                                    <ul className="ml-3 font-bold text-dark">
                                        <li className="my-2">
                                            <Link
                                                to="/"
                                                className="cursor-pointer"
                                            >
                                                My Logs
                                            </Link>
                                        </li>
                                        <li className="my-2">
                                            <Link
                                                to="/login"
                                                className="cursor-pointer"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </>
                    ) : (
                        <ul className="2xl:text-lg flex font-bold">
                            <li className="mx-2 md:mx-3 lg:mx-4 xl:mx-6">
                                <Link
                                    to="/"
                                    className="cursor-pointer"
                                >
                                    My Logs
                                </Link>
                            </li>
                            <li className="mx-2 md:mx-3 lg:mx-4 xl:mx-6">
                                <Link
                                    to="/login"
                                    className="cursor-pointer"
                                >
                                    Login
                                </Link>
                            </li>
                        </ul>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;