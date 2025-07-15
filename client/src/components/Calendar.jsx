import { useState } from 'react';

function Calendar({ onDateSelected }) {
  
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
    
    if (onDateSelected) onDateSelected(clickedDia);

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

  return (
    <div className='px-8'>
      <div className="flex items-center mb-4 pt-8 pb-2 gap-12">
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
      <div className="w-full grid grid-cols-7 gap-1 border rounded-xl border-cyan-500">
        {['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'].map((dia) => (
          <div key={dia} className="text-center font-bold m-2 py-2 border rounded-lg border-cyan-400
            bg-gradient-to-br from-cyan-100 to-cyan-200">
            {dia}
          </div>
        ))}
        {Array.from({ length: getFirstDayOfMonth(currentDate.getFullYear(), currentDate.getMonth()) })
          .map((_, index) => (
          <div key={ `empty-${index}` } className="h-12 border-2 rounded-lg py-8 bg-gray-300 border-gray-300 mx-2"></div>
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
              <div key={dia} onClick={() => handleDateClick(dia)} className={`h-12 border-2 flex
                items-center justify-center cursor-pointer py-8 font-medium relative mx-2 rounded-lg 
                ${isSelected ? 'bg-cyan-200 text-lg font-bold font-Inter border-2 border-cyan-600' : '' }
                ${isToday ? 'font-bold border-2 border-cyan-600' : '' } hover:bg-cyan-100 ` }>
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
  )
}

export default Calendar;