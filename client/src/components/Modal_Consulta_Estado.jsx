import { XMarkIcon } from '@heroicons/react/24/outline';
import { useConsultas } from '../context/ConsultaContext';

const ModalConsultaEstado = ({consulta, isOpen, onClose, onRealizado, onNoRealizado, onActualizar }) => {

  const { updateConsulta } = useConsultas();

  const handleRealizado = async (id, consulta) => {
    const actualizada = await {...consulta, state: 'Realizado'}
    await updateConsulta(id, actualizada);
    console.log('Nombre en Realizado: ', actualizada.cliente.name)
    onActualizar(actualizada, actualizada.cliente.name);
    onClose();
  }

  const handleNoRealizado = async (id, consulta) => {
    const actualizada = await {...consulta, state: 'No Realizado'}
    await updateConsulta(id, actualizada);
    onActualizar(actualizada, actualizada.cliente.name);
    onClose();
  }

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-md">
        <div className="flex justify-between items-center mb-4 pb-2">
          <h2 className='text-xl font-bold'>Cambie el Estado de la Consulta</h2>
          <button onClick={onClose} className="flex text-gray-600 hover:text-gray-950">
            <XMarkIcon className='h-5 w-5'/>
          </button>
        </div>
        <div className='flex items-center gap-8 w-full justify-center pt-2'>
          <button onClick={() => {{onRealizado} handleRealizado(consulta._id, consulta);}} className='px-4 py-2 bg-green-600 hover:bg-green-700
          text-white rounded-lg font-medium transition-colors duration-300'>
            Realizado
          </button>
          <button onClick={() => {{onNoRealizado} handleNoRealizado(consulta._id, consulta);}} className='px-4 py-2 bg-red-500 hover:bg-red-600
          text-white rounded-lg font-medium transition-colors duration-300'>
            No Realizado
          </button>
        </div>
      </div>
    </div>
  )
}

export default ModalConsultaEstado;