
const id_usuario = localStorage.getItem("id_usuario");

//  proteção
if (!id_usuario) {
    alert("Você precisa estar logado!");
    window.location.href = "../index.html";
}

// inputs
const nomeInput = document.getElementById("nome");
const emailInput = document.getElementById("email");
const senhaInput = document.getElementById("senha");
const fotoInput = document.getElementById("foto");
const preview = document.getElementById("preview");

//  carregar dados
async function carregarDados() {
    try {
        const res = await fetch(`http://localhost:3000/usuario/${id_usuario}`);

        if (!res.ok) {
            const texto = await res.text();
            console.log("ERRO BACK:", texto);
            throw new Error("Erro ao buscar usuário");
        }

        const user = await res.json();

        nomeInput.value = user.nome || "";
        emailInput.value = user.email || "";

        const fotoSalva = localStorage.getItem("foto_" + id_usuario);
        if (fotoSalva) preview.src = fotoSalva;

    } catch (erro) {
       
        alert("Erro ao carregar dados do usuário");
    }
}

carregarDados();

//  foto
fotoInput.addEventListener("change", () => {
    const file = fotoInput.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        preview.src = reader.result;
        localStorage.setItem("foto_" + id_usuario, reader.result);
    };

    if (file) reader.readAsDataURL(file);
});

// salvar
document.getElementById("salvar").addEventListener("click", async () => {

    const nome = nomeInput.value;
    const senha = senhaInput.value;

    const body = { nome };

    if (senha.trim() !== "") {
        body.senha = senha;
    }



    try {
        const res = await fetch(`http://localhost:3000/usuario/${id_usuario}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        });

        if (!res.ok) {
            const texto = await res.text();
            console.log("ERRO BACK:", texto);
            throw new Error("Erro ao atualizar");
        }

        const resposta = await res.json();

       

        alert("Dados atualizados!");
        senhaInput.value = "";

    } catch (erro) {
        console.log("Erro ao salvar:", erro);
        alert("Erro ao salvar dados");
    }
});

// cancelar
document.getElementById("cancelar").addEventListener("click", () => {
    localStorage.removeItem("id_usuario"); // desloga
    window.history.back();
});

document.getElementById("excluir").addEventListener("click", async () => {

    const confirmar = confirm("Tem certeza que deseja excluir sua conta? Essa ação não pode ser desfeita.");

    if (!confirmar) return;

    try {
        const res = await fetch(`http://localhost:3000/usuario/${id_usuario}`, {
            method: "DELETE"
        });

        if (!res.ok) {
            const texto = await res.text();
            console.log("ERRO BACK:", texto);
            throw new Error("Erro ao excluir");
        }

        alert("Conta excluída com sucesso!");

        // limpa dados
        localStorage.removeItem("id_usuario");
        localStorage.removeItem("foto_" + id_usuario);

        // redireciona
        window.location.href = "index.html";

    } catch (erro) {
        console.log("Erro ao excluir:", erro);
        alert("Erro ao excluir conta");
    }
});

