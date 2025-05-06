import mongoose from 'mongoose';

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
        required: true,
        enum: ['Administrador', 'Gerente', 'Contador']
    }
}, {
    timestamps: true
});

const User = mongoose.model('User', userSchema);

export default User; 