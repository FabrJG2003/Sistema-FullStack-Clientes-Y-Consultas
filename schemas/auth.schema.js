import { z } from 'zod';

export const loginSchema = z.object({
    email: z
        .string({
            required_error: "Correo Electrónico requerido",
        })
        .email({
            message: "El Correo Electrónico es incorrecto",
        }),
    password: z
        .string({
            required_error: "Contraseña Requerida",
        }).min(4, {
            message: "La Contraseña debe tener mínimo 4 caracteres",
        }),
});