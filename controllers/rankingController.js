import {
    buscarRanking,
    salvarPontuacao
}
from "../models/rankingModel.js";

export async function getRanking(req, res) {

    try {

        const ranking =
            await buscarRanking();

        const rankingComPosicao =
            ranking.map((usuario, index) => {

                return {
                    posicao: index + 1,
                    nome: usuario.nome,
                    pontuacao: usuario.pontos
                };
            });

        res.status(200).json(
            rankingComPosicao
        );

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro ao buscar ranking"
        });
    }
}

export async function postPontuacao(req, res) {

    try {

        const {
            nome,
            pontos
        } = req.body;

        await salvarPontuacao(
            nome,
            pontos
        );

        res.status(200).json({
            mensagem: "Pontuação salva"
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            erro: "Erro ao salvar pontuação"
        });
    }
}