import { Link } from "react-router-dom";
import loginImg from "../assets/login-img.webp";
import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import ErrorMessage from "../components/ErrorMessage";
import { customAxios } from "../customAxios";

const Login = () => {
    const { register, handleSubmit } = useForm();
    const navigate = useNavigate();
    const loginMutation = useMutation({
        mutationFn: (formData) =>
            customAxios
                .post("/auth/login/", formData)
                .then((response) => response.data),
        onSuccess: (data) => {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
            navigate("../");
        },
    });

    const loginUser = (loginData) => {
        loginMutation.mutate(loginData);
    };

    useEffect(() => {
        const loggedInUser = JSON.parse(localStorage.getItem("user"));
        if (loggedInUser) {
            navigate("../");
        }
    }, []);

    return (
        <main className="flex-grow pt-6 sm:pt-8 md:pt-12 2xl:pt-14">
            {loginMutation.isError && (
                <ErrorMessage
                    message={
                        loginMutation.error.response.data.non_field_errors[0]
                    }
                />
            )}
            <div className="container mb-6 flex flex-col items-center justify-center">
                <img src={loginImg} className="mb-2 h-14" />
                <h1 className="mb-5 border-b-2 border-dark font-heading text-lg font-bold min-[500px]:pb-1 min-[500px]:text-2xl md:mb-8 lg:text-3xl xl:mb-12 2xl:text-4xl">
                    Login to your page
                </h1>
                <form
                    onSubmit={handleSubmit(loginUser)}
                    className="w-full max-w-[80%] sm:max-w-[60%] lg:max-w-[50%]"
                >
                    <input
                        type="email"
                        {...register("email", { required: true })}
                        placeholder="Email address"
                        className="mb-3 w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                    />
                    <input
                        type="password"
                        {...register("password", { required: true })}
                        placeholder="Password"
                        className="mb-5 w-full rounded-md border-2 border-custom-gray p-3 focus:outline-none"
                    />
                    <button className="w-full rounded-md bg-form p-3 font-bold text-white transition-transform hover:scale-105">
                        Login
                    </button>
                </form>
                <p className="mt-3 text-center font-medium leading-5 min-[500px]:leading-6">
                    Don&apos;t have an account yet?{" "}
                    <span className="text-form underline">
                        <Link to="../signup">Signup</Link>
                    </span>
                </p>
            </div>
        </main>
    );
};

export default Login;
