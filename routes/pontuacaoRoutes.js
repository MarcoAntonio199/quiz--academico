import express from "express";

import {
    responderQuiz
} from "../controllers/pontuacaoController.js";

const router = express.Router();

router.post(
    "/quiz/responder",
    responderQuiz
);

export default router;