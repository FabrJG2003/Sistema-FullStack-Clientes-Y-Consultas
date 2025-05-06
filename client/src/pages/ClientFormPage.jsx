import { useForm } from 'react-hook-form';
import { useClients } from '../context/ClientsContext';

function ClientFormPage() {
  
  const { register, handleSubmit } = useForm();
  const { createClient } = useClients()

  const onSubmit = handleSubmit ((data) => {
    createClient(data)
  })

  return (
    <div className='bg-zinc-800 max-w-md w-full p-10 rounded-md'>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="RUC"
          {...register('ruc')} autoFocus
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

        <input type="text" placeholder="Razón Social"
          {...register('name')} autoFocus 
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />

        <input type="email" placeholder="Correo Electrónico"
          {...register('email')} autoFocus 
          className='w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2' />
        <button type="submit">Guardar Cliente</button>
      </form>
    </div>
  );
}

export default ClientFormPage;