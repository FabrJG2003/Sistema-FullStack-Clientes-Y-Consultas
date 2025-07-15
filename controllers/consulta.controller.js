import Consulta from '../models/consulta.model.js';
import Client from '../models/client.model.js'; 

export const createConsulta = async (req, res) => {
    const { asunto, descripcion, fecha, date, cliente, contador, hora } = req.body
    if(!cliente) return res.status(404).json({error: "Cliente no encontrado."})
   
    const newConsulta = new Consulta({
        asunto,
        descripcion,
        fecha,
        date,
        hora,
        cliente: {
            id: cliente.id,
            name: cliente.name,
            email: cliente.email,
            ruc: cliente.ruc
        },
        state: 'Pendiente',
        contador: {
            id: contador.id,
            name: contador.name,
            email: contador.email
        }
    })
    const savedConsulta = await newConsulta.save()
    res.json(savedConsulta)
}

export const getConsultasByClientName = async (req, res) => {
    try {
        const { name } = req.params;
        const consultas = await Consulta.find({'cliente.name': name});
        if(consultas.length === 0) {
            console.log('No se encontraron consultas para:', name);
        }
        res.json(consultas);
    } catch (error) {
        console.error('Error en getConsultasByClientName:', error);
        res.status(500).json([]);
    }
}

export const getConsultasByContador = async (req, res) => {
    try {
        const { name } = req.params;
        const consultas = await Consulta.find({'contador.name': name});
        if(consultas.length === 0) {
            console.log('No se encontraron consultas para:', name);
        }
        res.json(consultas);
    } catch (error) {
        console.error('Error al obtener las consultas por contador:', error);
        res.status(500).json({ message: 'Error al obtener las consultas por contador.' });
    }
}

export const updateConsulta = async (req, res) => {
    try {
        const consulta = await Consulta.findByIdAndUpdate(req.params.id, req.body, {new: true})
        if(!consulta) return res.status(404).json({ message: 'Consulta no encontrada.' })
        res.json(consulta)
    } catch (error) {
        return res.status(404).json({message: "Cliente no encontrado."})
    }
}

export const getConsultas = async (req, res) => {
    try {
        const consultas = await Consulta.find();
        res.json(consultas);
    } catch (error) {
        console.error('Error al obtener las consultas:', error);
        res.status(500).json({ message: 'Error al obtener las consultas.' });
    }
}