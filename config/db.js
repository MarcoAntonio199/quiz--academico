
const mysql = require("mysql2");

const conexao = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'aluno',
    database: 'quiz',
    port: 3302
});

// Conectar ao banco de dados
connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados.');
});

// Conexão com servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

