import mongoose from "mongoose";

const clientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    ruc: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    contador: {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
        name: {type: String, required: true},
        email: {type: String, required: true}
    },
    date: {
        type: Date,
        default: Date.now
    }
}, {
    timestamps: true,
    _id: true
});

export default mongoose.model('Client', clientSchema);