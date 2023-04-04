import { faCircleCheck } from "@fortawesome/free-regular-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Logout = () => {
    return (
        <main className="flex-grow pt-4 md:pt-10 2xl:pt-12">
            <div className="container flex flex-col items-center">
                <FontAwesomeIcon
                    icon={faCircleCheck}
                    className="mb-4 text-5xl text-custom-green"
                />
                <h2 className="text-2xl font-bold">
                    You have successfully logged out!
                </h2>
            </div>
        </main>
    );
};

export default Logout;
