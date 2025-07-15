import { useForm } from 'react-hook-form';
import { useClients } from '../../context/ClientsContext';
import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { PlusIcon } from '@heroicons/react/24/outline';
import { useNavigate, useParams } from 'react-router-dom';

function ContadorFormPage() {

  const { register, handleSubmit, setValue, reset } = useForm();
  const { createContador } = useAuth();
  const navigate = useNavigate();

  const onSubmit = handleSubmit ( async (data) => {
    await createContador(data)
    navigate('/contadores', { state: { reload: true } });
  });

  return(
    <>
      <div>
        <div className='py-4 flex items-center justify-between'>
          <h1 className='text-4xl font-bold font-Roboto'>Agregar Contador</h1> 
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
          <p className="py-2">Para registrar un contador en el sistema, se deben agregar los campos: Nombre y Correo Electrónico</p>  
          <p className='text-red-500 font-bold font-Roboto'>Importante:</p>
          <li className='pl-8'>La contraseña por defecto será: <b><i>123456789</i></b></li>
          <li className='pl-8'>El Contador deberá acceder a su <b><i>Perfil</i></b> para cambiar la contraseña.</li>
        </div>
        <div className='pr-8 py-8'>
          <form onSubmit={onSubmit}>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
              <div> {/*1ra columna*/}
                <div className='px-1'>
                  <label className='font-medium'>Nombre:</label>
                  <input type='text' placeholder='Nombre'
                    {...register('username', {required: true})} autoFocus
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
              </div>
            </div>
            <div className='w-full py-8'>
              <button type="submit" className='mx-auto block py-4 px-6 bg-cyan-600 hover:bg-cyan-700
                transition-all duration-300 text-white font-bold text-xl rounded-lg shadow-md
                '>
                    {/* <PlusIcon className='inline-flex h-6 w-6 mr-2 mb-1'/> */}
                    Agregar Contador
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  )

}

export default ContadorFormPage;