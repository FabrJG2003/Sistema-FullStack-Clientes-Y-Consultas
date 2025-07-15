import bcrypt from 'bcrypt';
import { connectDB } from '../schemas/db.js';
import User from '../schemas/userModel.js';

const createUser = async () => {
    try {
        // Conectar a la base de datos
        await connectDB();

        // Datos del usuario
        const userData = {
            username: "contador3",
            email: "contador3@example.com",
            password: "contador",
            type_User: "Contador"
        };

        // Verificar si el usuario ya existe
        const usuarioExistente = await User.findOne({ email: userData.email });
        if (usuarioExistente) {
            console.log('El usuario ya existe en la base de datos');
            process.exit(1);
        }

        // Generar el hash de la contraseña
        const saltRounds = 10;
        const contraseñaHash = await bcrypt.hash(userData.password, saltRounds);

        // Crear el usuario
        const nuevoUsuario = new User({
            username: userData.username,
            email: userData.email,
            password: contraseñaHash,
            type_User: userData.type_User
        });

        // Guardar en la base de datos
        await nuevoUsuario.save();

        console.log('Usuario creado exitosamente:', {
            username: nuevoUsuario.username,
            email: nuevoUsuario.email,
            type_User: nuevoUsuario.type_User
        });

    } catch (error) {
        console.error('Error al crear el usuario:', error);
    } finally {
        // Cerrar la conexión
        process.exit(0);
    }
};

// Ejecutar la función
createUser(); 