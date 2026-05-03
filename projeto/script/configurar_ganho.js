const params = new URLSearchParams(window.location.search);
 const id_usuario = localStorage.getItem("id_usuario");

const id_ganho = params.get("id_receita");
const id_ciclo = params.get("id_ciclo");


    function voltar() {
    window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
}

function mostrarCampo() {
    const campo = document.getElementById("campo").value;
    const area = document.getElementById("area-input");

    area.innerHTML = "";

    if (campo === "nome_produto") {
        area.innerHTML = `
        <span>nome</span>
        <input id="valor_input" placeholder="Novo nome">`;
    }

    if (campo === "valor_receita") {
        area.innerHTML = `
        <span>valor</span>
        <input id="valor_input" placeholder="Novo valor">`;

    }

    if (campo === "data_venda") {
        area.innerHTML = `
        <span>data da venda</span>
        <input id="valor_input" type="date">`;
    }

    if (campo === "quantidade"){
        area.innerHTML = `
        <span>quantidade</span>
        <input id="valor_input"  placeholder="quantidade">`;
    }

    if (campo === "descricao_venda") {
        area.innerHTML = `
        <span>descrição</span>
        <input id="valor_input" placeholder="Nova descrição">`;
    }
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
    const response = await fetch(`http://localhost:3000/receita/${id_ganho}/${campo}`, {
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