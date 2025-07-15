import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Solicitud_Consulta_Final(){

  const navigate = useNavigate();

  return(
    <div className='mx-auto'>
      <h1 className='text-4xl font-bold font-Inter pt-12 pb-12 text-center bg-gradient-to-br from-cyan-500
      to-cyan-600 text-white'>Solicitud de Consulta</h1>
      <div className='pl-8'>
        <div className='pt-8'>
          <h2 className="text-2xl font-semibold mb-2">Solicitud de consulta creada con éxito</h2>
          <p className="pb-12">Se le enviará mensaje a su correo cuando se acepte y formalice su consulta.</p>
          <p>Gracias</p>
          <h3 className="pb-8">Equipo R&N Asesores Contables</h3>
          <Link to="https://www.rnasesorescontables.com/" className="py-2 px-8 border-2 border-cyan-600 bg-cyan-600 rounded-lg
            text-white font-bold font-Inter hover:bg-cyan-700 transition-colors duration-300
            hover:border-cyan-700 text-lg"
            >
            Inicio
          </Link>
        </div>
      </div>
    </div>
  )

}

export default Solicitud_Consulta_Final;