import { Router } from 'express';
import { login, logout, profile, verifyToken, updateUser } from '../controllers/auth.controller.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { loginSchema } from '../schemas/auth.schema.js';

const router = Router()

router.post("/login", validateSchema(loginSchema), login);

router.post("/logout", logout);

router.get("/verify", verifyToken);

router.get("/profile", authRequired, profile);

router.put("/update/:id", authRequired, updateUser);

export default router;