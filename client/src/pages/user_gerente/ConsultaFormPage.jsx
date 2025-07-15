import { useForm } from 'react-hook-form';
import { useClients } from '../../context/ClientsContext';
import { useEffect, useState, useRef } from 'react';
import { useAuth } from '../../context/AuthContext';
import { PlusIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useConsultas } from '../../context/ConsultaContext';

function ConsultaFormPage() {

  const { register, handleSubmit, reset } = useForm();
  const {name} = useParams();
  const [ error, setError ] = useState(null);
  const [ cliente, setCliente] = useState([]);
  const [ contador, setContador ] = useState([]);
  const { getClientName } = useClients();
  const formRef = useRef(null);
  const { createConsulta } = useConsultas();
  const navigate = useNavigate();

  const hoy = new Date();
  const currentMes = new Date().getMonth();
  const currentAnio = new Date().getFullYear();
  const [ currentDate, setCurrentDate ] = useState(new Date());
  const [ selectedDate, setSelectedDate ] = useState(null);
  const [ showMonthYearPicker, setShowMonthYearPicker ] = useState(false);
  //const [ anios ] = useState( Array.from({length: 5}, (_, i) => currentAnio - i ) );
  const  [ anios ] = useState([currentAnio]);

  const getDaysInMonth = (anio, mes) => {
    return new Date(anio, mes + 1, 0).getDate();
  };
  const getFirstDayOfMonth = (anio, mes) => {
    return new Date(anio, mes, 1).getDay();
  };
  const handlePrevMonth = () => {
    const prevMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1);
    if(prevMonth >= new Date(hoy.getFullYear(), hoy.getMonth(), 1))
      setCurrentDate(prevMonth)
    //setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };
  const handleNextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };
  const handleDateClick = (dia) => {
    const clickedDia = new Date(currentDate.getFullYear(), currentDate.getMonth(), dia);
    if (clickedDia < hoy.setHours(0, 0, 0, 0)) return;
    setSelectedDate(clickedDia)
    console.log("Fecha Seleccionada: ", clickedDia.toLocaleDateString());
    setTimeout(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, 500);
  };
  const toggleMonthYearPicker = () => {
    setShowMonthYearPicker(!showMonthYearPicker);
  };
  const handleMonthChange = (mesIndex) => {
    const newDia = new Date(currentDate.getFullYear(), mesIndex, 1);
    if(newDia >= new Date(currentAnio, currentMes, 1)){
      setCurrentDate(newDia)
      setShowMonthYearPicker(false);
    }
    // setCurrentDate(new Date(currentDate.getFullYear(), mesIndex, 1));
    // setShowMonthYearPicker(false);
  };
  const handleYearChange = (anio) => {
    if(anio >= currentAnio) {
      setCurrentDate( new Date(anio, currentDate.getMonth(), 1));
      setShowMonthYearPicker(false);  
    }
    // setCurrentDate( new Date(anio, currentDate.getMonth(), 1));
    // setShowMonthYearPicker(false);
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!selectedDate) return setError('Debe seleccionar una fecha para la consulta.');

    const [ hora, mins ] = data.hora.split(':');
    const fullDate = new Date(selectedDate);
    const fullDate_2 = new Date(selectedDate);
    const [ horas, minutos ] = data.hora.split(':').map(Number);
    console.log("horas: ", horas, "minutos:", minutos);
    //fullDate.setHours(parseInt(hora), parseInt(mins), 0, 0);
    fullDate_2.setHours(horas, minutos, 0, 0);
    console.log("fecha completa: ", fullDate_2);
    console.log("FECHA Y HORA: ", fullDate_2.toLocaleString())
    const consulta = {
      asunto: data.asunto,
      descripcion: data.descripcion,
      cliente: {
        id: cliente._id,
        name: cliente.name,
        email: cliente.email,
        ruc: cliente.ruc
      },
      contador: {
        id: contador.id,
        name: contador.name,
        email: contador.email
      },
      fecha: fullDate_2,
      hora: data.hora,
    };

    try {
      await createConsulta(consulta);
      reset();
      setSelectedDate(null);
      navigate(`/clients/name/${name}`);
    } catch (err) {
      console.error('Error al crear la consulta:', err);
      setError("No se pudo crear la consulta. Intente nuevamente.");
    }

  });

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
    if(name) fetchClient()
    console.log('Username:', name);
  }, [name])

  return(
    <>
      <div>
        <div className='py-4 flex items-center justify-between'>
          <h1 className='text-4xl font-bold font-Roboto'>Crear Consulta</h1> 
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
        <div className="flex justify-between pr-16 pt-2">
          <p className="py-2">Para crear la consulta, primero elija la <b><i>fecha</i></b> en que se programará la consulta.</p>
        </div>
        <div>
            <li className='pt-4'><i>Elija el día que se realizará la consulta:</i></li>
        </div>
        <div className="pr-8">
          <div className="flex items-center mb-4 py-6 pr-96 gap-8">
            {currentDate.getFullYear() > currentAnio || currentDate.getMonth() > currentMes ? 
              <button onClick={handlePrevMonth} className="px-4 py-2 bg-cyan-600 text-white rounded hover:bg-cyan-700
                font-bold font-Roboto text-md">
                &lt; Mes Anterior
              </button>
            : ""}
            <div className="relative">
              <button onClick={toggleMonthYearPicker} className="px-6 py-2 text-md
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
              font-bold font-Roboto text-md">
              Mes Siguiente &gt;
            </button>
          </div>
          {/*Calendario*/}
          <div className="w-full grid grid-cols-7 gap-1 text-md">
            {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((dia) => (
              <div key={dia} className="text-center font-bold py-1">{dia}</div>
            ))}
            {Array.from({ length: getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) })
              .map((_, index) => (
                <div key={ `empty-${index}` } className="h-12 border-2 py-4 bg-gray-200"></div>
              ))}
            {Array.from({ length: getDaysInMonth(currentDate.getFullYear(), currentDate.getMonth()) }, 
              (_, i) => i + 1).map((dia) => {
                const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), dia);
                const isSelected = selectedDate && date.toDateString() === selectedDate.toDateString();
                const isToday = date.toDateString() === new Date().toDateString();
                const isPast = date < new Date().setHours(0, 0, 0, 0);

                return (
                  <div key={dia} onClick={() => handleDateClick(dia)} className={`h-12 border flex
                    items-center justify-center cursor-pointer py-4 font-medium
                    ${isSelected ? 'bg-cyan-200 text-lg font-bold font-Inter border-2 border-cyan-600' : '' }
                    ${isToday ? 'font-bold border-2 border-cyan-600' : '' }
                    ${isPast ? 'bg-gray-100 text-gray-500 cursor-not-allowed' : "hover:bg-cyan-100"}`}>
                    {dia}
                  </div>
                );
            })}
          </div>
          {/* Formulario */}
          {selectedDate
          ?
            <form onSubmit={onSubmit} className='py-12' ref={formRef}>
              <h2 className='w-full text-center font-bold text-2xl'>Formulario de Creación de Consulta</h2>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-6 py-8'>
                <div> {/*1ra columna*/}
                  <div className='px-1'>
                    <label className='font-medium'>Asunto:</label>
                    <input type='text' placeholder='Asunto'
                    {...register('asunto', {required: true})} autoFocus
                    className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2 border border-cyan-700
                      focus:outline-none focus:ring-2 focus:ring-cyan-700 placeholder-zinc-500'/>
                  </div>
                  <div className='px-1'>
                    <label className='font-medium'>Descripción:</label>
                    <textarea type='text' placeholder='Ingrese la descripción de la consulta.'
                    {...register('descripcion', {required: true})} autoFocus
                    rows={3}
                    className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2 border border-cyan-700
                      focus:outline-none focus:ring-2 focus:ring-cyan-700 placeholder-zinc-500'/>
                  </div>
                  <div className='px-1'>
                    <label className='font-medium'>Cliente:</label>
                    <div className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2 border border-cyan-700
                        focus:outline-none focus:ring-2 focus:ring-cyan-700'>
                      {cliente.name}
                    </div>
                  </div>
                </div>
                <div> {/*2da columna*/}
                  <div className='px-1'>
                    <label className='font-medium'>Día seleccionado:</label>
                    <div className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2 border border-cyan-700
                        focus:outline-none focus:ring-2 focus:ring-cyan-700'>
                      {selectedDate.toLocaleDateString('es-PE', { day: 'numeric', month: 'numeric', year: 'numeric' })}
                    </div>
                  </div>
                  <div className='px-1 pb-1'>
                    <label className='font-medium'>Hora:</label>
                    <input type='time'
                    {...register('hora', {required: true})} autoFocus
                    className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2 border border-cyan-700
                      focus:outline-none focus:ring-2 focus:ring-cyan-700 placeholder-zinc-500'/>
                  </div>
                  <div className='px-1 pt-12'>
                    <label className='font-medium'>Contador:</label>
                    <div className='w-full bg-zinc-100 px-4 py-2 rounded-md my-2 border border-cyan-700
                        focus:outline-none focus:ring-2 focus:ring-cyan-700'>
                      {contador.name}
                    </div>
                  </div>
                </div>
              </div>
              <div className='w-full py-8'>
                <button type="submit" className='mx-auto block py-4 px-6 bg-cyan-600 hover:bg-cyan-700
                  transition-all duration-300 text-white font-bold text-xl rounded-lg shadow-md
                  '>
                      {/* <PlusIcon className='inline-flex h-6 w-6 mr-2 mb-1'/> */}
                      Crear Consulta
                </button>
              </div>
            </form>
            : ""
          }
        </div>
      </div>
    </>
  )
}

export default ConsultaFormPage;