import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useClients } from '../context/ClientsContext';
import { useConsultas } from '../context/ConsultaContext';
import { ChevronDownIcon, ArrowUpIcon, ArrowDownIcon } from '@heroicons/react/24/outline';
import { useDocuments } from '../context/DocumentContext';
import { getDocumentRequest } from '../api/document';

function HistorialConsultasCliente() {

  const { name } = useParams();
  const [ cliente, setCliente ] = useState({});
  const [ contador, setContador ] = useState({});
  const [ error, setError ] = useState(null);
  const [ consultasByName, setConsultasByName ] = useState([]);
  const [ expandedConsulta, setExpandedConsulta ] = useState(null);
  const [ ordenAscendente, setOrdenAscendente ] = useState(false);
  const [activeTab, setActiveTab] = useState('consultas');
  
  const { documents, getDocumentsByClient } = useDocuments();
  const { getClientName } = useClients();
  const { getConsultasByClientName } = useConsultas();

  useEffect(() => {
    const fetchClient = async () => {
      try {
        const response = await fetch(`/api/clients/name/${name}/historial-consultas`)
        const cliente_nombre = await getClientName(name);
        setCliente(cliente_nombre)
        setContador(cliente_nombre.contador)
        if(!response.ok){
          throw new Error('Cliente no encontrado')
        }
        } catch (error) {
          setError(error.message);
        }
    }
    if(name) fetchClient();
  }, [name]);

  useEffect(() => {
    const fetchDocumentos = async () => {
      try {
        console.log("Hola, clienteId: ", cliente._id)
        const documentos = await getDocumentsByClient(cliente._id)
        console.log('cliente id: ', cliente._id)
        console.log('documentos: ', documentos)
      } catch(error){
        setError(error.message)
      }
    }
    if(cliente._id) fetchDocumentos();
  }, [cliente._id])

  useEffect(() => {
      const fetchConsultas = async () => {
      const res = await getConsultasByClientName(name);
      //const ordenadas = res.sort((a, b) => new Date(b.fecha) - new Date(a.fecha));
      const ordenadas = [...res].sort((a, b) => 
        ordenAscendente
          ? new Date(a.fecha) - new Date(b.fecha)
          : new Date(b.fecha) - new Date(a.fecha)
      )
      setConsultasByName(ordenadas);
    }
    if(name) fetchConsultas();
  }, [name, ordenAscendente])

  const toggleOrden = () => {
    setOrdenAscendente(!ordenAscendente)
  }

  const toggleExpand = (index) => {
    setExpandedConsulta(expandedConsulta === index ? null : index);
  }

  const verPDF = async (documentoId) => {
    try {
      const res = await getDocumentRequest(documentoId);
      const blob = new Blob([res.data], { type: 'application/pdf' });
      const url = URL.createObjectURL(blob);
      window.open(url, "_blank");
      setTimeout(() => URL.revokeObjectURL(url), 10000);
    } catch (error) {
      console.error("Error al generar el PDF", error);
    }
  }

  return (
    <>
      <div className='py-4 flex items-center justify-between'>
        <h1 className='text-4xl font-bold font-Roboto'>Historial De: {cliente.name}</h1>
        <div className="flex items-center px-4">
          <p className="px-2 justify-end text-cyan-700 font-semibold">
            <Link to='/home'>R&N Estudio Contable</Link>
          </p>
          <img
            src="/../images/logo_empresa_192.png"
            alt="logo"
            className="w-10 h-10"
          />
        </div>
      </div>
      <div className="flex border-b border-gray-200 mt-4">
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'consultas' ? 'text-cyan-700 border-b-2 border-cyan-700' : 'text-gray-500'}`}
          onClick={() => setActiveTab('consultas')}
        >
          Consultas
        </button>
        <button
          className={`py-2 px-4 font-medium ${activeTab === 'documentos' ? 'text-cyan-700 border-b-2 border-cyan-700' : 'text-gray-500'}`}
          onClick={() => setActiveTab('documentos')}
        >
          Documentos
        </button>
      </div>
      {activeTab === 'consultas' ? (
        <div className='mt-8 pr-8'>
        <div>
        {consultasByName.length === 0 ? (
          <p className='text-gray-500 text-center py-8'>No hay consultas registradas para el Cliente {cliente.name}</p>
        ) : (
          <>
            <div className='flex justify-end pb-4 pr-8'>
              <button onClick={toggleOrden} className='flex items-center gap-2 py-2 px-4 border-2 rounded-md
                border-cyan-700 text-cyan-700 font-bold'>
                Fecha
                <ArrowUpIcon className={`h-5 w-5 transform transition-transform duration-300 ${ordenAscendente ? 'rotate-180' : 'rotate-0'}`}/>
              </button>
            </div>
            {consultasByName.map((consulta, index) => (
            <div key={consulta._id} className='border rounded-md shadow-md'>
              <div onClick={() => toggleExpand(index)} className='flex items-center px-4 py-3 bg-cyan-50 cursor-pointer'>
                <button>
                  <ChevronDownIcon className={`h-5 w-5 mr-3 transform transition-transform duration-300
                    ${expandedConsulta === index ? 'rotate-180' : 'rotate-0'}`}/>
                </button>
                <h2 className='font-semibold font-Roboto'>Consulta N°{index + 1} | {consulta.asunto}</h2>
              </div>
              <div className={`overflow-hidden transition-all duration-300 ease-in-out
                ${expandedConsulta === index ? 'max-h-[500px] opacity-100 py-2 px-4'
                : 'max-h-0 opacity-0 px-4'}`}>
              {expandedConsulta === index && (
                <div className='px-4 py-2'>
                  <div className='flex items-center justify-between'>
                    {consulta.state === 'Pendiente' ? 
                      <div className='flex items-center gap-2'>
                        <p className='font-bold'>Estado: </p>
                        <p className='text-orange-500 font-medium'>{consulta.state}</p>
                      </div>
                    : ''}
                    {consulta.state === 'Realizado' ? 
                      <div className='flex items-center gap-2'>
                        <p className='font-bold'>Estado: </p>
                        <p className='text-green-500 font-medium'>{consulta.state}</p>
                      </div>
                    : ''}
                    {consulta.state === 'No Realizado' ? 
                      <div className='flex items-center gap-2'>
                        <p className='font-bold'>Estado: </p>
                        <p className='text-red-500 font-medium'>{consulta.state}</p>
                      </div>
                    : ''}
                  </div>
                  <p><strong>Descripción: </strong> {consulta.descripcion}</p>
                  <p><strong>Fecha: </strong> {new Date(consulta.fecha).toLocaleDateString()}</p>
                  <p><strong>Hora: </strong> {consulta.hora}</p>
                </div>
              )}
              </div>
            </div>
          ))}
          </>  
        )}
        </div>
      </div>
      ):(
        <div className='mt-8 pr-8'>
          {documents.length === 0 ? (
            <p className='text-gray-500 text-center py-8'>No hay documentos registrados para el Cliente {cliente.name}</p>
          ) : (
            <>
              <div className='flex justify-end pb-4 pr-8'>
                <button onClick={toggleOrden} className='flex items-center gap-2 py-2 px-4 border-2 rounded-md border-cyan-700 text-cyan-700 font-bold'>
                  Fecha
                  <ArrowUpIcon className={`h-5 w-5 transform transition-transform duration-300 ${ordenAscendente ? 'rotate-180' : 'rotate-0'}`}/>
                </button>
              </div>
              
              {documents.map((documento, index) => (
                <div key={documento._id} className='border rounded-md shadow-md mb-4'>
                  <div onClick={() => toggleExpand(index)} className='flex items-center px-4 py-3 bg-cyan-50 cursor-pointer'>
                    <button>
                      <ChevronDownIcon className={`h-5 w-5 mr-3 transform transition-transform duration-300 ${expandedConsulta === index ? 'rotate-180' : 'rotate-0'}`}/>
                    </button>
                    <h2 className='font-semibold font-Roboto'>Documento N°{index + 1} | {documento.titulo}</h2>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ease-in-out ${expandedConsulta === index ? 'max-h-[500px] opacity-100 py-2 px-4' : 'max-h-0 opacity-0 px-4'}`}>
                    {expandedConsulta === index && (
                      <div className='px-4 py-2'>
                        <p><strong>Título:</strong> {documento.titulo}</p>
                        <p><strong>Fecha:</strong> {new Date(documento.fecha).toLocaleDateString()}</p>
                        <p><strong>Descripción:</strong> {documento.descripcion}</p>
                        
                        <button onClick={() => verPDF(documento._id)} className="inline-block mt-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700">
                          Ver PDF
                        </button>
                        <a 
                          href={`/api/documents/${documento._id}`} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="inline-block mt-2 px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700"
                        >
                          Ver Documento PDF
                        </a>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </>
          )}
        </div>
      )}
    </>
  )
}

export default HistorialConsultasCliente;