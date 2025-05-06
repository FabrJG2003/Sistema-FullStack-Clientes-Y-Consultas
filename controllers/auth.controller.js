import User from '../models/user.model.js';
import {createAccessToken} from '../libs/jwt.js';
import bcrypt from 'bcrypt';
import {TOKEN_SECRET} from '../config.js';
import e from 'express';
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
        res.cookie('token',token)
        res.json({
            message: "User Logged sucessful",
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
            type_User: userFound.type_User
        })
    })
};
