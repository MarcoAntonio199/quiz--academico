
let perguntas = [];

let perguntaAtual = 0;

let pontuacao = 0;

let disciplinaAtualId = null;


// ===============================
// OBTER PARÂMETRO DA URL
// ===============================

function obterParametroURL(nome) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(nome);
}


// ===============================
// CARREGAR PERGUNTAS
// ===============================

async function carregarPerguntas() {

    try {

        // Obtém a disciplina da URL, ou usa 1 como padrão
        const disciplinaId = obterParametroURL('disciplina') || 1;
        disciplinaAtualId = disciplinaId;

        const response = await fetch(
            `http://localhost:3000/api/quiz/perguntas/${disciplinaId}`
        );

        if (!response.ok) {

            throw new Error(
                "Erro ao buscar perguntas"
            );
        }

        const dados = await response.json();

        const todas = organizarPerguntas(dados);

        // Seleciona 5 perguntas rotativas por disciplina usando localStorage
        perguntas = selecionarPerguntasRotativas(todas, disciplinaId, 5);

        // DEBUG: mostra no console as perguntas selecionadas (ids)
        console.log('Perguntas selecionadas (ids):', perguntas.map(p => p.id));

    } catch (error) {

        console.log(error);

        alert(
            "Não foi possível carregar o quiz."
        );
    }
}


// ===============================
// ORGANIZAR PERGUNTAS
// ===============================

function organizarPerguntas(dados) {

    const perguntasMap = {};

    dados.forEach((item) => {

        if (!perguntasMap[item.id]) {

            perguntasMap[item.id] = {

                id: item.id,

                pergunta: item.pergunta,

                pontuacao: item.pontuacao,

                alternativas: []
            };
        }

        perguntasMap[item.id]
            .alternativas
            .push({

                texto: item.alternativa,

                correta: item.correta
            });
    });

    return Object.values(perguntasMap);
}


// ===============================
// INICIAR QUIZ
// ===============================

function startQuiz() {

    document.getElementById(
        "startScreen"
    ).style.display = "none";

    document.getElementById(
        "quizScreen"
    ).style.display = "block";

    mostrarPergunta();
}


// ===============================
// MOSTRAR PERGUNTA
// ===============================

function mostrarPergunta() {

    const container =
        document.getElementById(
            "optionsContainer"
        );

    const tituloPergunta =
        document.getElementById(
            "questionText"
        );

    const numeroPergunta =
        document.getElementById(
            "questionNumber"
        );

    const pergunta =
        perguntas[perguntaAtual];

    numeroPergunta.innerText =
        `Pergunta ${perguntaAtual + 1}`;

    tituloPergunta.innerText =
        pergunta.pergunta;

    container.innerHTML = "";

    pergunta.alternativas.forEach(
        (alternativa) => {

            container.innerHTML += `

                <label class="option">

                    <input
                        type="radio"
                        name="answer"
                        value="${alternativa.correta}"
                    >

                    ${alternativa.texto}

                </label>
            `;
        }
    );
}


// ===============================
// PRÓXIMA PERGUNTA
// ===============================

function proximaPergunta() {

    const respostaSelecionada =
        document.querySelector(
            'input[name="answer"]:checked'
        );

    if (!respostaSelecionada) {

        alert(
            "Selecione uma alternativa"
        );

        return;
    }

    const acertou =
        respostaSelecionada.value == "1";

    if (acertou) {

        pontuacao +=
            perguntas[perguntaAtual]
            .pontuacao;
    }

    perguntaAtual++;

    if (
        perguntaAtual <
        perguntas.length
    ) {

        mostrarPergunta();

    } else {

        mostrarResultado();
    }
}


// ===============================
// RESULTADO
// ===============================

function mostrarResultado() {

    document.getElementById(
        "quizScreen"
    ).style.display = "none";

    document.getElementById(
        "resultScreen"
    ).style.display = "block";

    document.getElementById(
        "pontuacaoFinal"
    ).innerText =
        `${pontuacao} pontos`;

    // incrementa rotação para próxima vez que entrar nessa disciplina
    incrementarRotacao(disciplinaAtualId, perguntas.length);

    salvarPontuacao();
}


// ===============================
// SALVAR PONTUAÇÃO
// ===============================

async function salvarPontuacao() {

    const nome =
        prompt("Digite seu nome");

    try {

        await fetch(
            "http://localhost:3000/api/ranking/pontuacao",
            {

                method: "POST",

                headers: {
                    "Content-Type":
                        "application/json"
                },

                body: JSON.stringify({

                    nome,

                    pontos: pontuacao
                })
            }
        );

    } catch (error) {

        console.log(error);
    }
}


// ===============================
// ROTINA DE ROTAÇÃO DE PERGUNTAS
// ===============================

function selecionarPerguntasRotativas(todasPerguntas, disciplinaId, limite) {
    if (!Array.isArray(todasPerguntas) || todasPerguntas.length === 0) return [];

    // garante ordem estável: ordena por `id` caso exista
    const perguntasUnicas = todasPerguntas.slice().sort((a, b) => {
        if (a.id != null && b.id != null) return a.id - b.id;
        return 0;
    });

    const N = perguntasUnicas.length;

    if (N <= limite) {
        return perguntasUnicas.slice(0, limite);
    }

    const chave = `rotacao_disciplina_${disciplinaId}`;
    let indice = parseInt(localStorage.getItem(chave) || '0', 10);
    if (isNaN(indice) || indice < 0) indice = 0;

    const selecionadas = [];
    for (let i = 0; i < limite; i++) {
        const idx = (indice + i) % N;
        selecionadas.push(perguntasUnicas[idx]);
    }

    return selecionadas;
}

function incrementarRotacao(disciplinaId, usadasCount) {
    if (!disciplinaId) return;
    const chave = `rotacao_disciplina_${disciplinaId}`;
    let indice = parseInt(localStorage.getItem(chave) || '0', 10);
    if (isNaN(indice) || indice < 0) indice = 0;

    const incremento = usadasCount || 5;
    const novo = indice + incremento;
    localStorage.setItem(chave, String(novo));
}


// ===============================
// REINICIAR QUIZ
// ===============================

async function restartQuiz() {

    perguntaAtual = 0;

    pontuacao = 0;

    // Esconde a tela de resultado
    document.getElementById("resultScreen").style.display = "none";

    // Recarrega as próximas perguntas (a rotação já é incrementada em mostrarResultado)
    await carregarPerguntas();

    // Inicia o quiz imediatamente com o novo conjunto
    startQuiz();
}


// ===============================
// INICIAR AUTOMATICAMENTE
// ===============================

carregarPerguntas();