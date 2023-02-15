import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { Routes, Route } from "react-router-dom";

const App = () => {
    return (
        <div className="flex min-h-screen flex-col font-body overflow-hidden text-dark bg-background">
            <Header />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
            </Routes>
        </div>
    );
};

export default App;