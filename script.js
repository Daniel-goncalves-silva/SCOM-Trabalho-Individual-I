const botaoPeito = document.getElementById("botao-peito");
const statusPeito = document.getElementById("status-peito");
const dataPeito = document.getElementById("data-peito");

const tempoDescanso = 48 * 60 * 60 * 1000;

function atualizarPeito() {
    const treinoSalvo = localStorage.getItem("treinoPeito");

    if (treinoSalvo === null) {
        statusPeito.textContent = "Pode treinar";
        dataPeito.textContent = "";
        botaoPeito.textContent = "Marcar como treinado";
        return;
    }

    const dataTreino = new Date(treinoSalvo);
    const agora = new Date();

    const fimDescanso = new Date(
        dataTreino.getTime() + tempoDescanso
    );

    if (agora < fimDescanso) {
        statusPeito.textContent = "Em descanso";

        dataPeito.textContent =
            "Disponível novamente em: " +
            fimDescanso.toLocaleString("pt-BR");

        botaoPeito.textContent = "Desfazer marcação";
    } else {
        statusPeito.textContent = "Pode treinar novamente";

        dataPeito.textContent =
            "Último treino: " +
            dataTreino.toLocaleString("pt-BR");

        botaoPeito.textContent = "Marcar como treinado";
    }
}

botaoPeito.addEventListener("click", function () {
    const treinoSalvo = localStorage.getItem("treinoPeito");

    if (treinoSalvo !== null) {
        const dataTreino = new Date(treinoSalvo);
        const agora = new Date();

        if (agora - dataTreino < tempoDescanso) {
            localStorage.removeItem("treinoPeito");
            atualizarPeito();
            return;
        }
    }

    const agora = new Date();

    localStorage.setItem(
        "treinoPeito",
        agora.toISOString()
    );

    atualizarPeito();
});

atualizarPeito();
