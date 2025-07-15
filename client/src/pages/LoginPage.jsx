//import React, { use } from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import { use, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { set } from "mongoose";

function LoginPage() {

    const [showPassword, setShowPassword] = useState(false);
    const { register, handleSubmit, formState: {errors} } = useForm();
    const {signin, errors: signinErrors, isAuthenticated, user} = useAuth();
    const navigate = useNavigate();

    const onSubmit = handleSubmit((data) => {
        signin(data); 
    })
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    }
    useEffect(() => {
        if(isAuthenticated){
          navigate("/home");
        }
    }, [isAuthenticated]);

    return (
        <div className="min-h-screen bg-gradient-to-br from-cyan-400 to-sky-600 flex h-[calc(100vh-100px)] items-center justify-center">
            <div className="bg-white max-w-md w-full p-10 rounded-xl shadow-2xl border border-gray-200 border-opacity-80">
                <h1 className="text-3xl font-bold text-center text-cyan-700 mb-6 font-Roboto">Iniciar Sesión</h1>
                {signinErrors.map((error, i) => (
                    <div className="bg-red-500 p-2 text-white text-center font-semibold my-2 rounded-md" key={i}> 
                        {error}
                    </div>
                ))}
                <form onSubmit={onSubmit}>
                    <input
                        type="email" {...register("email", { required: true })}
                        className="w-full bg-zinc-300 bg-opacity-20 text-black px-4 py-2 rounded-lg my-2
                            focus:outline-none focus:ring-2 focus:ring-cyan-600 placeholder-zinc-800 placeholder-opacity-80
                            border border-r-2 border-cyan-600 shadow-md"
                        placeholder="Correo Electrónico"
                    />
                    {errors.email && (<p className="text-red-500 font-semibold">* El Correo Electrónico es requerido</p>)}
                    <div className="relative bg-zinc-300 bg-opacity-10 pt-5">
                        <div className="flex items-center bg-zinc-300 bg-opacity-20 rounded-lg focus-within:ring-2 focus-within:ring-cyan-600 border border-r-2 border-cyan-600 shadow-md">
                            <input
                                type={showPassword ? "text" : "password"} {...register("password", { required: true })}
                                className="w-full bg-zinc-300 bg-opacity-10 text-black px-4 py-2 focus:outline-none placeholder-black placeholder-opacity-70"
                                placeholder="Contraseña"
                                autoComplete="current-password"
                                key={showPassword ? "text" : "password"}
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="px-3 bg-zinc-300 bg-opacity-10 text-gray-600 hover:text-black transition-colors"
                            >
                                {showPassword ? (
                                    <EyeSlashIcon className="h-5 w-5" />
                                ) : (
                                    <EyeIcon className="h-5 w-5" />
                                )}
                            </button>
                        </div>
                        {errors.password && (<p className="text-red-500 font-semibold pt-2">* La Contraseña es requerida</p>)}
                    </div>
                    <p className="py-3"></p>
                    <button type="submit" className="w-full bg-gradient-to-r from-cyan-500 to-sky-600 hover:from-cyan-600 hover:to-sky-700
                        text-white font-bold py-3 px-4 rounded-lg transition-all duration-500 ease-in-out transform hover:scale-[1.02] shadow-lg font-Roboto text-lg">Iniciar Sesión</button>
                </form>
            </div>
        </div>
    );  
}

export default LoginPage;