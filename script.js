const html = document.querySelector("html");
const focoBt = document.querySelector(".app__card-button--foco");
const curtoBt = document.querySelector(".app__card-button--curto");
const longoBt = document.querySelector(".app__card-button--longo");
const banner = document.querySelector(".app__image");
const titulo = document.querySelector(".app__title");
const botoes = document.querySelectorAll(".app__card-button");
const musicaFocoInput = document.querySelector("#alternar-musica");
const startPauseBt = document.querySelector('#start-pause');
const musica = new Audio("./sons/luna-rise-part-one.mp3");
let tempoDecorridoEmSegundos = 5;
let intervaloId = null
const contagemRegressiva = () => {
    if (tempoDecorridoEmSegundos <= 0) {
        zerar();
        return;
    }
    tempoDecorridoEmSegundos -= 1;
    console.log(
        'Temporizador: ' + tempoDecorridoEmSegundos
    );
    if (tempoDecorridoEmSegundos === 0) {
        zerar();
        alert('Tempo finalizado!');
    }
}

musica.loop = true;

musicaFocoInput.addEventListener("change", () => {
    if (musicaFocoInput.checked) {
        musica.play();
    }
    else {
        musica.pause();
    }
});

startPauseBt.addEventListener('click', iniciarOuPausar);

focoBt.addEventListener("click", () => {
    alterarContexto("foco");
    focoBt.classList.add("active");
});

curtoBt.addEventListener("click", () => {
    alterarContexto("descanso-curto");
    curtoBt.classList.add("active");
});

longoBt.addEventListener("click", () => {
    alterarContexto("descanso-longo");
    longoBt.classList.add("active");
});

function alterarContexto(contexto) {
    //remover o destaque de todos os botões
    botoes.forEach((botao) => {
        botao.classList.remove("active");
    });

    html.setAttribute("data-contexto", contexto);
    banner.setAttribute("src", `./imagens/${contexto}.png`);

    switch (contexto) {
        case "foco":
            titulo.innerHTML = `Otimize sua produtividade,<br>
                <strong class="app__title-strong">mergulhe no que importa.</strong>`
            //titulo.textContent =
            break;
        case "descanso-curto":
            titulo.innerHTML = `Que tal dar uma respirada,<br>
                <strong class="app__title-strong">faça uma pausa curta.</strong>`
            break;
        case "descanso-longo":
            titulo.innerHTML = `Hora de voltar a superficie,<br>
                <strong class="app__title-strong">faça uma pausa longa.</strong>`
            break;
        default:
            return;
    }
}
function iniciarOuPausar() {
    if (intervaloId !== null) {
        zerar();
        return;
    }
    if (tempoDecorridoEmSegundos <= 0) {
        return;
    }

    intervaloId = setInterval(contagemRegressiva, 1000);
}
function zerar() {
    clearInterval(intervaloId);
    intervaloId = null;
}
