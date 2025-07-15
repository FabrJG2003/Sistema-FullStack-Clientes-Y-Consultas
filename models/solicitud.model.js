import mongoose from "mongoose";
import { date } from "zod";

const SolicitudSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ruc: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    if_cliente: {
        type: Boolean,
        default: false
    },
    fecha: {
        type: Date,
        required: true,
    },
    hora: {
        type: String,
        required: true,
    },
    state: {
        type: String,
        enum: ['No Aprobado', 'Aproado'],
        default: 'No Aprobado',
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Solicitud', SolicitudSchema);