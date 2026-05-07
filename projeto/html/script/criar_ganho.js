const params = new URLSearchParams(window.location.search);
const id_ciclo = params.get("id");

async function adicionarGanho() {

    const nome_ganho = document.getElementById("nome_ganho").value;
    const valor_ganho = document.getElementById("valor_ganho").value;
    const data_ganho = document.getElementById("data_ganho").value;
    const descricao_ganho = document.getElementById("descricao_ganho").value;
    const quantidade_ganho = document.getElementById("quantidade_ganho").value;
     // validação forte (aceita 150,50 ou 150.50)
    if (!/^\d+([.,]\d{1,2})?$/.test(valor_ganho)) {
        alert("Digite um valor válido! Ex: 150,50");
        return;
    }

    // converte vírgula pra ponto
    const valor = parseFloat(valor_ganho.replace(",", "."));
    const result = await fetch(`https://agromulti-2.onrender.com/adicionar/receita/${id_ciclo}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            id_ciclo,
            nome_ganho,
            valor_ganho,
            data_ganho,
            descricao_ganho,
            quantidade_ganho
        })
    });

    if (result.ok) {
         localStorage.setItem("relatório","true");
        alert("Ganho criado com sucesso!");
          window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
    } else {
        alert("Erro ao criar gasto.");
    }


}


function voltar() {
    window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
}