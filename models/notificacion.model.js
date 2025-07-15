import mongoose from "mongoose";

const NotificacionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true
    },
    tipo: {
        type: String, required: true, enum: ['Recordatorio', 'Estado_pendiente']
    },
    mensaje: {
        type:String, required: true
    },
    consultaId: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Consulta'
    },
    leida: {
        type: Boolean, default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Notificacion', NotificacionSchema);