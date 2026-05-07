const params = new URLSearchParams(window.location.search);
 const id_usuario = localStorage.getItem("id_usuario");

const id_gasto = params.get("id_gasto");
const id_ciclo = params.get("id_ciclo");
const data = document.getElementById("data_inicio");
const nome = document.getElementById("nome_gasto");
const descricao = document.getElementById("descricao_gasto");
const valor = document.getElementById("valor");

 async function mostrarCampo() {
   const result = await fetch (`https://agromulti-2.onrender.com/gastos/${id_gasto}`,{
    method: "GET"
   });
   const dados = await result.json();
   nome.value = dados.nome_gasto || "";
  data.value = dados.data_inicio
    ? dados.data_inicio.split("T")[0]
    : "";
   valor.value = dados.valor || "";
   descricao.value = dados.descricao_gasto || "";
}
mostrarCampo();
function voltar() {
    window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
}
async function atualizar() {

    const valor2 = document.getElementById("valor").value;
     if (!/^\d+([.,]\d{1,2})?$/.test(valor2)) {
        alert("Digite um valor válido! Ex: 150,50");
        return;
    }

    // converte vírgula pra ponto
    const valor3 = parseFloat(valor2.replace(",", "."));

    const response = await fetch(`https://agromulti-2.onrender.com/gastos/${id_gasto}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            valor: valor3,
            data: data.value,
            nome: nome.value,
            descricao:descricao.value
        })
    });

    if (response.ok) {
         localStorage.setItem("relatório","true");
        alert("Atualizado com sucesso!");
        window.location.href = `configurar_ciclo.html?id=${id_ciclo}`;
    } else {
        alert("Erro ao atualizar");
    }
}