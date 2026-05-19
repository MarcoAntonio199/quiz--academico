import express from "express";

import {
    getRanking,
    postPontuacao
}
from "../controllers/rankingController.js";

const router = express.Router();

router.get(
    "/ranking",
    getRanking
);

router.post(
    "/pontuacao",
    postPontuacao
);

export default router;