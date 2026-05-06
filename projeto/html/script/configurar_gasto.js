const params = new URLSearchParams(window.location.search);
 const id_usuario = localStorage.getItem("id_usuario");

const id_gasto = params.get("id_gasto");
const id_ciclo = params.get("id_ciclo");
const data = document.getElementById("data_inicio");
const nome = document.getElementById("nome_gasto");
const descricao = document.getElementById("descricao_gasto");
const valor = document.getElementById("valor");

 async function mostrarCampo() {
   const dados = await fetch (`https://agromulti-2.onrender.com/gastos/${id_gasto}`,{
    method: "GET"
   });
   await dados.json();
   nome.value = dados.nome_gasto || " ";
   data.value = dados.data_inicio || "20/20/2006";
   valor.value = dados.valor || "0";
   descricao.value = dados.descricao_gasto || " ";
}
function voltar() {
    window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
}
async function atualizar() {

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
    const response = await fetch(`https://agromulti-2.onrender.com/gastos/${id_gasto}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            valor: valor.value,
            data: data.value,
            nome: nome.value,
            descricao:descricao.value
        })
    });

    if (response.ok) {
        alert("Atualizado com sucesso!");
        window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
    } else {
        alert("Erro ao atualizar");
    }
}