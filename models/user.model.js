import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    type_User: {
        type: String,
        enum: ['Gerente', 'Contador', 'Administrador'],
        required: true
    },
    date: {
        type: Date,
        default: Date.now,
    }
},{
    timestamps: true
})

export default mongoose.model('User', userSchema, 'users')