
const modal = document.getElementById("modal");
const tituloInput = document.getElementById("titulo");
const textoInput = document.getElementById("texto");
const listaNotas = document.getElementById("listaNotas");


const id_usuario = localStorage.getItem("id_usuario");
let editandoId = null;





document.getElementById("btnNova").addEventListener("click", () => {
  modal.classList.remove("hidden");
  editandoId = null;
});


document.getElementById("cancelar").addEventListener("click", fecharModal);
document.querySelector(".fechar").addEventListener("click", fecharModal);


function fecharModal() {
  modal.classList.add("hidden");
  tituloInput.value = "";
  textoInput.value = "";
}





document.getElementById("salvar").addEventListener("click", async () => {
  const titulo = tituloInput.value.trim() || "Sem título";
  const texto = textoInput.value;


  const id_usuario = localStorage.getItem("id_usuario");


  if (editandoId) {
    await fetch(`https://agromulti.onrender.com/notas/${editandoId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, texto })
    });
  } else {
    await fetch(`https://agromulti.onrender.com/notas/${id_usuario}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ titulo, texto })
    });
  }


  fecharModal();
  carregarNotas();
});




// LISTAR NOTAS


async function carregarNotas() {
  const id_usuario = localStorage.getItem("id_usuario");


  const res = await fetch(`https://agromulti.onrender.com/notas/${id_usuario}`);
  const notas = await res.json();


  listaNotas.innerHTML = "";


  notas.forEach(nota => {
    const div = document.createElement("div");
    div.classList.add("nota");


    // TÍTULO
    const h3 = document.createElement("h3");
    h3.textContent = nota.titulo;


    // TEXTO
    const p = document.createElement("p");
    p.textContent = nota.texto;


    // AÇÕES
    const acoes = document.createElement("div");
    acoes.classList.add("acoes");


    const btnEditar = document.createElement("button");
    btnEditar.innerHTML = "<i class='fa-solid fa-pen'></i><h3>Editar</h4>" ;


    const btnDeletar = document.createElement("button");
    btnDeletar.innerHTML = "<i class='fa-solid fa-trash'></i> <h4> Deletar</h4>";


   




    // EVENTOS
    btnEditar.addEventListener("click", () => {
      editar(nota.id_nota, nota.titulo, nota.texto);
    });


    btnDeletar.addEventListener("click", () => {
      deletar(nota.id_nota);
    });


    acoes.appendChild(btnEditar);
    acoes.appendChild(btnDeletar);


    // MONTAR CARD
    div.appendChild(h3);
    div.appendChild(p);
    div.appendChild(acoes);


    listaNotas.appendChild(div);
  });
}


// EDITAR


function editar(id, titulo, texto) {
  editandoId = id;


  tituloInput.value = titulo;
  textoInput.value = texto;


  modal.classList.remove("hidden");
}





async function deletar(id) {
  await fetch(`https://agromulti.onrender.com/notas/${id}`, {
    method: "DELETE"
  });


  carregarNotas();
}




// INIT


carregarNotas();