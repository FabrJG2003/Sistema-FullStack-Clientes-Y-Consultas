import { createContext, useState, useEffect, useContext } from 'react';
import { useAuth } from './AuthContext';
import { getNotificacionesRequest, markAsReadRequest, getUnreadCountRequest, deleteNotificacionRequest } from '../api/notificacion';
import { get, set } from 'mongoose';

const NotificacionContext = createContext();

export const useNotificaciones = () => {
  const context = useContext(NotificacionContext);
  if(!context){
    throw new Error("useNotificaciones must be used within a NotificacionProvider");
  }
  return context;
};

export function NotificacionesProvider({ children }) {
  const [ notificaciones, setNotificaciones ] = useState([]);
  const [ unreadCount, setUnreadCount ] = useState(0);
  const { user } = useAuth();

  const fetchNotificaciones = async () => {
    if(user) {
      try {
        const res = await getNotificacionesRequest();
        setNotificaciones(res.data);
      } catch (error) {
        console.error('Error al buscar las notificaciones: ', error);
      }
    }
  }

  const markAsRead = async (id) => {
    try {
      await markAsReadRequest(id);
      setNotificaciones(prev => prev.map(n => n._id === id ? { ...n, leida: true } : n));
      setUnreadCount(prev => prev - 1);
    } catch (error) {
      console.error('Error al marcar la notificación como leída: ', error);
    }
  }

  const deleteNotificacion = async (id) => {
    try {
      await deleteNotificacionRequest(id);
      setNotificaciones(prev => prev.filter(n => n._id !== id));
      setUnreadCount(prev => prev - (notificaciones.find(n => n._id === id)?.leida ? 0 : 1));
    } catch (error) {
      console.error("Error deleting notification:", error);
    }
  };

  useEffect(() => {
    fetchNotificaciones();
    const interval = setInterval(fetchNotificaciones, 60000);
    return () => clearInterval(interval);
  }, [user]);

  return (
    <NotificacionContext.Provider value={{ 
      notificaciones, unreadCount, markAsRead, deleteNotificacion }}>
      {children}
    </NotificacionContext.Provider>
  );
}