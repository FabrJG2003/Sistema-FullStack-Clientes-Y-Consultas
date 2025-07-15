import { useForm } from 'react-hook-form';
import { useClients } from '../context/ClientsContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';
import { useConsultas } from '../context/ConsultaContext';

function ClientFormPage() {
  
  const { register, handleSubmit, setValue, reset } = useForm();
  const { createClient, getClient, updateClient } = useClients();
  const { getContadores } = useAuth();
  const [ contadores, setContadores ] = useState([]);
  const [ titulo, setTitulo ] = useState('Agregar')
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadClient() {
      if(params.id) {
        const contadoresList = await getContadores();
        setContadores(contadoresList);
        const client = await getClient(params.id)
        const contadorAsignado = contadoresList.find(
          c => c._id === client.contador.id || c.username === client.contador.name
        )
        console.log(client)
        reset({
          ruc: client.ruc,
          name: client.name,
          email: client.email,
          contadorNombre: contadorAsignado?.username || client.contador.name
        });
        setTitulo('Editar')
      }
    }
    loadClient()
  }, [params.id]);

  useEffect(() => {
    const loadContadores = async () => {
      try {
        const contadoresList = await getContadores();
        setContadores(contadoresList);
      } catch (error) {
        console.error('Error Cargando contadores.', error);
      };
    };
    loadContadores();
  }, []);

  const onSubmit = handleSubmit ( async (data) => {
    if (params.id) {
      updateClient(params.id, data)
    } else {
      createClient(data)
    }
  navigate('/clients')
  });

  return (
    <>
      <div>
        <div className='py-4 flex items-center justify-between'>
          <h1 className='text-4xl font-bold font-Roboto'>{titulo} Cliente</h1> 
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
        <div className="pr-24 pt-2">
          <p className="py-2"> {params.id ? 'Puede editar los campos del cliente' : 'Para registrar un cliente en el sistema, se deben agregar los campos: RUC, Razón Social, Correo Electrónico y Contador Asignado'} </p>  
        </div>
        <div className='pr-8 py-8'>
          <form onSubmit={onSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div> {/*1ra columna*/}
                <div className='px-1'>
                  <label className='font-medium'>RUC:</label>
                  <input type='text' placeholder='RUC'
                    {...register('ruc', {required: true})} autoFocus
                    className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2 border border-cyan-700
                      focus:outline-none focus:ring-2 focus:ring-cyan-700 placeholder-zinc-500'/>
                </div>
                <div className='px-1'>
                  <label className='font-medium'>Razón Social:</label>
                  <input type='text' placeholder='Razón Social'
                    {...register('name', {required: true})} autoFocus
                    className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2 border border-cyan-700
                      focus:outline-none focus:ring-2 focus:ring-cyan-700 placeholder-zinc-500'/>
                </div>
              </div>
              <div>
                <div className='px-1'>
                  <label className='font-medium'>Correo Electrónico:</label>
                  <input type='text' placeholder='Correo Electrónico'
                    {...register('email', {required: true})} autoFocus
                    className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2 border border-cyan-700
                      focus:outline-none focus:ring-2 focus:ring-cyan-700 placeholder-zinc-500'/>
                </div>
                <div className='px-1'>
                  <label className='font-medium'>Contador Asignado:</label>
                  <select {...register('contadorNombre', {required: 'Debe seleccionar un contador'})}
                    className='w-full px-4 py-2 border border-cyan-700 rounded-lg focus:outline-none focus:ring-2
                    focus:ring-cyan-700 my-2 bg-zinc-100'>
                    <option value="" className='text-zinc-500'>Seleccione un Contador:</option>
                    {contadores.map((contador) => (
                      <option key={contador._id} value={contador.username}>
                        {contador.username} 
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            <div className='w-full py-8'>
              <button type="submit" className='mx-auto block py-4 px-6 bg-cyan-600 hover:bg-cyan-700
                transition-all duration-300 text-white font-bold text-xl rounded-lg shadow-md
                '>
                    {/* <PlusIcon className='inline-flex h-6 w-6 mr-2 mb-1'/> */}
                    {titulo} Cliente
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ClientFormPage;