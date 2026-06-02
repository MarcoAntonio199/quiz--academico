import express from "express";
import {
    getTelaMudulo,
    getModuloById,
    getDisciplinasPorModulo,
    getInfoModulo,
    getTodosModulos
} from "../controllers/moduloController.js";

const router = express.Router();

// Servir a página tela_modulo.html
router.get("/", getTelaMudulo);

// Buscar todos os módulos disponíveis (deve vir antes de /:id para evitar conflito)
router.get("/api/todos", getTodosModulos);

// Buscar todas as disciplinas de um módulo específico
router.get("/:id/disciplinas", getDisciplinasPorModulo);

// Buscar informações de um módulo
router.get("/:id/info", getInfoModulo);

// Buscar módulo e suas disciplinas (deve vir por último)
router.get("/:id", getModuloById);

export default router;
