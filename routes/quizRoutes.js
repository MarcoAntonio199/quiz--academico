import express from "express";
import { getPerguntas } from "../controllers/quizController.js";

const router = express.Router();

router.get(
    "/perguntas/:disciplina",
    getPerguntas
);

export default router;