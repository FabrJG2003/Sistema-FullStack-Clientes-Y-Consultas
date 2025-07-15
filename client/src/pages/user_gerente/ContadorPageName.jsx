import { use, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useClients } from "../../context/ClientsContext";
import { Link, useParams, useSearchParams, useNavigate } from "react-router-dom";
import { EyeIcon, PencilIcon, UserPlusIcon, MagnifyingGlassIcon, UserCircleIcon,
    PlusIcon, ChevronDoubleRightIcon, UserMinusIcon } from "@heroicons/react/24/outline";

function ContadorPageName() {

  const { getContadorName, deleteContador } = useAuth();
  const [ contador, setContador ] = useState([]);
  const { username } = useParams();
  const { clients, getClients } = useClients();
  const [ cantidadClientes, setCantidadClientes ] = useState(0);
  const [ error, setError ] = useState(null);
  const navigate = useNavigate();

  const currentAnio = new Date().getFullYear();
  const [ currentDate, setCurrentDate ] = useState(new Date());
  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ showMonthYearPicker, setShowMonthYearPicker ] = useState(false);
  const [ anios ] = useState( Array.from({length: 5}, (_, i) => currentAnio - i ) );

  const getDaysInMonth = (anio, mes) => {
    return new Date(anio, mes + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (anio, mes) => {
    return new Date(anio, mes, 1).getDay();
  };
  const handlePrevMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const handleDateClick = (dia) => {
    const clickedDia = new Date(currentDate.getFullYear(), currentDate.getMonth(), dia);
    setSelectedDate(clickedDia)
    console.log("Fecha Seleccionada: ", clickedDia.toLocaleDateString());
  };
  const toggleMonthYearPicker = () => {
    setShowMonthYearPicker(!showMonthYearPicker);
  };
  const handleMonthChange = (mesIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), mesIndex, 1));
    setShowMonthYearPicker(false);
  };
  const handleYearChange = (anio) => {
    setCurrentDate( new Date(anio, currentDate.getMonth(), 1));
    setShowMonthYearPicker(false);
  };

  const eliminarContador = async (id) => {
    try {
      await deleteContador(id);
      navigate('/contadores');
    } catch (error) {
      console.error("Error al eliminar Contador.", error);
      setError("No se puede eliminar COntador.");
    }
  }

  useEffect(() => {
    const fetchContador = async () => {
      try {
        const response = await fetch(`/api/contadores/name/${username}`)
        console.log(username);
        const contador_name = await getContadorName(username);
        setContador(contador_name);
        if(!response.ok) {
          throw new Error('Contador no encontrado.');
        }
        await getClients()
      } catch (error) {
        console.log('Error al obtener el contador:');
      }
    }
    if(username) fetchContador()
  }, [username])

  useEffect(() => {
    if(clients.length && username) {
      const clients_asignados = clients.filter(cliente => cliente.contador.name === username);
      setCantidadClientes(clients_asignados.length);
    }
  }, [clients, username])

  return(
    <>
    <div className='py-4 flex items-center justify-between'>
        {console.log(contador)}
        <h1 className='text-4xl font-bold font-Roboto'>Contador: {contador.username}</h1>
        <div className="flex items-center px-4">
          <p className="px-2 justify-end text-cyan-700 font-semibold">
            <Link to='/home'>R&N Estudio Contable</Link>
          </p>
          <img
            src="../../images/logo_empresa_192.png"
            alt="logo"
            className="w-10 h-10"
          />
        </div>
      </div>
      <div className="flex justify-end pr-16 pt-2">
        <Link onClick={() => { eliminarContador(contador._id) }} className="inline-flex items-center bg-red-500 px-10 py-3 rounded-lg shadow-md
          text-white font-bold hover:bg-red-600 transition-all duration-200">
          <UserMinusIcon className=" h-6 w-6 mr-2"/>
          Eliminar Contador
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 py-6">
        <div> {/*1ra Columna*/}
          <div>
            <label className="text-lg font-bold font-Inter">Nombre:</label>
            <div className="flex items-center px-4">
              <ChevronDoubleRightIcon className="h-5 w-5 mr-1"/>
              <p className="text-lg font-Roboto">{contador.username}</p>
            </div>
          </div>
          <div className="pt-6">
            <label className="text-lg font-bold font-Inter">Correo Electrónico:</label>
            <div className="flex items-center px-4">
              <ChevronDoubleRightIcon className="h-5 w-5 mr-1"/>
              <p className="text-lg font-Roboto">{contador.email}</p>
            </div>
          </div>
        </div>
        <div> {/*2da Columna*/}
          <div>
            <label className="text-lg font-bold font-Inter">Nro de Clientes Asignados:</label>
            <div className="flex items-center px-4">
              <ChevronDoubleRightIcon className="h-5 w-5 mr-1"/>
              <p className="text-lg font-Roboto">{cantidadClientes}</p>
            </div>
          </div>
          <div className="pt-6">
            <label className="text-lg font-bold font-Inter">Fecha de Registro: </label>
            <div className="flex items-center px-4">
              <ChevronDoubleRightIcon className="h-5 w-5 mr-1"/>
              <p className="text-lg font-Roboto">{new Date(contador.date).toLocaleDateString('es-ES')}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="py-8 pr-8">
        <h1 className="font-bold text-2xl">Agenda Mensual del Contador:</h1>
        <div className="flex justify-between items-center mb-4 py-6 pr-96">
          <button onClick={handlePrevMonth} className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700
            font-bold font-Roboto">
            &lt; Mes Anterior
          </button>
          <div className="relative">
            <button onClick={toggleMonthYearPicker} className="px-6 py-2 text-xl
              border-2 border-cyan-700 rounded-lg hover:bg-cyan-100 hover:border-cyan-900 font-bold transition-colors">
              {currentDate.toLocaleDateString('es-ES', {month: 'long', year: 'numeric'})}
            </button>
            {showMonthYearPicker && (
              <div className="absolute z-10 bottom-full w-96 mb-2 left-1/2 transform bg-white border
                border-gray-600 rounded-lg shadow-xl p-4 -translate-x-1/2">
                <div className="grid grid-cols-6 gap-2 mb-4 border rounded-lg border-gray-500">
                  { Array.from({ length: 12 }, (_,i) => (
                    <button key={i} onClick={() => handleMonthChange(i)} className={`p-2
                      text-sm rounded-md transition-colors ${i === currentDate.getMonth()
                        ? 'bg-cyan-600 text-white'
                        : 'hover:bg-cyan-100 text-gray-700'
                      }`}>
                      { new Date(2000, i, 1).toLocaleDateString('es-ES', { month: 'short' }) }
                    </button>
                  ))}
                </div>
                <div className="grid grid-cols-5 gap-2 border border-gray-500 rounded-lg">
                  { anios.map((anio) => (
                    <button key={anio} onClick={() => handleYearChange(anio)} className={`p-2
                      rounded-md transition-colors ${ anio === currentDate.getFullYear()
                        ? 'bg-cyan-600 text-white'
                        : 'hover:bg-cyan-100 text-gray-700'
                       }`}>
                        {anio}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <button onClick={handleNextMonth} className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700
            font-bold font-Roboto">
            Mes Siguiente &gt;
          </button>
        </div>
        {/*Calendario*/}
        <div className="w-full grid grid-cols-7 gap-1">
          {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((dia) => (
            <div key={dia} className="text-center font-bold py-2">
              {dia}
            </div>
          ))}
          {Array.from({ length: getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) })
            .map((_, index) => (
              <div key={ `empty-${index}` } className="h-12 border-2 py-8 bg-gray-200"></div>
            ))}
          {Array.from({ length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }, 
            (_, i) => i + 1).map((dia) => {
              const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dia);
              const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
              const isToday = date.toDateString() === new Date().toDateString();

              return (
                <div key={dia} onClick={() => handleDateClick(dia)} className={`h-12 border flex
                  items-center justify-center cursor-pointer py-8 font-medium
                  ${isSelected ? 'bg-cyan-200 text-lg font-bold font-Inter border-2 border-cyan-600' : '' }
                  ${isToday ? 'font-bold border-2 border-cyan-600' : '' } hover:bg-cyan-100` }>
                  {dia}
                </div>
              );
            })}
        </div>
      </div>
    </>
  )
}

export default ContadorPageName;