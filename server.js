import express from 'express';
import cors from 'cors';
import {connectDB} from './schemas/db.js';
import authRoutes from './routes/auth.routes.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import clientsRoutes from './routes/clients.routes.js';
import userRoutes from './routes/users.routes.js';
import consultaRoutes from './routes/consulta.routes.js';
import notificacionRoutes from './routes/notificacion.routes.js';
import documentRoutes from './routes/document.routes.js';
import SolicitudRoutes from './routes/solicitud.routes.js';
import { checkForNotifications } from './services/notificacion.service.js';

connectDB();

const app = express();
const PORT = 5001;

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use("/api", authRoutes);
app.use("/api", clientsRoutes);
app.use("/api", userRoutes);
app.use("/api", consultaRoutes);
app.use("/api", notificacionRoutes);
app.use("/api", documentRoutes);
app.use("/api", SolicitudRoutes)

setInterval(checkForNotifications, 60000);
checkForNotifications();

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});

export default app;