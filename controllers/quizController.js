import { buscarPerguntasPorDisciplina } from "../models/quizModel.js";

export async function getPerguntas(req, res) {
    try {
        const { disciplina } = req.params;
        
        const rows = await buscarPerguntasPorDisciplina(disciplina);

        if (!rows || rows.length === 0) {
            return res.status(404).json({ mensagem: `Nenhuma pergunta encontrada para: ${disciplina}` });
        }

        const perguntasMap = {};

        rows.forEach(row => {
            if (!perguntasMap[row.id]) {
                perguntasMap[row.id] = {
                    pergunta: row.pergunta,
                    alternativas: [],
                    resposta_correta: null,
                    nivel: row.nivel,
                    pontuacao: row.pontuacao
                };
            }

            // Adiciona o texto da alternativa no array
            perguntasMap[row.id].alternativas.push(row.alternativa);

           
            if (row.correta === 1 || row.correta === true) {
                perguntasMap[row.id].resposta_correta = row.alternativa;
            }
        });

        const listaPerguntas = Object.values(perguntasMap);

        // Embaralha e pega 5 perguntas
        const perguntasFinal = listaPerguntas
            .sort(() => 0.5 - Math.random())
            .slice(0, 5);

        // Retorna o JSON
        return res.status(200).json(perguntasFinal);

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            erro: "Erro ao buscar perguntas",
            detalhes: error.message
        });
    }
}