import { use, useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useClients } from "../context/ClientsContext";
import { Link, useSearchParams } from "react-router-dom";
import { EyeIcon, PencilIcon, UserPlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function ClientsPage() {

  const { getClients, clients } = useClients();
  const { getContadores } = useAuth();
  const [contadores, setContadores] = useState([]);
  const [searchRuc, setSearchRuc] = useState("");
  const [searchContador, setSearchContador] = useState("");
  const [filteredClientes, setFilteredClientes] = useState([]);

  useEffect(() => {
    getClients()
  }, [])

  useEffect(() => {
    const loadContadores = async () => {
      try {
        const contadoresList = await getContadores();
        setContadores(contadoresList);
      } catch (error) {
        console.error('Error Cargando contadores:', error);
      };
    };
    loadContadores();
  }, []);

  useEffect(() => {
    const resultados = clients.filter(client => {
      const matchRuc = client.ruc.toLowerCase().includes(searchRuc.toLowerCase());
      const matchContador = client.contador.name.toLowerCase().includes(searchContador.toLowerCase());
      return matchRuc && matchContador
    });
    setFilteredClientes(resultados);
  }, [clients, searchRuc, searchContador]);

  return (
    <div>
      <div className='py-4 flex items-center justify-between'>
        <h1 className='text-4xl font-bold font-Roboto'>Clientes</h1>
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
        <p className="py-2">Lista de <b><i>Clientes</i></b> registrados en la empresa</p>
        <Link to="/clients/nuevo-cliente" className="inline-flex items-center bg-gradient-to-br from-cyan-600 to-cyan-400 px-12 py-3 rounded-lg shadow-md
          text-white font-bold hover:bg-gradient-to-br hover:from-cyan-700 hover:to-cyan-500 transition-all duration-200">
          <UserPlusIcon className=" h-6 w-6 mr-1"/>
          Agregar Cliente
        </Link>
      </div>
      <div className="flex items-center py-4 pt-6">
        <p className="px-4 font-bold">Filtros:</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pr-32">
        <div className="relative px-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-700"/>
          </div>
          <input type="text" placeholder="Buscar por RUC" value={searchRuc}
          onChange={(e) => setSearchRuc(e.target.value)} className="block w-full pl-10 pr-3
          py-2 border border-cyan-700 rounded-md shadow-sm focus:outline-none
          focus:ring-2 focus:ring-cyan-700 placeholder-gray-700" />
        </div>
        <div className="relative px-1">
          <select value={searchContador} onChange={(e) => setSearchContador(e.target.value)}
            className="block w-full pl-10 pr-3 py-2 border border-cyan-700 rounded-md
            shadow-sm focus:ring-2 focus:ring-cyan-700 focus:outline-none appearance-none text-gray-700">
              <option value="">Buscar por Contador</option>
              {contadores.map((contador) => (
                <option key={contador._id} value={contador.username}>{contador.username}</option>
              ))}
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>
      </div>
      <div className="bg-white overflow-hidden py-2 pr-8">
        <table className="min-w-full divide-y-reverse divide-gray-200 shadow-lg">
          <thead className="bg-gradient-to-br from-cyan-600 to-sky-400">
            <tr>
              <th className="px-8 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200">RUC</th>
              <th className="px-8 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200">Razón Social</th>
              <th className="px-8 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200">Correo Electrónico</th>
              <th className="px-8 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200">Contador Asignado</th>
              {/* <th className="w-24 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200"></th>
              <th className="w-24 py-3 font-bold text-gray-100 tracking-wider border-l border-gray-200"></th> */}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredClientes.map((client) => (
              <tr key={client._id} className="hover:bg-gray-200">
                <td className="text-center py-4 whitespace-nowrap border-l border-gray-200">
                  <div className="text-md font-Inter font-semibold">{client.ruc}</div>
                </td>
                <td className="text-center py-4 whitespace-nowrap">
                  <div className="text-sm font-Inter">{client.name}</div>
                </td>
                <td className="text-center py-4 whitespace-nowrap">
                  <div className="text-sm font-Inter">{client.email}</div>
                </td>
                <td className="text-center py-4 whitespace-nowrapx">
                  <div className="text-sm font-Inter">{client.contador.name}</div>
                </td>
                <td className="whitespace-nowrap text-center">
                  <Link to={`/clients/name/${client.name}`} className="inline-flex items-center px-3 py-1 bg-gradient-to-br from-cyan-600 to-sky-400
                  hover:from-cyan-700 hover:to-sky-500 transition-colors duration-300 text-white font-medium
                  font-Roboto text-sm rounded-md">
                    <EyeIcon className="h-4 w-4 mr-1"/>
                    Ver
                  </Link>
                </td>
                <td className="whitespace-nowrap text-center">
                  <Link to={`/clients/${client._id}`} className="inline-flex items-center px-3 py-1 bg-gradient-to-br from-cyan-600 to-sky-400
                  hover:from-cyan-700 hover:to-sky-500 transition-colors duration-300 text-white font-medium
                  font-Roboto text-sm rounded-md">
                    <PencilIcon className="h-4 w-4 mr-1"/>
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ClientsPage;