import Notificacion from '../models/notificacion.model.js';

export const getNotificaciones = async (req, res) => {
  try {
    const notificaciones = await Notificacion.find({ 
      userId: req.user.id
    }).sort({ createdAt: -1 });
    res.json(notificaciones);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const markAsRead = async (req, res) => {
  try {
    const notificacion = await Notificacion.findByIdAndUpdate(
      req.params.id,
      { leida: true },
      { new: true }
    );
    res.json(notificacion);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUnreadCount = async (req, res) => {
  try {
    const count = await Notificacion.countDocuments({ 
      userId: req.user.id,
      leida: false 
    });
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteNotificacion = async (req, res) => {
  try {
    await Notificacion.findByIdAndDelete(req.params.id);
    res.json({ message: 'Notificación eliminada' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};