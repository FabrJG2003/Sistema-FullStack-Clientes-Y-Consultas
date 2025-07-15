import User from '../models/user.model.js';
import bcrypt from 'bcrypt'

export const getUsers = async (req, res) => {

    const userFound = await User.findById(req.user.id)

    if(!userFound) return res.status(400).json(["Usuario no encontrado."]);

    try {
        if(userFound.type_User == "Contador"){
            return res.status(403).json({ message: "No tienes permisos." })
        }
        const users = await User.find().select("-password -__v").lean()
        if(userFound.type_User == "Gerente" || userFound.type_User == "Administrador"){
            const contadores = users.filter(user => user.type_User == "Contador")
            return res.json(contadores)
        }
        res.json(users)
    } catch (error) {
        res.status(500).json({ message: "Error al obtener los usuarios." })
    }
}

export const getContador = async (req, res) => {
    const contador = await User.findById(req.params.id)
    if(!contador) return res.status(404).json({ message: "Contador no encontrado." })
    return res.json(contador)
}

export const getContadorByName = async (req, res) => {
    const {username} = req.params
    const contador = await User.findOne({username})
    return res.json(contador)
}

export const createContador = async (req, res) => {
    const { username, email, date } = req.body
    try {
        const existingUser = await User.findOne({ email });
        if(existingUser) return res.status(400).json({ message: "El correo ya está regsitrado." })
        const contraseña = '123456789'
        const salt = await bcrypt.genSalt(10);
        const contraseñahashed = await bcrypt.hash(contraseña, salt);
        const newContador = new User({
            username,
            email,
            password: contraseñahashed,
            type_User: 'Contador',
        })
        const savedContador = await newContador.save();
        res.json(savedContador);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error al agregar Contador.' })
    }
}

export const deleteContador = async (req, res) => {
    try {
        const contador = await User.findByIdAndDelete(req.params.id)
        if(!contador) return res.status(404).json({ message: "Contador no encontrado." })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: "Contador no encontrado." })
    }
}