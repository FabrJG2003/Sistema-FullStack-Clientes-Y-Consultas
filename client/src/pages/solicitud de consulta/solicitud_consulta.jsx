import { use, useState } from "react";
import { ArrowLongRightIcon, CheckCircleIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { getClientsByDataRequest } from "../../api/clients";

function SolicitudConsulta() {

  const [ active_cliente, setActiveCliente ] = useState(false);
  const [ active_no_cliente, setActiveNoCliente ] = useState(false);
  const [ selectedOption, setSelectedOption ] = useState(false);

  // FormData
  const [ formData, setFormData ] = useState({
    ruc: "",
    email: "",
    razonSocial: "",
  })

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  const handleInput = (e) => {
    const { name, value } = e.target;
    setFormData( prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    if(!selectedOption) {
      setError('Por favor, seleccione una opción');
      console.log("Hola1")
      return;
    }
    if(active_cliente) {
      //Validar todos los formularios completos
      if(!formData.ruc || !formData.email){
        setError('Por favor, complete todos los campos requeridos');
        console.log("Hola2")
        console.log("formData.ruc: ", formData.ruc);
        console.log("formData.email: ", formData.email);
        return;
      }
      setLoading(true);
      setError("");
    
      try {
        console.log("Hola3")
        console.log("formData: ", formData)
        console.log("formData.ruc: ", formData.ruc)
        console.log("formData.email: ", formData.email)
        const response = await getClientsByDataRequest(formData.ruc, formData.email);
        console.log(response.data)

      if(response) {
        console.log('CLIENTE: ', response.data);
        navigate('/solicitar-consulta/cliente', { state: { cliente: response.data } })
      } else {
        setError('Cliente no encontrado. Por favor, verifique los datos ingresados: ', data.message);
      }

      } catch (error) {
        setError("Eror al conectar con el servidor.");
      } finally {
        setLoading(false);
      }
    } else if (active_no_cliente) {
      if(!formData.ruc || !formData.email || !formData.razonSocial){
        setError('Por favor, complete todos los campos requeridos');
        return;
      }
      console.log("RUC: ", formData.ruc);
      console.log("Email: ", formData.email);
      console.log("Razon Social: ", formData.razonSocial);
      navigate('/solicitar-consulta/no-cliente', { state: {
        ruc: formData.ruc,
        email: formData.email,
        razonSocial: formData.razonSocial
      } });
    }
  }

  return(
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/*1ra columna*/}
        <div className="min-h-screen bg-gradient-to-br from-cyan-600 to-cyan-700 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-white font-extrabold text-3xl font-Roboto">ESTUDIO CONTABLE RUIZ NIÑO</h1>
            <h2 className="text-white font-bold text-2xl font-Roboto mt-4">ASESORES & CONSULTORES S.R.L.</h2>
            <h3 className="text-white font-semibold text-xl font-Roboto pt-8"><i>Nuestros Servicios:</i></h3>
            <div className="flex pl-8 pt-6 items-center">
              <CheckCircleIcon className="h-6 w-6 mr-4 text-white"/>
              <p className="text-white font-Roboto text-xl font-medium"><i>Auditoría Tributaria Preventiva</i></p>
            </div>
            <div className="flex pl-8 pt-4 items-center">
              <CheckCircleIcon className="h-6 w-6 mr-4 text-white"/>
              <p className="text-white font-Roboto text-xl font-medium"><i>Auditoría Pública y Privada</i></p>
            </div>
            <div className="flex pl-8 pt-4 items-center">
              <CheckCircleIcon className="h-6 w-6 mr-4 text-white"/>
              <p className="text-white font-Roboto text-xl font-medium"><i>Fiscalizaciones de SUNAT y SUNAFIL</i></p>
            </div>
            <div className="flex pl-8 pt-4 items-center">
              <CheckCircleIcon className="h-6 w-6 mr-4 text-white"/>
              <p className="text-white font-Roboto text-xl font-medium"><i>Técnicas Tributarias, Contables y Laborales</i></p>
            </div>
            <div className="flex pl-8 pt-4 items-center">
              <CheckCircleIcon className="h-6 w-6 mr-4 text-white"/>
              <p className="text-white font-Roboto text-xl font-medium"><i>Formalización de Empresas</i></p>
            </div>
            <div className="flex pl-8 pt-4 items-center">
              <CheckCircleIcon className="h-6 w-6 mr-4 text-white"/>
              <p className="text-white font-Roboto text-xl font-medium"><i>Elección del Régimen Tributario</i></p>
            </div>
          </div>
        </div>
        {/*2da columna*/}
        <div>
          <div className="h-screen px-4">
            <h1 className="text-4xl font-bold font-Inter pt-12 pb-8 text-center">Solicitud de Consulta</h1>
            <h2 className="text-xl font-bold font-Inter">1. Elija una opción</h2>
            <div className="flex flex-col"> {/*Botones*/}
              <button onClick={() => {setActiveCliente(true); setSelectedOption(true); setActiveNoCliente(false)}} className={`mt-6 border-2 rounded-md
                py-2 text-xl font-medium duration-300 transition-colors border-cyan-600
                ${active_cliente ? "bg-cyan-600 text-white" : "hover:bg-cyan-600 hover:text-white"}`}>
                <div className="flex justify-start pl-4">
                  {active_cliente ? <div>&#x2688;</div> : <div>&#x25CB;</div>}
                  <div className="ml-8 font-Inter">Cliente</div>
                </div>
              </button>
              <button onClick={() => {setActiveNoCliente(true); setSelectedOption(true); setActiveCliente(false)}} className={`mt-4 border-2 rounded-md
                py-2 text-xl font-medium duration-300 transition-colors border-cyan-600 ring-cyan-900
                ${active_no_cliente ? "bg-cyan-600 text-white" : "hover:bg-cyan-600 hover:text-white"}`}>
                <div className="flex justify-start pl-4">
                  {active_no_cliente ? <div>&#x2688;</div> : <div>&#x25CB;</div>}
                  <div className="ml-8 font-Inter">No Cliente</div>
                </div>
              </button>
              {active_cliente ? (
                <div className="pt-6 transform transition-all duration-300 ease-in-out">
                  <p className="font-medium font-Inter">Ingrese los datos de Cliente:</p>
                  <div className="px-16 py-2">
                    <label className="pb-2 font-medium">RUC:</label>
                    <input className="w-full py-1 border-2 border-cyan-700 rounded-md
                    placeholder:text-gray-400 placeholder:font-Inter"
                    name="ruc"
                    value={formData.ruc || ""}
                    onChange={handleInput}
                    placeholder=" RUC"/>
                  </div>
                  <div className="px-16 py-2">
                    <label className="pb-2 font-medium">Correo Electrónico:</label>
                    <input className="w-full py-1 border-2 border-cyan-700 rounded-md
                    placeholder:text-gray-400 placeholder:font-Inter"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInput}
                    placeholder=" Correo Electrónico"/>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
              {active_no_cliente ? (
                <div className="pt-3 transform transition-all duration-300 ease-in-out">
                  <p className="font-medium font-Inter">Ingrese los siguientes datos:</p>
                  <div className="px-16 py-1">
                    <label className="pb-2 font-medium">RUC:</label>
                    <input className="w-full py-1 border-2 border-cyan-700 rounded-md
                    placeholder:text-gray-400 placeholder:font-Inter"
                    name="ruc"
                    value={formData.ruc || ""}
                    onChange={handleInput}
                    placeholder=" RUC"/>
                  </div>
                  <div className="px-16 py-1">
                    <label className="pb-2 font-medium">Razón Social:</label>
                    <input className="w-full py-1 border-2 border-cyan-700 rounded-md
                    placeholder:text-gray-400 placeholder:font-Inter"
                    name="razonSocial"
                    value={formData.razonSocial || ""}
                    onChange={handleInput}
                    placeholder=" Razón Social"/>
                  </div>
                  <div className="px-16 py-1">
                    <label className="pb-2 font-medium">Correo Electrónico:</label>
                    <input className="w-full py-1 border-2 border-cyan-700 rounded-md
                    placeholder:text-gray-400 placeholder:font-Inter"
                    name="email"
                    value={formData.email || ""}
                    onChange={handleInput}
                    placeholder=" Correo Electrónico"/>
                  </div>
                </div>
              ) : (
                <div></div>
              )}
            </div>
            <div className="absolute bottom-0 right-8 p-4">
              <button className="py-2 px-8 border-2 border-cyan-600 bg-cyan-600 rounded-lg
                text-white font-bold font-Inter hover:bg-cyan-700 transition-colors duration-300
                hover:border-cyan-700 text-lg"
                onClick={handleSubmit}
                disabled={loading}>
                Siguiente
                <ArrowLongRightIcon className="inline-block h-6 w-6 ml-2" />
              </button>
          </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SolicitudConsulta;