import express from "express";
import produtoRoutes from "./routes/produtoRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { pool } from "./config/database.js";
import path from "path";
import quizRoutes from "./routes/quizRoutes.js";
import pontuacaoRoutes from "./routes/pontuacaoRoutes.js";
import rankingRoutes from "./routes/rankingRoutes.js";

const app = express();

// const conexao = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     password: 'aluno',
//     database: 'quiz',
//     port: 3302
// });

// // Conectar ao banco de dados
// connection.connect(err => {
//     if (err) {
//         console.error('Erro ao conectar ao banco de dados:', err);
//         return;
//     }
//     console.log('Conectado ao banco de dados.');
// });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Arquivos estáticos
app.use(express.static(path.join(process.cwd(), "views")));
app.use("/css", express.static(path.join(process.cwd(), "css")));
app.use("/imgs", express.static(path.join(process.cwd(), "imgs")));

// ROTAS DAS PÁGINAS
app.get("/", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/login.html"));
});

app.get("/login", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/login.html"));
});

app.get("/cadastro", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/cadastro.html"));
});

app.get("/redefinir", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/redefinir.html"));
});

app.get("/trocarSenha", (req, res) => {
  res.sendFile(path.join(process.cwd(), "views/trocarSenha.html"));
});

// ROTAS
app.use("/api", produtoRoutes);
app.use("/", userRoutes);
app.use("/", quizRoutes);
app.use("/", pontuacaoRoutes);
app.use("/", rankingRoutes);

const PORT = process.env.PORT || 3000;
