import Consulta from '../models/consulta.model.js';
import Notificacion from '../models/notificacion.model.js';
import { enviarEmail } from './mailer.service.js';

async function createNotificationIfNotExists(userId, tipo, mensaje, consultaId, consulta) {
  const existeNotif = await Notificacion.findOne({
    userId,
    tipo,
    consultaId,
    createdAt: { $gte: new Date(new Date().setHours(0, 0, 0, 0)) }
  });
  
  if (!existeNotif) {
    await Notificacion.create({
      userId,
      tipo,
      mensaje,
      consultaId
    });
    await enviarEmail(
      consulta.contador.email,
      `Notificacion: ${tipo}`,
      `Hola ${consulta.contador.name},\n\n${mensaje}`
    );
  }
}

export async function checkForNotifications() {
  try{
    const ahora = new Date();
    console.log("Verificando notificaciones a las:", ahora);
    
    // Obtener consultas para hoy
    const startOfDay = new Date(ahora);
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date(ahora);
    endOfDay.setHours(23, 59, 59, 999);

    const consultas = await Consulta.find({
      fecha: { 
        $gte: startOfDay,
        $lt: endOfDay
      }
    }).populate('cliente contador');
    console.log(`Consultas encontradas para hoy: ${consultas.length}`); // Para depuración

    for (const consulta of consultas) {
      try {
        console.log('Procesando consulta:', consulta._id); // Para depuración
        const fechaConsulta = new Date(consulta.fecha);
        const [horas, minutos] = consulta.hora.split(':').map(Number);
        
        fechaConsulta.setHours(horas, minutos, 0, 0);
        console.log('Fecha y hora de consulta:', fechaConsulta); // Para depuración
        // Notificación 1 hora antes
        const unaHoraAntes = new Date(fechaConsulta);
        unaHoraAntes.setHours(unaHoraAntes.getHours() - 1);
        console.log('Una hora antes:', unaHoraAntes); // Para depuración

        // Notificación 1 hora después (si sigue pendiente)
        const unaHoraDespues = new Date(fechaConsulta);
        unaHoraDespues.setHours(unaHoraDespues.getHours() + 1);
        console.log('Una hora después:', unaHoraDespues); // Para depuración

        // Verificar recordatorio
        if (ahora >= unaHoraAntes && ahora < fechaConsulta) {
          console.log('Creando notificación de recordatorio'); // Para depuración
          await createNotificationIfNotExists(
            consulta.contador.id,
            'Recordatorio',
            `Recordatorio: Tienes una consulta con ${consulta.cliente.name} a las ${consulta.hora}`,
            consulta._id,
            consulta
          );
        }

        // Verificar estado pendiente
        if (ahora >= unaHoraDespues && consulta.state === "Pendiente") {
          console.log('Creando notificación de estado pendiente'); // Para depuración
          await createNotificationIfNotExists(
            consulta.contador.id,
            'Estado_pendiente', // Asegúrate que coincida con el enum del modelo
            `Estado de consulta: ¿Se ha realizado la consulta con ${consulta.cliente.name} a las ${consulta.hora}?`,
            consulta._id,
            consulta
          );
        }
      } catch (error) {
        console.error("Error procesando consulta:", consulta._id, error);
      }
    }
  }catch(error){
    console.error('Error checking for notifications:', error);
  }
}