import mongoose from "mongoose";

const documentSchema = new mongoose.Schema({
    cliente: {
        type: mongoose.Schema.Types.ObjectId, ref: 'Client', required: true
    },
    fecha: {
        type: Date,
        required: true,
    },
    pdf: {
        type: Buffer,
        required: true,
    }
}, {
    timestamps: true
})

export default mongoose.model('Document', documentSchema);