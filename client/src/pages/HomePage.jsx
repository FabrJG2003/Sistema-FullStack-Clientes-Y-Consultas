import { Link } from "react-router-dom";

function HomePage() {
  return (
    <>
      <section className="relative">
        <div className="absolute inset-0 z-0">
          <img
            src = "../images/fondo.jpg"
            alt = "Fondo"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-cyan-900 bg-opacity-20"></div>
        </div>
        <div className="relative z-10 p-8 px-8 flex flex-col md:flex-row justify-between items-center min-h-[200px]">
          <div className="md:text-left">
            <h1 className="text-5xl font-bold text-white">SISTEMA VIRTUAL</h1>
            <p className="text-xl font-semibold mt-2 text-white">Estudio Contable Ruiz Niño</p>
          </div>
          <div className="py-4"> <Link to="/login" className="text-2xl bg-white hover:bg-gray-300 text-cyan-600 hover:text-cyan-500
            font-bold font-Roboto py-4 px-8 rounded-lg shadow-md transition duration-300">Iniciar Sesión</Link> </div>
        </div>
      </section>
      <div>
        <h1 className="text-4xl font-bold font-Roboto text-center py-6 text-cyan-700">R&N Consultores Y Asesores Contables</h1>
        <hr></hr>
        <div className="px-16 py-6 flex flex-col md:flex-row items-center justify-between">
          <div className="px-6">
            <h2 className="text-cyan-700 font-bold py-4 text-3xl">Gerente: CPC Percy Ruiz Niño</h2>
            <h3 className="text-cyan-700 font-bold pb- text-xl font-Roboto">Perito Contable N° 118 | Auditor Independiente N° 306</h3>
            <p className="text-zinc-800 text-lg pt-6 text-justify">Con más de 18 años de experiencia, Percy Ronald Ruiz Niño es un profesional íntegro
                y altamente calificado que se dedica a brindar soluciones integrales a las
                necesidades contables, tributarias, laborales y financieras de empresas de
                diversos rubros.</p>
            <p className="text-zinc-800 text-lg pt-4 text-justify">Su amplia experiencia en la región Piura y a nivel nacional lo convierte en
                un aliado estratégico para el éxito de su negocio.</p>
            <p className="text-zinc-800 text-lg pt-4 text-justify">Fue director de finanzas del Colegio de Contadores Públicos de Piura.</p>
            <h4 className="text-zinc-800 text-lg font-bold pt-6">Formación Académica:</h4>
            <ul className="list-disc pl-5 pt-2">
              <li className="text-zinc-800 text-lg pt-1">Contador Público por la Universidad Nacional de Piura.</li>
              <li className="text-zinc-800 text-lg pt-1">Diplomado en Tributación.</li>
            </ul>
          </div>
          <div>
            <img
              src = "/images/img_1.jpg"
              alt = "Gerente"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;