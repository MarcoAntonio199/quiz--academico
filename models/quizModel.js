import { pool } from "../config/database.js";

export async function buscarPerguntasPorDisciplina(disciplina) {

    const [rows] = await pool.query(`
        SELECT 
            p.id,
            p.pergunta,
            p.nivel,
            p.pontuacao,
            a.id AS alternativa_id,
            a.texto AS alternativa,
            a.correta
        FROM perguntas p
        JOIN alternativas a
            ON p.id = a.pergunta_id
        WHERE p.disciplina = ?
        ORDER BY RAND()
        LIMIT 20
    `, [disciplina]);

    return rows;
}