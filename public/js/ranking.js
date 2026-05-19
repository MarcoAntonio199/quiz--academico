async function carregarRanking() {

    const response =
        await fetch("/ranking");

    const ranking =
        await response.json();

    const lista =
        document.getElementById("ranking");

    ranking.forEach((usuario) => {

        lista.innerHTML += `
            <li>
                ${usuario.posicao}°
                ${usuario.nome}
                - ${usuario.pontuacao}
            </li>
        `;
    });
}

carregarRanking();