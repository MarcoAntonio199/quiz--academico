async function carregarPerguntas() {

    const response = await fetch(
        "/perguntas/matematica"
    );

    const perguntas =
        await response.json();

    console.log(perguntas);
}

carregarPerguntas();