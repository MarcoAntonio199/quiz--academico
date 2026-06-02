import express from "express";
import {
    getTelaMudulo,
    getDisciplinasPorModulo,
    getInfoModulo,
    getTodosModulos
} from "../controllers/moduloController.js";

const router = express.Router();

// Servir a página tela_modulo.html
router.get("/", getTelaMudulo);

// Buscar todas as disciplinas de um módulo específico
router.get("/:id/disciplinas", getDisciplinasPorModulo);

// Buscar informações de um módulo
router.get("/:id/info", getInfoModulo);

// Buscar todos os módulos disponíveis
router.get("/api/todos", getTodosModulos);

export default router;
