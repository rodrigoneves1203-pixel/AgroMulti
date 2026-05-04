const params = new URLSearchParams(window.location.search);
const id_ciclo = params.get("id");

async function adicionarGasto() {

    const nome_gasto = document.getElementById("nome_gasto").value;
    let valorInput = document.getElementById("valor").value;
    const data_inicio = document.getElementById("data_inicio").value;
    const descricao_gasto = document.getElementById("descricao_gasto").value;

    // validação forte (aceita 150,50 ou 150.50)
    if (!/^\d+([.,]\d{1,2})?$/.test(valorInput)) {
        alert("Digite um valor válido! Ex: 150,50");
        return;
    }

    // converte vírgula pra ponto
    const valor = parseFloat(valorInput.replace(",", "."));

    try {
        const result = await fetch(`https://agromulti.onrender.com/adicionar/gastos/${id_ciclo}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                id_ciclo,
                nome_gasto,
                valor,
                data_inicio,
                descricao_gasto
            })
        });

        if (result.ok) {
            alert("Gasto criado com sucesso!");
            window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
        } else {
            alert("Erro ao criar gasto.");
        }

    } catch (error) {
        console.error(error);
        alert("Erro de conexão com o servidor.");
    }
}

function voltar() {
    window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
}