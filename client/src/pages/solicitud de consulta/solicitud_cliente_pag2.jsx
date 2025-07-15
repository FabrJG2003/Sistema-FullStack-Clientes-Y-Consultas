import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Calendar from '../../components/Calendar';
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";

function Solicitud_Cliente_Page2(){
  
  const { state } = useLocation();
  const cliente = state?.cliente;

  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState('');

  const navigate = useNavigate();

  const availableTimes = [
    '08:00', '09:00', '10:00', '11:00', 
    '14:00', '15:00', '16:00', '17:00',
    '18:00', '19:00'
  ];

  const handleDateSelected = (date) => {
    setSelectedDate(date);
    setSelectedTime('');
  }

  if (!cliente) {
    return (
      <div className='p-4 text-red-500'>
        No se encontraron datos del cliente.    
      </div>
    );
  }

  return (
    <div className='mx-auto'>
      <h1 className='text-4xl font-bold font-Inter pt-12 pb-12 text-center bg-gradient-to-br from-cyan-500
      to-cyan-600 text-white'>Solicitud de Consulta</h1>
      <div className='pl-8'>
        <div className='pt-8'>
          <h2 className="text-2xl font-semibold mb-2">Bienvenido cliente '{cliente.name}'</h2>
          <p><span className="font-medium">RUC:</span> {cliente.ruc}</p>
          <h2 className="text-xl font-bold font-Inter pt-8">2. Elija el día que solicita la consulta</h2>
        </div>
      </div>
      <div className='px-8 pb-8'>
        <Calendar onDateSelected={handleDateSelected}/>
      </div>
      {selectedDate && (
        <div className='px-16'>
          <h3 className="text-xl font-bold font-Inter mb-4">
            Fecha seleccionada: {selectedDate.toLocaleDateString('es-ES', { 
              weekday: 'long', 
              day: 'numeric', 
              month: 'long', 
              year: 'numeric' 
            })}
          </h3>
          <h4 className="text-lg font-semibold mb-4">* Seleccione la hora:</h4>
          <div className={`grid grid-cols-3 md:grid-cols-5 gap-4 ${selectedTime ? '' : 'mb-12'}`}>
            {availableTimes.map((time) => (
              <button
                key={time}
                onClick={() => setSelectedTime(time)}
                className={`py-2 px-4 rounded-lg border-2 ${
                  selectedTime === time 
                    ? 'bg-cyan-600 text-white border-cyan-700' 
                    : 'bg-white border-cyan-600 hover:bg-cyan-100'
                }`}
              >
                {time}
              </button>
            ))}
          </div>
        </div>
      )}
      {selectedDate && selectedTime && (
        <div className="p-8 text-center">
          <div className='px-8 flex items-center justify-between'>
          <p className='text-xl'><span className='font-medium'>Consulta solicitada: </span>{selectedDate.toLocaleDateString()}, a las {selectedTime}</p>
          <button 
            className="py-2 px-8 border-2 border-cyan-600 bg-cyan-600 rounded-lg
                text-white font-bold font-Inter hover:bg-cyan-700 transition-colors duration-300
                hover:border-cyan-700 text-lg"
            onClick={() => {
              const finalDateTime = new Date(selectedDate);
              const [hours, minutes] = selectedTime.split(':');
              finalDateTime.setHours(parseInt(hours, 10));
              finalDateTime.setMinutes(parseInt(minutes, 10));

              navigate('/solicitar-consulta/finalizar')
              
              // Aquí puedes enviar la fecha y hora seleccionadas al servidor
              console.log("Fecha y hora seleccionadas:", finalDateTime);
            }}
          >
            Siguiente
            <ArrowLongRightIcon className="inline-block h-6 w-6 ml-2" />
          </button>
          </div>
        </div>
      )}
    </div>
  )

}

export default Solicitud_Cliente_Page2;