
const params = new URLSearchParams(window.location.search);
const token = localStorage.getItem("token");

function formatarData(data) {
    const d = new Date(data);

    return d.toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
}

const id_usuario = localStorage.getItem("id_usuario");


async function listar() {

    const result = await fetch(`https://agromulti-2.onrender.com/relatorios/${id_usuario}`);
    const dados = await result.json();
    const lista = document.getElementById("lista_relatorios");

    lista.innerHTML = "";

    dados.forEach((relatorio, index )=> {

        let status = relatorio.lucro > 0? 'lucro': 'prejuizo';
        const card = document.createElement("div");
        card.classList.add("card_relatorio");

        card.innerHTML = `
<h3>relatorio: ${relatorio.nome_relatorio}</h3>
<p>Total de gastos: R$ ${relatorio.total_gasto}</p>
<p>Total de vendas: R$ ${relatorio.total_venda}</p>
<p class="status ${status}">Lucro: R$ ${relatorio.lucro}</p>
<p class="status ${status}">Situação: ${status} </p>
<div class="botoes">
<button onclick="atualizarciclo(${relatorio.id_ciclo})">
<i class="fa-solid fa-clock-rotate-left"></i> atualizar ciclo
</button>

<button onclick="gerarGrafico(${relatorio.id_ciclo})">
<i class="fa-solid fa-chart-line"></i> Gerar gráfico
</button>

<button onclick="removerRelatorio(${relatorio.id_relatorio}, ${relatorio.id_ciclo})">
<i class="fa-solid fa-trash"></i> Remover
</button>
</div>`
        lista.appendChild(card);
    });
}

listar();


let grafico;

async function gerarGrafico(id_ciclo){

    const gastosRes = await fetch(`https://agromulti-2.onrender.com/gastos/${id_ciclo}`);
    const receitasRes = await fetch(`https://agromulti-2.onrender.com/receita/${id_ciclo}`);

    const gastos = await gastosRes.json();
    const receitas = await receitasRes.json();

    let totalGasto = 0;
    let totalVenda = 0;

    gastos.forEach(g => {
        totalGasto += Number(g.valor);
    });

    receitas.forEach(r => {
        totalVenda += Number(r.valor_receita);
    });

    const lucro = totalVenda - totalGasto;

    const popup = document.getElementById("popup_grafico");
    popup.style.display = "flex";

    const ctx = document.getElementById("grafico").getContext("2d");

    if(grafico){
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: "bar",
        data: {
            labels: ["Gastos", "Vendas", "Lucro"],
            datasets: [{
                label: "Valores do ciclo",
                data: [totalGasto, totalVenda, lucro]
            }]
        },
        options: {
            responsive: true
        }
    });

}

function voltar() {
    window.history.back();
}

async function atualizarciclo(id){

 await fetch(`https://agromulti-2.onrender.com/abrir-ciclo/${id}`,{
   method:"PUT"
 })

 window.location.href = `configurar_ciclo.html?id=${id}`;

}
async function removerRelatorio(id_relatorio, id_ciclo){

    const confirmar = confirm("Deseja remover este relatório?");
    if(!confirmar) return;

    await fetch(`https://agromulti-2.onrender.com/relatorio/${id_relatorio}/${id_ciclo}`, {
        method: "DELETE"
    });

    listar();
}