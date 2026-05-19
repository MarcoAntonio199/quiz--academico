// =========================
// PEGAR TODAS AS OPÇÕES
// =========================

const options = document.querySelectorAll('.option');

// =========================
// MARCAR ALTERNATIVA
// =========================

options.forEach(option => {

    option.addEventListener('click', () => {

        // Remove seleção anterior
        options.forEach(op => {

            op.classList.remove('selected');

        });

        // Adiciona seleção atual
        option.classList.add('selected');

    });

});

// =========================
// INICIAR QUIZ
// =========================

function startQuiz(){

    // Esconde tela inicial
    document.getElementById('startScreen').style.display = 'none';

    // Mostra quiz
    document.getElementById('quizScreen').style.display = 'block';
}

// =========================
// MOSTRAR RESULTADO
// =========================

function showResult(){

    // Esconde quiz
    document.getElementById('quizScreen').style.display = 'none';

    // Mostra resultado
    document.getElementById('resultScreen').style.display = 'block';
}

// =========================
// MOSTRAR RANKING
// =========================

function showRanking(){

    // Esconde resultado
    document.getElementById('resultScreen').style.display = 'none';

    // Mostra ranking
    document.getElementById('rankingScreen').style.display = 'block';
}

// =========================
// REINICIAR QUIZ
// =========================

function restartQuiz(){

    // Esconde ranking
    document.getElementById('rankingScreen').style.display = 'none';

    // Esconde resultado
    document.getElementById('resultScreen').style.display = 'none';

    // Esconde quiz
    document.getElementById('quizScreen').style.display = 'none';

    // Mostra tela inicial
    document.getElementById('startScreen').style.display = 'block';
}
function verificarInsignia(pontos) {

    if (pontos >= 200) {
        return "Mestre";
    }

    if (pontos >= 150) {
        return "Ouro";
    }

    if (pontos >= 100) {
        return "Prata";
    }

    if (pontos >= 50) {
        return "Bronze";
    }

    return "Iniciante";
}