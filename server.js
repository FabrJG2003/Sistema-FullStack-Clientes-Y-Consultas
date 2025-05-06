import express from 'express';
import cors from 'cors';
import {connectDB} from './schemas/db.js';
import authRoutes from './routes/auth.routes.js';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
//import tasksRoutes from './routes/tasks.routes.js';
import clientsRoutes from './routes/clients.routes.js';

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
//app.use("/api", tasksRoutes);
app.use("/api", clientsRoutes);

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Backend corriendo en http://localhost:${PORT}`);
});

export default app;