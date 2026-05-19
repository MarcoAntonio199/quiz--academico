import { calcularPontuacao }
from "../models/pontuacaoModel.js";

export async function responderQuiz(req, res) {

    try {

        const respostas = req.body;

        const resultado =
            calcularPontuacao(respostas);

        res.status(200).json(resultado);

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro ao calcular pontuação"
        });
    }
}