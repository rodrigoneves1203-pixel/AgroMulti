const params = new URLSearchParams(window.location.search);

const id_ganho = params.get("id_receita");
const id_ciclo = params.get("id_ciclo");

const data = document.getElementById("data_ganho");
const nome = document.getElementById("nome_ganho");
const descricao = document.getElementById("descricao_ganho");
const quantidade = document.getElementById("quantidade_ganho");
const valor = document.getElementById("valor_ganho");

function voltar() {
    window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
}

async function mostrarDados() {

    const response = await fetch(
        `https://agromulti-2.onrender.com/receita/${id_ganho}`
    );

    const dados = await response.json();

    console.log(dados);

    nome.value = dados.nome_produto || "";
   data.value = dados.data_venda
    ? dados.data_venda.split("T")[0]
    : "";
    valor.value = dados.valor_receita || "";
    quantidade.value = dados.quantidade || "";
    descricao.value = dados.descricao_venda || "";
}

mostrarDados();

async function atualizar() {

    const valorTexto = valor.value;

    if (!/^\d+([.,]\d{1,2})?$/.test(valorTexto)) {
        alert("Digite um valor válido! Ex: 150,50");
        return;
    }

    const valorConvertido = parseFloat(
        valorTexto.replace(",", ".")
    );

    const response = await fetch(
        `https://agromulti-2.onrender.com/receita/${id_ganho}`,
        {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                data: data.value,
                quantidade: quantidade.value,
                valor: valorConvertido,
                descricao: descricao.value,
                nome: nome.value
            })
        }
    );

    if (response.ok) {
        alert("Atualizado com sucesso!");
        window.location.href =
            `configurar_ciclo.html?id=${id_ciclo}`;
    } else {
        alert("Erro ao atualizar");
    }
}