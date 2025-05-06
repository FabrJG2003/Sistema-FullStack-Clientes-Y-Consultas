import bcrypt from 'bcrypt';
import { MongoClient } from 'mongodb';

async function main() {
    const uri = 'mongodb://localhost:27017'; // Cambia esto por tu URI de MongoDB
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log('Conectado a MongoDB');

        const db = client.db('estudio_contable'); // Cambia por el nombre de tu base de datos
        const usersCollection = db.collection('user');

        // Datos del usuario
        const id = 1;
        const nombre = "Admin Admin";
        const correo = "admin@example.com";
        const contraseñaPlana = "admin"; // Contraseña en texto plano
        const tipoUsuario = "Admin";

        // Generar el hash de la contraseña
        const saltRounds = 10;
        const contraseñaHash = await bcrypt.hash(contraseñaPlana, saltRounds);

        // Insertar el usuario en la colección
        const result = await usersCollection.insertOne({
            id: id,
            username: nombre,
            email: correo,
            password: contraseñaHash, // Almacenar el hash, no la contraseña en texto plano
            type_user: tipoUsuario
        });

        console.log('Usuario insertado con ID:', result.insertedId);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('Conexión cerrada');
    }
}

main();