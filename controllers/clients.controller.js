import Client from '../models/client.model.js';

export const getClients = async (req, res) => {
    const clients = await Client.find()
    res.json(clients)
};

export const createClient = async (req, res) => {
    const { name, ruc, email, date } = req.body
    const newClient = new Client({
        name,
        ruc,
        email,
        date
    })
    const savedClient = await newClient.save()
    res.json(savedClient)
};

export const getClient = async (req, res) => {
    const client = await Client.findById(req.params.id)
    if(!client) return res.status(404).json({ message: "Cliente no encontrado" })
    res.json(client)
};

export const updateClient = async (req, res) => {
    const client = await Client.findByIdAndDelete(req.params.id)
    if(!client) return res.status(404).json({ message: "Cliente no encontrado" })
    
};

export const deleteClient = async (req, res) => {
    const client = await Client.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if(!client) return res.status(404).json({ message: "Cliento no encontrado" })
};