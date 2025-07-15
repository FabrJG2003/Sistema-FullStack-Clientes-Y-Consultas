import { HomeIcon, UserGroupIcon, IdentificationIcon, UserCircleIcon, CalendarIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

function Navbar_Gerente() {
    const { isAuthenticated, logout, user } = useAuth();
    const [ isCollapsed, setIsCollapsed ] = useState(false);

    const location = useLocation();

    const menuItems = [
        { path: "/home", name: "Inicio", icon: <HomeIcon className="w-8"/> },
        { path: "/clients", name: "Clientes", icon: <UserGroupIcon className="w-8"/> },
        { path: "/contadores", name: "Contadores", icon: <UserCircleIcon className="w-8"/> },
        { path: "/agenda", name: "Agenda", icon:  <CalendarIcon className="w-8"/> },
        { path: "/profile", name: "Perfil", icon: <IdentificationIcon className="w-8"/> },
        { path: "/solicitudes", name: "Solicitudes", icon: <ClipboardIcon className="w-8"/> },

      ];

    return (
        <nav className={`min-h-screen flex flex-col shadow-lg ${isCollapsed ? 'w-16' : 'w-48'}
            bg-gradient-to-br from-cyan-700 to-sky-500 text white shadow-lx transition-all duration-300 ease-in-out`}>
            <div className="flex justify-end pr-3 py-2">
                <button onClick={() => setIsCollapsed(!isCollapsed)}
                    className="p-2 rounded-full hover:bg-cyan-600"
                    aria-label={isCollapsed ? "Expandir menú" : "Colapsar menú"}>
                    {isCollapsed ? (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M13 5l7 7-7 7M5 5l7 7-7 7"/>
                        </svg>
                    ) : (
                        <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M11 19l-7-7 7-7m8 14l-7-7 7-7"/>
                        </svg>
                    )}
                </button>
            </div>
            
            <div className="flex justify-center overflow-hidden">
                <h1 className={`whitespace-nowrap ${isCollapsed ? 'opacity-0 w-0 transform duration-200' : 'opacity-100 transform duration-200'}
                    transition-opacity duration-300 text-white font-semibold`}>{user.username}</h1>
            </div>
            <ul className={`${isCollapsed ? 'transform duration-200' : 'mt-24 transform duration-200'}`}>
                {menuItems.map((item) => (
                    <li key={item.path}>
                        <Link to={item.path}
                        className={`flex items-center py-3 border-t border-b border-l-0
                            border-r-0 border-t-white border-b-white transition-colors
                            text-xl overflow-hidden
                            ${isCollapsed ? 'justify-center px-0' : 'pl-4 gap-4'} ${
                            location.pathname === item.path
                                ? "bg-white font-bold text-cyan-700"
                                : "text-white font-semibold hover:bg-cyan-400 hover:bg-opacity-30"
                        }`} title={isCollapsed ? item.name : ''} >
                        <span className="flex-shrink-0">{item.icon}</span>
                        <span className={`${isCollapsed ? 'hidden' : 'block'} transition-opacity duration-200`}>{item.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
            {!isCollapsed && (
                <div className="mt-4 flex justify-center">
                    <button onClick={()=>{logout(); window.location.href="/"}} className="py-4 px-4 bg-white rounded-lg shadow-lg
                    border border-gray-400 border-opacity-50 text-red-500 text-xl
                    font-bold hover:bg-gray-300 transition-colors duration-200"><Link>Cerrar Sesión</Link></button>
                </div>
            )}  
        </nav>
    )
}

export default Navbar_Gerente;