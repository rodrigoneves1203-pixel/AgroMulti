const params = new URLSearchParams(window.location.search);
 const id_usuario = localStorage.getItem("id_usuario");

const id_ganho = params.get("id_receita");
const id_ciclo = params.get("id_ciclo");
    const data = document.getElementById("data_ganho");
    const nome = document.getElementById("nome_ganho");
    const descricao = document.getElementById("descricao_ganho");
    const quantidade = document.getElementById("quantidade_ganho");
    const valor = document.getElementById("valor");
    

    function voltar() {
    window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
}

function mostrarDados() {
    const dados = await fetch(`https://agromulti-2.onrender.com/receita/${id_ganho}`,{
        method: "GET"
    });
    await dados.json();

    nome.value = dados.nome_produto || " ";
    data.value = dados.data_venda || "20/20/2006";
    valor.value = dados.valor_receita || "0";
    quantidade.value = dados.quantidade || " ";
    descricao.value = dados.descricao_venda || " ";

}
mostrarDados();


async function atualizar() {

    const valor1 = document.getElementById("valor_ganho").value;
     if (!/^\d+([.,]\d{1,2})?$/.test(valor1)) {
        alert("Digite um valor válido! Ex: 150,50");
        return;
    }

    // converte vírgula pra ponto
    const valor = parseFloat(valor1.replace(",", "."));
    if (!campo || !valor) {
        alert("Preencha os dados!");
        return;
    }
    const response = await fetch(`https://agromulti-2.onrender.com/receita/${id_ganho}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            data: data.value,
            quantidade: quantidade.value,
            valor: valor.valor,
            descricao: descricao.value,
            nome: nome.value

        })
    });

    if (response.ok) {
        alert("Atualizado com sucesso!");
        window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
    } else {
        alert("Erro ao atualizar");
    }
}