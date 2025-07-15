import { Link } from 'react-router-dom';

function SolicitudPage () {
  return(
    <>
      <div className='py-4 flex items-center justify-between'>
        <h1 className='text-4xl font-bold font-Roboto'>Solicitudes Pendientes</h1>
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
    </>
  )
}

export default SolicitudPage;