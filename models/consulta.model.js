import mongoose from "mongoose";

const consultaSchema = new mongoose.Schema({
    asunto: {
        type: String,
        required: true,
        trim: true,
    },
    descripcion: {
        type: String,
        trim: true,
    },
    cliente: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
        ruc:  {type: String, required: true},
    },
    contador: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        name: {type: String, required: true},
        email: {type: String, required: true},
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
        enum: ['Realizado', 'Pendiente', 'No Realizado'],
        default: 'Pendiente',
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true
});

export default mongoose.model('Consulta', consultaSchema);