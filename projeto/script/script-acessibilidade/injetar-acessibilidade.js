window.addEventListener("load", () => {

const html = `
<div class="acess-btn" id="abrirAcess">
<i class="fa-solid fa-universal-access"></i>
</div>

<div class="sidebar-acess" id="sidebarAcess">

<div class="acess-header">
<h3><i class="fa-solid fa-universal-access"></i> Acessibilidade</h3>
<button id="fecharAcess" class="button"><i class="fa-solid fa-xmark"></i></button>
</div>

<hr>

<h6>Tamanho do texto</h6>

<button id="aumentarFonte">A+</button>
<button id="diminuirFonte">A-</button>

<hr>

<h6>Modo daltônico</h6>

<button id="modoDaltonico">Ativar</button>

<hr>

<h6>Leitura em voz</h6>

<button id="leitura">Ativar leitura</button>

</div>
`;

document.body.insertAdjacentHTML("beforeend", html);


/* =========================
   ELEMENTOS
========================= */

const abrir = document.getElementById("abrirAcess");
const fechar = document.getElementById("fecharAcess");
const sidebar = document.getElementById("sidebarAcess");

const btnAumentar = document.getElementById("aumentarFonte");
const btnDiminuir = document.getElementById("diminuirFonte");
const btnDaltonico = document.getElementById("modoDaltonico");
const btnLeitura = document.getElementById("leitura");


/* =========================
   ESTADOS (PERSISTÊNCIA)
========================= */

let tamanho = parseInt(localStorage.getItem("fontSize")) || 50;
let leitura = localStorage.getItem("leitura") === "true";

if (localStorage.getItem("daltonico") === "true") {
    document.body.classList.add("daltonico");
}


/* =========================
   MENU
========================= */

abrir.onclick = () => sidebar.classList.toggle("ativa");

fechar.onclick = () => sidebar.classList.remove("ativa");


/* =========================
   FONTE (PERSISTENTE)
========================= */


const textos = document.querySelectorAll("p, span, h1, h2, h3, h4, h5, h6, li, label, a");

btnAumentar.addEventListener("click", () => {
    tamanho = Math.min(tamanho + 10, 150);

    textos.forEach(el => {
        el.style.fontSize = tamanho + "%";
    });

    localStorage.setItem("fontSize", tamanho);
});

btnDiminuir.addEventListener("click", () => {
    tamanho = Math.max(tamanho - 10, 70);

    textos.forEach(el => {
        el.style.fontSize = tamanho + "%";
    });

    localStorage.setItem("fontSize", tamanho);
});


/* =========================
   DALTÔNICO
========================= */

btnDaltonico.addEventListener("click", () => {

    document.body.classList.toggle("daltonico");

    localStorage.setItem(
        "daltonico",
        document.body.classList.contains("daltonico")
    );
});


/* =========================
   LEITURA
========================= */

btnLeitura.addEventListener("click", () => {

    leitura = !leitura;

    localStorage.setItem("leitura", leitura);

    btnLeitura.innerText = leitura ? "Desativar leitura" : "Ativar leitura";
});


/* =========================
   VOZ
========================= */

function falar(texto) {
    const speech = new SpeechSynthesisUtterance(texto);
    speech.lang = "pt-BR";

    speechSynthesis.cancel();
    speechSynthesis.speak(speech);
}


/* =========================
   LEITURA INTELIGENTE
   (não lê painel da acessibilidade)
========================= */

document.addEventListener("mouseover", (e) => {

    if (!leitura) return;

    const alvo = e.target.closest("button, a, p, h1, h2, h3, h4, h5, h6");

    if (!alvo) return;

    if (alvo.closest("#sidebarAcess") || alvo.closest(".acess-btn")) return;

    const texto = alvo.innerText?.trim();

    if (!texto) return;

    falar(texto);

}, true);


document.addEventListener("click", (e) => {

    if (!leitura) return;

    const alvo = e.target.closest("button, a");

    if (!alvo) return;

    if (alvo.closest("#sidebarAcess") || alvo.closest(".acess-btn")) return;

    const texto = alvo.innerText?.trim();

    if (!texto) return;

    falar(texto);
});

});