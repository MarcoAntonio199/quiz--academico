import { pool } from "../config/database.js";

export async function buscarRanking() {

    const [rows] = await pool.query(`
        SELECT
            nome,
            pontos
        FROM usuarios
        ORDER BY pontos DESC
        LIMIT 10
    `);

    return rows;
}

export async function salvarPontuacao(
    nome,
    pontos
) {

    await pool.query(`
        UPDATE usuarios
        SET pontos = pontos + ?
        WHERE nome = ?
    `, [pontos, nome]);
}