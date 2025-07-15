import User from '../models/user.model.js';
import {createAccessToken} from '../libs/jwt.js';
import bcrypt from 'bcrypt';
import {TOKEN_SECRET} from '../config.js';
import jwt from 'jsonwebtoken';

export const login = async(req, res) => {
    const {email, password} = req.body;
    
    try {
        const userFound = await User.findOne({email})

        if(!userFound) return res.status(400).json(
            ["Usuario no encontrado."]
        );

        const isMatch = await bcrypt.compare(password, userFound.password);

        if(!isMatch) return res.status(400).json(
            ["Contraseña Incorrecta."]
        );

        const token = await createAccessToken({ id: userFound._id });
        res.cookie('token',token, {})
        res.json({
            message: "User Logged sucessful",
            username: userFound.username,
            id: userFound._id,
            email: userFound.email,
            password: userFound.password,
            type_User: userFound.type_User,
            createdAt: userFound.createdAt,
            updatedAt: userFound.updatedAt
        });
    } catch(error) {
        res.status(500).json({
            message: error.message
        });
    }
};

export const logout = (req, res) => {
    res.cookie('token', "", {expires: new Date(0)})
    return res.sendStatus(200)
};

export const profile = async (req, res) => {
    const userFound = await User.findById(req.user.id)
    
    if(!userFound) return res.status(400).json(["Usuario no encontrado."]);

    return res.json({
        id: userFound._id,
        username: userFound.username,
        email: userFound.email,
        type_User: userFound.type_User,
        createdAt: userFound.createdAt,
        updatedAt: userFound.updatedAt
    })
};

export const verifyToken = async (req, res) => {
    const {token} = req.cookies

    if(!token) return res.status(401).json({message: "Usuario no autorizado."});

    jwt.verify(token, TOKEN_SECRET, async (err, user) => {
        if(err) return res.status(401).json({message: "Usuario no autorizado."});

        const userFound = await User.findById(user.id)
        if (!userFound) return res.status(401).json({message: "Usuario no encontrado."});
        return res.json({
            id: userFound._id,
            username: userFound.username,
            email: userFound.email,
            type_User: userFound.type_User,
            password: userFound.password,
            date: userFound.date,
        })
    })
};

export const updateUser = async (req, res) => {
    try {
        console.log("Hola4")
        console.log("ID recibido:", req.params.id);
        console.log("Datos recibidos:", req.body);
        const { username, password } = req.body;

        const updateData = {};

        if (username) updateData.username = username;
        if (password) {
            const salt = await bcrypt.genSalt(10);
            const passwordHashed = await bcrypt.hash(password, salt);
            updateData.password = passwordHashed; 
        }

        const updateUser = await User.findByIdAndUpdate(
            req.params.id,
            { $set: updateData },
            { new: true }
        ).select('-password');
        if (!updateUser) return res.status(404).json({ message: "Usuario no encontrado." });
        res.status(200).json(updateUser);
    } catch (error) {
        console.error("Error al actualizar usuario: ", error);
        res.status(500).json({ message: "Error en el servidor." });
    }
}
