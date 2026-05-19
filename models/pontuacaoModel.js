export function calcularPontuacao(respostas) {

    let acertos = 0;
    let pontuacao = 0;

    respostas.forEach((resposta) => {

        if (resposta.correta) {

            acertos++;

            if (resposta.nivel === "facil") {
                pontuacao += 1;
            }

            if (resposta.nivel === "medio") {
                pontuacao += 3;
            }

            if (resposta.nivel === "dificil") {
                pontuacao += 5;
            }
        }
    });

    return {
        acertos,
        pontuacao
    };
}