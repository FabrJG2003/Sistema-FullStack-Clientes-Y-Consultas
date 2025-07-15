import { Router } from "express";
import { getUsers, getContador, getContadorByName, createContador, deleteContador } from "../controllers/users.controller.js";
import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.get("/users", authRequired, getUsers);

// router.get("/contadores/name/:username", authRequired, getContador);

router.get("/contadores/name/:username", authRequired, getContadorByName);

router.post("/contadores", authRequired, createContador);

router.delete("/contadores/:id", authRequired, deleteContador);

export default router;