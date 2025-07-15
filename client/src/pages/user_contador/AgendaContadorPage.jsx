import { use, useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { useNotificaciones } from "../../context/NotificacionContext";
import { useClients } from "../../context/ClientsContext";
import { Link, useSearchParams } from "react-router-dom";
import { EyeIcon, PencilIcon, UserPlusIcon, MagnifyingGlassIcon, UserCircleIcon, PlusIcon,
  BellSlashIcon, BellAlertIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useConsultas } from "../../context/ConsultaContext";
import { ClockIcon } from "@heroicons/react/24/solid";

function AgendaContador() {

  const currentAnio = new Date().getFullYear();
  const [ currentDate, setCurrentDate ] = useState(new Date());
  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ showMonthYearPicker, setShowMonthYearPicker ] = useState(false);
  const [ anios ] = useState( Array.from({length: 5}, (_, i) => currentAnio - i ) );
  const [ consultas, setConsultas ] = useState([]);
  const [ consultasDiaSeleccionado, setConsultasDiaSeleccionado ] = useState([]);
  const [ modalAbierto, setModalAbierto ] = useState(false);
  const [ consultaSeleccionada, setConsultaSeleccionada ] = useState({});
  const [ clickedState, setClickedState ] = useState(false);

  const { user } = useAuth();
  const { getConsultas, getConsultasByContador } = useConsultas();

  const [ showNotificaciones, setShowNotificaciones ] = useState(false);
  const [ audio ] = useState(typeof Audio !== "undefined" ? new Audio("/notification_sound.mp3") : null);
  const { unreadCount, notificaciones, markAsRead, deleteNotificacion } = useNotificaciones();

  useEffect(() => {
    if(unreadCount > 0 && audio) {
      audio.play().catch(e => console.log("Error playing sound: ", e));
    }
  }, [unreadCount])

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
    setSelectedDate(clickedDia);
    
    const normalizeDate = (dateString) => {
      const d = new Date(dateString);
      return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toDateString();
    };

    const consultasDelDia = consultas.filter(consulta => {
      try {
        return normalizeDate(consulta.fecha) === clickedDia.toDateString();
      } catch {
        return false;
      }
    });

    setConsultasDiaSeleccionado(consultasDelDia);
    setClickedState(true);
  };
  const toggleMonthYearPicker = () => {
    setShowMonthYearPicker(!showMonthYearPicker);
  };
  const handleMonthChange = (mesIndex) => {
    setCurrentDate(new Date(currentDate.getFullYear(), mesIndex, 1));
    setShowMonthYearPicker(false);
  };
  const handleYearChange = (anio) => {
    setCurrentDate(new Date(anio, currentDate.getMonth(), 1));
    setShowMonthYearPicker(false);
  };
  const handleActualizarConsulta = async (consultaActualizada) => {
    setConsultas(prev => prev.map(c => c._id === consultaActualizada._id ? consultaActualizada : c));
    if (selectedDate) {
      const fecha = selectedDate.toISOString().split("T")[0];
      const actualizadas = consultasDiaSeleccionado
        .map(c => c._id === consultaActualizada._id ? consultaActualizada : c);
      setConsultasDiaSeleccionado(actualizadas);
    }
    
    const fetchConsultas = async () => {
      const res = await getConsultas();
      setConsultas(res);
    };
    
    fetchConsultas();
    setClickedState(false);
  };

  useEffect(() => {
    const fetchConsultas = async () => {
      try {
        const consultasData = await getConsultasByContador(user.username);
        setConsultas(consultasData);
      } catch (error) {
        console.error("Error buscando consultas:", error);
      }
    };
    fetchConsultas();
  }, []);

  return (
    <>
      <div className='py-4 flex items-center justify-between'>
        <h1 className='text-4xl font-bold font-Roboto'>Agenda Mensual</h1>
        <div className="flex items-center px-4 gap-16">
          <button
            onClick={() => setShowNotificaciones(!showNotificaciones)}
            className="p-2 rounded-full hover:bg-cyan-100 relative"
          >
            <BellAlertIcon className="h-7 w-7 mr-8 text-cyan-700"/>
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 bg-red-500 text-white text-xs
                rounded-full h-5 w-5 flex items-center justify-center">{unreadCount}</span>
            )}
          </button>
          {showNotificaciones && (
            <div className="absolute right-16 top-16 mt-2 w-72 bg-white rounded-md shadow-lg
              overflow-hidden z-50">
              <div className="py-1">
                {notificaciones.length === 0 ? (
                  <div className="px-4 py-2 text-gray-700 text-sm">No hay notificaciones</div>
                ) : (
                  <>
                    <div className="px-4 py-2 border-b font-semibold bg-gray-300">
                      Notificaciones
                    </div>
                    {notificaciones.map(notif => (
                      <div key={notif._id} className={`px-4 py-3 border-b hover:bg-gray-100
                        ${notif.leida ? 'bg-blue-50' : ''}`}>
                        <div className="flex justify-between items-start">
                          {notif.tipo === "Recordatorio" ?
                          <div className="flex justify-between items-start">
                            <p className="text-sm font-semibold">{notif.mensaje}</p>
                            <button onClick={() => deleteNotificacion(notif._id)} className="text-gray-500 hover:text-gray-700 ml-2">
                              <XMarkIcon className="h-4 w-4"/>
                            </button>
                          </div>
                          : 
                          <div>
                            <p className="text-sm font-semibold">{notif.mensaje}</p>
                            <div className="flex gap-4 justify-end">
                            <button className="text-green-500 font-medium">Sí</button>
                            <button className="text-red-500 font-medium">No</button>
                            </div>
                          </div>
                          }
                        </div>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-gray-500">
                            {new Date(notif.date).toLocaleTimeString('es-PE', {hour: '2-digit', minute: '2-digit'})}
                          </span>
                          {(!notif.leida && notif.tipo === "Recordatorio") && (
                            <button onClick={() => markAsRead(notif._id)} className="text-xs
                              text-blue-500 hover:text-blue-700 font-medium">
                              Marcar como leída
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                  </>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center">
          <p className="px-2 justify-end text-cyan-700 font-semibold">
            <Link to='/home'>R&N Estudio Contable</Link>
          </p>
          <img
            src="/../images/logo_empresa_192.png"
            alt="logo"
            className="w-10 h-10"
            draggable="false"
          />
          </div>
        </div>
      </div>
      <div className="flex justify-between pr-16 pt-2">
        <p className="py-2">Agenda mensual de la empresa. Se pueden visualizar las consultas de los clientes.</p>
      </div>
      <div className="pr-8">
        <div className="relative pt-4">
          <p>Consideraciones para la Agenda Mensual:</p>
          <div className="flex items-center pl-4 pt-2">
            <span className="absolute w-3 h-3 bg-orange-500 rounded-full"></span>
            <p className="ml-4">: Hay al menos una consulta <b><i>Pendiente</i></b>.</p>
          </div>
          <div className="flex items-center pl-4">
            <span className="absolute w-3 h-3 bg-green-500 rounded-full"></span>
            <p className="ml-4">: Hay al menos una consulta <b><i>Realizada</i></b>.</p>
          </div>
          <div className="flex items-center pl-4">
            <span className="absolute w-3 h-3 bg-red-500 rounded-full"></span>
            <p className="ml-4">: Hay al menos una consulta <b><i>No Realizada</i></b>.</p>
          </div>
        </div>
        <div className="flex items-center mb-4 py-8 pr-96 gap-8">
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

              const normalizeDate = (dateString) => {
                const d = new Date(dateString);
                return new Date(d.getFullYear(), d.getMonth(), d.getDate()).toDateString();
              };

              const consultasDelDia = consultas.filter(consulta => {
                try {
                  return normalizeDate(consulta.fecha) === date.toDateString();
                } catch {
                  return false;
                }
              });

              return (
                <div key={dia} onClick={() => handleDateClick(dia)} className={`h-12 border flex
                  items-center justify-center cursor-pointer py-8 font-medium relative
                  ${isSelected ? 'bg-cyan-200 text-lg font-bold font-Inter border-2 border-cyan-600' : '' }
                  ${isToday ? 'font-bold border-2 border-cyan-600' : '' } hover:bg-cyan-100` }>
                  {dia}
                  {consultasDelDia.length > 0 && (
                    <>
                      {consultasDelDia.some(c => c.state === "Pendiente") && (
                        <span className="absolute top-1 right-1 w-3 h-3 bg-orange-500 rounded-full"></span>
                      )}
                      {consultasDelDia.some(c => c.state === "Realizado") && (
                        <span className="absolute top-6 right-1 w-3 h-3 bg-green-500 rounded-full"></span>
                      )}
                      {consultasDelDia.some(c => c.state === "No Realizado") && (
                        <span className="absolute top-11 right-1 w-3 h-3 bg-red-500 rounded-full"></span>
                      )}
                    </>
                  )}
                </div>
              );
            })}
        </div>
      </div>
      <div>
        {selectedDate && (
          <>
            <div className="pt-4">
              <div className="text-2xl font-bold text-center">
                <u>Consultas del Día: {selectedDate.toLocaleDateString('es-PE', { day: 'numeric', month: 'numeric', year: 'numeric' })}</u>
              </div>
              {consultasDiaSeleccionado.length > 0 ? (
                consultasDiaSeleccionado
                  .sort((a, b) => {
                    const horaA = new Date(`1970-01-01T${a.hora}:00`);
                    const horaB = new Date(`1970-01-01T${b.hora}:00`);
                    return horaA - horaB;
                  })
                  .map((consulta, index) => (
                    <div key={index} className="">
                      <div className="flex items-center gap-6 justify-between pt-12">
                        <div className="flex items-center gap-6">
                          <h2 className="text-xl font-bold">Cliente:</h2>
                          <h2 className="text-lg py-1 border border-cyan-700 px-4 rounded-md bg-gray-50">
                            {consulta.cliente.name}
                          </h2>
                        </div>
                      </div>
                      <div className="flex items-center gap-6 justify-between pt-4">
                        <div className="flex items-center gap-6">
                          <h2 className="text-xl font-bold">Asunto:</h2>
                          <h2 className="text-lg py-1 border border-cyan-700 px-4 rounded-md bg-gray-50">
                            {consulta.asunto}
                          </h2>
                        </div>
                        <div className="pr-8">
                        {consulta.state !== "Realizado" && user.type_User !== "Gerente" ?
                          <Link className="inline-flex items-center text-lg py-2 px-4 rounded-lg bg-cyan-600 text-white font-bold hover:bg-cyan-700 shadow-lg transition-colors duration-300">
                            <ClockIcon className="h-5 w-5 mr-2"/>
                            Postergar Consulta
                          </Link>
                        : ""}
                      </div>
                      </div>
                      <div className="flex items-center gap-6 pt-4 pr-8">
                        <h2 className="text-xl font-bold">Descripción:</h2>
                        <h2 className="text-lg py-1 border border-cyan-700 px-4 rounded-md bg-gray-50">
                          {consulta.descripcion}
                        </h2>
                      </div>
                      <div className="flex items-center gap-6 pt-4">
                        <h2 className="text-xl font-bold">Hora:</h2>
                        <h2 className="text-lg py-1 border border-cyan-700 px-4 rounded-md bg-gray-50">
                          {consulta.hora}
                        </h2>
                      </div>
                      <div className="flex items-center gap-6 pt-4">
                        <h2 className="text-xl font-bold">Estado:</h2>
                        {consulta?.state === "Pendiente" ? 
                          <div className="flex items-center gap-12">
                            <h2 className="text-lg py-1 border border-cyan-700 px-4 rounded-md bg-gray-50 text-orange-600 font-semibold">{consulta.state}</h2>
                            {user?.type_User !== "Gerente" ?
                              <button onClick={() => {setModalAbierto(true); setConsultaSeleccionada(consulta)}} className="text-lg py-2 px-4 rounded-lg bg-cyan-600
                              text-white font-bold hover:bg-cyan-700 shadow-lg
                                transition-colors duration-300">
                                Cambiar Estado
                              </button>  
                            : ""}
                            {modalAbierto && (<ModalConsultaEstado
                                consulta={consultaSeleccionada}
                                isOpen={modalAbierto}
                                onActualizar={handleActualizarConsulta}
                                onClose={() => setModalAbierto(false)}
                              />)}
                          </div>
                        : ""}
                        {consulta?.state === "No Realizado" ? 
                        <h2 className="text-lg py-1 border border-cyan-700 px-4 rounded-md bg-gray-50 text-red-600 font-semibold">{consulta.state}</h2>
                        : ""}
                        {consulta?.state === "Realizado" ? 
                          <div>
                            <h2 className="text-lg py-1 border border-cyan-700 px-4 rounded-md bg-gray-50 text-green-500 font-semibold">{consulta.state}</h2>
                          </div>
                        : ""}
                      </div>
                      <div className="p-4 border-b-4 border-gray-500 "></div>
                    </div>
                  ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  No hay consultas programadas para este día.
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </>
  )
}

export default AgendaContador;