const token = localStorage.getItem("token");
function formatarData(data) {
    const d = new Date(data);

    return d.toLocaleDateString("pt-BR");
}
const id_usuario = localStorage.getItem("id_usuario");
async function listarCiclos() {

    const response = await fetch(`https://agromulti.onrender.com/ciclo`,{
 headers:{
   Authorization: "Bearer " + token
 }
});
    const dados = await response.json();
    
    const lista = document.getElementById("lista_ciclos");
    lista.innerHTML = "";

    dados.forEach((ciclo, index) => {

        let relatorio = ciclo.trancado ? "fechado para adição" : "aberto para adição";
        let graf = ciclo.trancado ? "fechadoc": "fechadod";
        const numeroCiclo = index+1;
        
        const li = document.createElement("li");
        li.className = "ciclo-info";
       
li.className = "ciclo";

li.innerHTML = `
<article class="ciclo-info" tabindex="0" aria-label="Informações do ciclo">

    <p class="tipo">
        <i class="fa-solid fa-leaf" aria-hidden="true"></i>
        <strong>Tipo do ciclo:</strong> ${ciclo.tipo}
    </p>

    <h3 class="nome">
        Nome do ciclo: ${ciclo.nome_ciclo}
    </h3>

    <p class="numero">
        Número do ciclo: ${numeroCiclo}
    </p>

    <p class="data">
        <i class="fa-regular fa-calendar" aria-hidden="true"></i>
        <strong>Data de início:</strong> ${formatarData(ciclo.data_inicio)}
    </p>

    <p class="status ${graf}">
        <strong>Situação do relatório:</strong> ${relatorio}
    </p>
         <button class="btn-abrir-ciclo">
        Ver detalhes do ciclo
    </button>
   
   </article>
   <img class="pecu" src="${ciclo.imagem}">
`;
 li.classList.add(ciclo.tipo);
const botao = li.querySelector(".btn-abrir-ciclo");

botao.addEventListener("click", (e) => {
    e.stopPropagation(); // impede ativar o clique do li
    window.location.href = `configurar_ciclo.html?id=${ciclo.id_ciclo}`;
});
li.onclick = () => {
    window.location.href = `configurar_ciclo.html?id=${ciclo.id_ciclo}`;
}
        lista.appendChild(li);
    });
};
async function adicionarCiclo() {

    const nome_ciclo = document.getElementById("nome_ciclo").value;
    const data_inicio = document.getElementById("data_inicio").value;
    const tipo = document.getElementById("tipo").value;
    const imagens = {
agricultura: "https://agromulti.onrender.com/html/fotos/agricultura.png",
pecuaria: "https://agromulti.onrender.com/html/fotos/pecuaria.png",
agropecuaria: "https://agromulti.onrender.com/html/fotos/agropecuaria.png"
};

const imagem = imagens[tipo];
    const response = await fetch(`https://agromulti.onrender.com/ciclo/${id_usuario}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ nome_ciclo, data_inicio, tipo,imagem })
    });

    if (response.ok) {
        alert("Ciclo adicionado com sucesso!");
        window.location.href="pagina_ciclo.html";
    } else {
        alert("Erro ao adicionar ciclo.");
    }
};

function voltar(){
    window.location.href = `index.html`;
}

function ir_relatorio(){
    window.location.href = `relatorio.html?id=${id_usuario}`
}
window.onload = () => {
    listarCiclos();
};

window.onfocus = () => {
    listarCiclos();
};