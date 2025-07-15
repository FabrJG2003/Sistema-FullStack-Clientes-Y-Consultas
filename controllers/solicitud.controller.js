import Solicitud from '../models/solicitud.model.js';

export const CreateSolicitud = async (req, res) => {
    const { name, ruc, email, if_client, fecha, hora } = req.body;
    try {
        const newSolicitud = new Solicitud({
            name,
            ruc,
            email,
            if_cliente: if_client,
            fecha,
            hora,
            state: 'No Aprobado',
        });
        const savedSolicitud = await newSolicitud.save();
        res.status(201).json(savedSolicitud);
    } catch (error) {
        console.error("Error creando solicitud: ", error);
        res.status(500).json({ message: "Error creando solicitud." });
    }
}