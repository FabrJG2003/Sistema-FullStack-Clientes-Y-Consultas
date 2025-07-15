import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { UserGroupIcon, UserCircleIcon, UserPlusIcon, MinusIcon } from "@heroicons/react/24/outline";

function HomeUser_Contador() {

    const { user } = useAuth();

    return (
        <>
        <div className="py-4 flex items-center justify-between">
            <h1 className="text-4xl font-bold font-Roboto"> Bienvenido, {user.username} </h1>
            <div className="flex items-center px-4">
                <p className="px-2 justify-end text-cyan-700 font-semibold">
                    <Link to='/home'>R&N Estudio Contable</Link>
                </p>
                <img
                    src="../images/logo_empresa_192.png"
                    alt="logo"
                    className="w-10 h-10"
                />
            </div>
        </div>
        <p>Sistema virtual de clientes y agenda de consultas de la empresa <b>R&N Asesores Contables</b></p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto pt-24">
            <div className="grid grid-cols-1 gap-8">
                <Link to="/clients-contador" className="flex flex-col items-center justify-center py-3 px-2
                bg-cyan-600 rounded-xl shadow-md hover:shadow-lg hover:bg-cyan-700 transition-all
                duration-300 border border-cyan-600 hover:border-cyan-700">
                    <UserGroupIcon className="h-10 w-10 text-white mb-2" />
                    <span className="text-2xl font-semibold text-white">Clientes Asignados</span>
                </Link>
            </div>
            <div className="grid grid-cols-1 gap-8">
                <Link to="/clients-contador" className="flex flex-col items-center justify-center py-3 px-2
                bg-cyan-600 rounded-xl shadow-md hover:shadow-lg hover:bg-cyan-700 transition-all
                duration-300 border border-cyan-600 hover:border-cyan-700">
                    <UserGroupIcon className="h-10 w-10 text-white mb-2" />
                    <span className="text-2xl font-semibold text-white">Clientes Asignados</span>
                </Link>
            </div>
        </div>

        </>
    )
}

export default HomeUser_Contador;