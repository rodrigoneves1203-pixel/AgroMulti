
const params = new URLSearchParams(window.location.search);
const id_ciclo = params.get("id");

 const alerta =  document.getElementById("alert")
 const teto = document.getElementById("texto")
const id_usuario = localStorage.getItem("id_usuario");
const token = localStorage.getItem("token");
function irParaCriarGasto() {
    const params = new URLSearchParams(window.location.search);
    const id_ciclo = params.get("id");

    window.location.href = `criar_gasto.html?id=${id_ciclo}`;
}
function formatarData(data) {
    const d = new Date(data);

    return d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}
function irParaCriarGanho() {
    const params = new URLSearchParams(window.location.search);
    const id_ciclo = params.get("id");

    window.location.href = `criar_ganho.html?id=${id_ciclo}`;
}

async function listarGastos() {
    const response = await fetch(`https://agromulti-2.onrender.com/gastos/ciclo/${id_ciclo}`);
    const dados = await response.json();

    const lista = document.getElementById("lista_gastos");
    lista.innerHTML = "";

    dados.forEach(gasto => {
       const data_gasto = formatarData(gasto.data_inicio);
        const li = document.createElement("li");
        li.className = "dados";
       li.innerHTML = `
<article class="ciclo-info" tabindex="0" aria-label="Informações do gasto">

    <div class="ciclo-info">

        <p class="nome">
            <strong>Nome do gasto:</strong> ${gasto.nome_gasto}
        </p>

        <p class="data">
            <strong>Data:</strong> ${data_gasto}
        </p>

        <p class="descricao">
            <strong>Descrição:</strong> ${gasto.descricao_gasto}
        </p>

    </div>

    <div class="lado-direito">

        <p class="valor">
            <strong>Valor:</strong> R$ ${gasto.valor}
        </p>
                <button
        onclick="window.location.href ='configurar_gasto.html?id_gasto=${gasto.id_gastos}&id_ciclo=${gasto.id_ciclo}'"
         aria-label="atualizar ganho">
        atualizar gasto</button>

        <button
            onclick="deletarGastos(event, ${gasto.id_gastos})"
            aria-label="Excluir gasto ${gasto.nome_gasto}">
            Excluir
        </button>

    </div>

</article>
`;

        lista.appendChild(li);
    });

}
async function listarReceita() {
    const result = await fetch(`https://agromulti-2.onrender.com/receita/ciclo/${id_ciclo}`);
    const dados = await result.json();
    const listar = document.getElementById("lista_receitas");
    listar.innerHTML = "";
let tran = false;
    dados.forEach(receita => {
        const data_receita = formatarData(receita.data_venda);

        const li = document.createElement("li");
        li.className = "dados"
       li.innerHTML = `
<article class="ciclo-info" tabindex="0" aria-label="Informações da receita">

    <div class="ciclo-info">

        <p class="nome">
            <strong>Nome do produto:</strong> ${receita.nome_produto}
        </p>

        <p class="data">
            <strong>Data:</strong> ${data_receita}
        </p>

        <p class="quantidade">
            <strong>Quantidade:</strong> ${receita.quantidade}
        </p>

        <p class="descricao">
            <strong>Descrição da venda:</strong> ${receita.descricao_venda}
        </p>

    </div>

    <div class="lado-direito">

        <p class="valor">
            <strong>Valor:</strong> R$ ${receita.valor_receita}
        </p>
        <button
        onclick=" window.location.href ='configurar_ganho.html?id_receita=${receita.id_receita}&id_ciclo=${receita.id_ciclo}'"
         aria-label="atualizar ganho">
        atualizar ganho</button>
        <button
            onclick="deletarReceitas(event, ${receita.id_receita})"
            aria-label="Excluir receita ${receita.nome_produto}">
            Excluir
        </button>

    </div>

</article>
`;

        listar.appendChild(li);
    });

}

async function deletarGastos(event, id) {

    event.stopPropagation(); // impede o clique de chegar no li

    const confirmar = confirm("Tem certeza que deseja excluir esse gasto?");
    if (!confirmar) return;

    await fetch(`https://agromulti-2.onrender.com/deletar/gastos/${id}`, {
        method: "DELETE"
    });

    await encerrarCiclo();

    await listarGastos();
    
    alert("gasto excluido com sucesso!");

    
}
async function deletarReceitas( event, id) {
    event.stopPropagation();
    const confirme = confirm("tem certeza que deseja excluir essa receita?");

    if(!confirme) return;

    const resut = await fetch(`https://agromulti-2.onrender.com/receita/deletar/${id}`,{
    method: "DELETE"
 }
)

await encerrarCiclo();

await listarReceita();

alert("ganho excluido com sucesso!");

};

function voltar(){
    window.location.href = `pagina_ciclo.html`;
}

async function deletarCiclo() {

    const confirmar = confirm("Tem certeza que deseja deletar este ciclo?");

    if (!confirmar) return;

    const response = await fetch(`https://agromulti-2.onrender.com/ciclo/${id_ciclo}`, {
        method: "DELETE"
    });

    if (response.ok) {
        
        alert("Ciclo deletado com sucesso!");

        window.location.href = "pagina_ciclo.html";

    } else {

        alert("Erro ao deletar ciclo");

    }
}
 async function encerrarCiclo(){

   const token = localStorage.getItem("token");

const relatorio_nome = await fetch(`https://agromulti-2.onrender.com/ciclo/${id_ciclo}`,{
  headers: {
    Authorization: "Bearer " + token,
    
  },
  
});
    const nome = await relatorio_nome.json();
    const nome_re = nome.nome_ciclo;


const result = await fetch(`https://agromulti-2.onrender.com/encerrar-ciclo/${id_usuario}/${id_ciclo}`, {
        method: "POST",
                headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            nome_re
        })
    })
    if(result.ok){
    alert("relatório atualizado com sucesso!");

};

};
   function ver_relatorio(){
  window.location.href = `relatorio.html?id=${id_usuario}&id_ciclo=${id_ciclo}`
   }
   
window.onload = async () => {
    await listarGastos();
    await listarReceita();
    if(localStorage.getItem("relatório") === "true"){
        localStorage.setItem("relatório","false");
        await encerrarCiclo();
        
    }
};