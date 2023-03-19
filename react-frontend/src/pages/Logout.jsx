import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logout = () => {
    return (
        <main className="flex-grow pt-4 md:pt-10 2xl:pt-12">
            <div className="container flex flex-col items-center">
                <FontAwesomeIcon icon={faCircleCheck} className="text-custom-green text-5xl mb-4" />
                <h2 className="font-bold text-2xl">You successfully logged out!</h2>
            </div>
        </main>
    );
};

export default Logout;