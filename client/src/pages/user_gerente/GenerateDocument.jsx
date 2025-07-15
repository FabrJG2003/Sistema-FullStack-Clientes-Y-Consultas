import { Link, useParams, useNavigate } from "react-router-dom";
import { use, useEffect, useState, useRef } from "react";
import { useClients } from "../../context/ClientsContext";
import { ChevronDoubleRightIcon, UserMinusIcon, PlusCircleIcon,
  QueueListIcon, ClockIcon, DocumentPlusIcon } from "@heroicons/react/24/outline";
import { createDocumentRequest, getDocumentRequest } from "../../api/document.js";

function GenerarDocumento(){

  const { getClientName, deleteClient } = useClients();

  const [ cliente, setCliente] = useState([]);
  const { name } = useParams();
  const [ error, setError ] = useState(null);
  const [ titulo, setTitulo] = useState([]);
  const [ descripcion, setDescripcion ] = useState([]);

  useEffect(() => {
    const fetchClient = async () => {
        try {
            const response = await fetch(`/api/clients/name/${name}`)
            const cliente_nombre = await getClientName(name);
            setCliente(cliente_nombre)
            setContador(cliente_nombre.contador)
            if(!response.ok){
                throw new Error('Cliente no encontrado')
            }
        } catch (err) {
            setError(err.message)
        }
    }
    if(name) fetchClient();
  }, [name])

  const generarYDescargarPDF = async (clienteId) => {
    try {
      const createRes = await createDocumentRequest(clienteId, {titulo, descripcion});
      const documentoId = createRes.data.id;
      const res = await getDocumentRequest(documentoId);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error("Error al generar el PDF", error);
    }
  };

  return(
    <>
      <div>
        <div className='py-4 flex items-center justify-between'>
          <h1 className='text-4xl font-bold font-Roboto'>Generar Documento</h1>
          <div className="flex items-center px-4">
            <p className="px-2 justify-end text-cyan-700 font-semibold">
              <Link to='/home'>R&N Estudio Contable</Link>
            </p>
            <img
              src="/../../images/logo_empresa_192.png"
              alt="logo"
              className="w-10 h-10"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-between pr-16 pt-2">
        <p className="py-2 text-lg"><b>Cliente:</b> {cliente.name}</p>
      </div>
      <form>
        <div className='grid grid-cols-1 md:grid-cols-1 gap-6 py-2'>
          <div>
            <div className="px-2 flex items-center gap-6 py-2">
              <label className="font-medium">Título de documento: </label>
              <input type="text" placeholder="Título de Documento" className='bg-zinc-100 w-1/2
                px-4 py-2 rounded-md my-2 border border-cyan-700 focus:outline-none focus:ring-2
                focus:ring-cyan-700 placeholder-zinc-500' autoFocus value={titulo}
                onChange={(e) => setTitulo(e.target.value)}/>
            </div>
            <div className="px-2 flex gap-6 pr-12 py-8">
              <label className="font-medium">Descripción: </label>
              <textarea type="text" placeholder="Descripción" className='bg-zinc-100 w-full
                px-4 py-2 rounded-md my-2 border border-cyan-700 focus:outline-none focus:ring-2
                focus:ring-cyan-700 placeholder-zinc-500' autoFocus rows={5} value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}/>
            </div>
          </div>
        </div>
      </form>
      <div className="flex justify-center py-8">
        <button onClick={() => generarYDescargarPDF(cliente._id)} className="inline-flex items-center bg-white px-5 py-3 rounded-lg shadow-md
        text-cyan-700 font-bold hover:bg-gray-200 transition-all duration-200 border-cyan-700 border-2">
        <DocumentPlusIcon className="h-6 w-6 mr-2"/>
        Generar Documento
      </button>
      </div>
    </>
  )

}

export default GenerarDocumento;