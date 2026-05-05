const params = new URLSearchParams(window.location.search);
 const id_usuario = localStorage.getItem("id_usuario");

const id_gasto = params.get("id_gasto");
const id_ciclo = params.get("id_ciclo");



function mostrarCampo() {
    const campo = document.getElementById("campo").value;
    const area = document.getElementById("area-input");

    area.innerHTML = "";

    if (campo === "nome_gasto") {

        area.innerHTML = `
        <span>Nome</span>
        <input id="valor_input" placeholder="Novo nome">`;
    }

    if (campo === "valor") {
        
        area.innerHTML = `
        <span>valor</span>
        <input id="valor_input" placeholder="Novo valor">`;
    }

    if (campo === "data_inicio") {
        area.innerHTML = `
        <span>Data inicio</span>
        <input id="valor_input" type="date">`;
    }

    if (campo === "descricao_gasto") {
        area.innerHTML = `
        <span>Descrição</span>
        <input id="valor_input" placeholder="Nova descrição">`;
    }
}
function voltar() {
    window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
}
async function atualizar() {

    const campo = document.getElementById("campo").value;
    const valor1 = document.getElementById("valor_input").value;
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
    const response = await fetch(`https://agromulti-2.onrender.com/gastos/${campo}/${id_gasto}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            novo_valor: valor
        })
    });

    if (response.ok) {
        alert("Atualizado com sucesso!");
        window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
    } else {
        alert("Erro ao atualizar");
    }
}