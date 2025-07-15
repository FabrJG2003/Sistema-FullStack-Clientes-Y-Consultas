import { use, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useClients } from "../../context/ClientsContext";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { EyeIcon, PencilIcon, UserPlusIcon, MagnifyingGlassIcon, UserCircleIcon, PlusIcon } from "@heroicons/react/24/outline";

function ContadoresPage() {

  const { getContadores } = useAuth();
  const [contadores, setContadores] = useState([]);
  const location = useLocation();

  const loadContadores = async () => {
    try {
      const contadoresList = await getContadores();
      setContadores(contadoresList);
    } catch (error) {
      console.error('Error Cargando contadores:', error);
    };
  };

  useEffect(() => {
    loadContadores();
  }, []);

  useEffect(() => {
    if (location.state?.reload) {
      loadContadores();
      window.history.replaceState({}, document.title);
    }
  }, [location.state])

  return (
    <>
      <div className='py-4 flex items-center justify-between'>
        <h1 className='text-4xl font-bold font-Roboto'>Contadores</h1>
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
      <div className="flex justify-between pr-16 pt-2">
        <p className="py-2">Lista de <b><i>Contadores</i></b> registrados en la empresa</p>
        <Link to="/contadores/nuevo-contador" className="inline-flex items-center bg-gradient-to-br from-cyan-600 to-cyan-400 px-12 py-2 rounded-lg shadow-md
          text-white font-bold hover:bg-gradient-to-br hover:from-cyan-700 hover:to-cyan-500 transition-all duration-200">
          <UserCircleIcon className=" h-8 w-8"/>
          <PlusIcon className="h-6 w-6 mr-1"/>
          Agregar Contador
        </Link>
      </div>
      <div className="bg-white overflow-hidden py-12 pr-8">
        <table className="min-w-full divide-y-reverse divide-gray-200 shadow-lg">
          <thead className="bg-gradient-to-br from-cyan-600 to-sky-400">
            <tr>
              <th className="px-8 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200">N°</th>
              <th className="px-8 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200">Nombre</th>
              <th className="px-8 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200">Correo Electrónico</th>
              {/*<th className="px-8 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200">Contador Asignado</th>
              <th className="w-24 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200"></th>
              <th className="w-24 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200"></th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {contadores.map((contador, index) => (
              <tr key={contador._id} className="hover:bg-gray-200">
                <td className="text-center py-4 whitespace-nowrap border-l border-gray-200">
                  <div className="text-md font-Inter font-semibold">{index + 1}</div>
                </td>
                <td className="text-center py-4 whitespace-nowrap border-l border-gray-200">
                  <div className="text-md font-Inter">{contador.username}</div>
                </td>
                <td className="text-center py-4 whitespace-nowrap border-l border-gray-200">
                  <div className="text-md font-Inter">{contador.email}</div>
                </td>
                <td className="whitespace-nowrap text-center">
                  <Link to={`/contadores/name/${contador.username}`} className="inline-flex items-center px-3 py-1 bg-gradient-to-br from-cyan-600 to-sky-400
                  hover:from-cyan-700 hover:to-sky-500 transition-colors duration-300 text-white font-medium
                  font-Roboto text-sm rounded-md">
                    <EyeIcon className="h-4 w-4 mr-1"/>
                    Ver
                  </Link>
                </td>
                <td className="whitespace-nowrap text-center">
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default ContadoresPage;