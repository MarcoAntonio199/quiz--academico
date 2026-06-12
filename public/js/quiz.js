let perguntas = [];

let perguntaAtual = 0;

let pontuacao = 0;


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

        const response = await fetch(
            `http://localhost:3000/api/quiz/perguntas/${disciplinaId}`
        );

        if (!response.ok) {

            throw new Error(
                "Erro ao buscar perguntas"
            );
        }

        const dados =
            await response.json();

        perguntas =
            organizarPerguntas(dados);

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
        `Pergunta ${perguntaAtual + 1}/ ${perguntas.length}`;

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

function responder() {

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

    const alternativas =
        document.querySelectorAll(
            '.option'
        );

    alternativas.forEach((label) => {

        const radio =
            label.querySelector(
                'input'
            );

        if (radio.value == "1") {

            label.style.backgroundColor =
                "#4CAF50";

            

        } else {

            label.style.backgroundColor =
                "#f44336";

            
        }

        radio.disabled = false;
    });

    const acertou =
        respostaSelecionada.value == "1";

    if (acertou) {

        pontuacao +=
            perguntas[perguntaAtual]
            .pontuacao;
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
// REINICIAR QUIZ
// ===============================

function restartQuiz() {

    perguntaAtual = 0;

    pontuacao = 0;

    window.location.href = "/modulo";
    
}


// ===============================
// INICIAR AUTOMATICAMENTE
// ===============================

carregarPerguntas();