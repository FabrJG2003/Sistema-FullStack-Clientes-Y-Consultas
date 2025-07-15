import clientModel from '../models/client.model.js';
import Client from '../models/client.model.js';
import User from '../models/user.model.js';

export const getClients = async (req, res) => {
    const clients = await Client.find();
    res.json(clients)
};

export const createClient = async (req, res) => {
    const { name, ruc, email, date, contadorNombre } = req.body
    const contador = await User.findOne({
        username: contadorNombre,
        type_User: 'Contador'
    })
    if(!contador) return res.status(404).json({error: "Contador no encontrado"})
    const newClient = new Client({
        name,
        ruc,
        email,
        date,
        contador: {
            id: contador._id,
            name: contador.username,
            email: contador.email
        }
    })
    const savedClient = await newClient.save()
    res.json(savedClient)
};

export const getClient = async (req, res) => {
    const client = await Client.findById(req.params.id)
    if(!client) return res.status(404).json({ message: "Cliente no encontrado" })
    return res.json(client)
};

export const getClientByName = async(req, res) => {
    const {name} = req.params
    const client = await Client.findOne({name})
    return res.json(client)
}

export const updateClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if (!client) return res.status(404).json({message: "Cliente no encontrado."})
        res.json(client)
    } catch (error) {
        return res.status(404).json({message: "Cliente no encontrado."})
    }    
};

export const deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id)
        if(!client) return res.status(404).json({ message: "Cliente no encontrado." })
        return res.sendStatus(204)
    } catch (error) {
        return res.status(404).json({ message: "Cliente no encontrado." })
    }
};

export const getClientsByContador = async (req, res) => {
    const {contadorNombre} = req.params;
    const clients = await Client.find({'contador.name': {$regex: new RegExp(contadorNombre, 'i')}}).sort({ CreatedAt: -1 });
    res.json(clients);
};

export const getClientByData = async (req, res) => {
    try {
        console.log("Hola5")
        const { ruc, email } = req.query;

        console.log("Parámetros recibidos:", { ruc, email }); // Para debug
        console.log("Tipo de petición:", req.method);
        console.log("Query params recibidos:", req.query);
        console.log("Consulta a ejecutar:", { ruc, email });

        if(!ruc && !email) {
            return res.status(400).json({message: "RUC o email es requerido."});
        }

        const query = {};
        if(ruc) query.ruc = ruc;
        if(email) query.email = email;
        
        console.log("Consulta a ejecutar:", query);

        const client = await Client.findOne(query).exec();
        if(!client) return res.status(404).json({message: "Cliente no encontrado."});
        res.json(client);
    } catch (error) {
        console.error(error);
        res.status(500).json({mesage: "Error en el servidor."});
    }
}