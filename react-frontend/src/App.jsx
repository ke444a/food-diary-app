import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Profile from "./pages/Profile";
import Favorites from "./pages/Favorites";
import Logout from "./pages/Logout";
import { Routes, Route, useLocation } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faMugHot,
    faBowlFood,
    faDrumstickBite,
    faAppleWhole,
} from "@fortawesome/free-solid-svg-icons";

library.add(faMugHot, faBowlFood, faDrumstickBite, faAppleWhole);

const App = () => {
    const location = useLocation();

    return (
        <div className="flex min-h-screen flex-col overflow-hidden bg-background font-body text-dark">
            <Header key={location.pathname} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/favorites" element={<Favorites />} />
                <Route path="/logout" element={<Logout />} />
            </Routes>
        </div>
    );
};

export default App;
