const form = document.getElementById("formLogin");

form.addEventListener("submit", async function (event) {
    event.preventDefault();

    const email = document.querySelector('input[name="email"]').value;
    const senha = document.querySelector('input[name="senha"]').value;

    try {
        const response = await fetch("https://agromulti-2.onrender.com/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ email, senha })
        });

const usuario = await response.json();

if (usuario.erro) {
    alert("Email ou senha incorretos!");
    window.location.href = "index.html";
    return;
}

localStorage.setItem("token", usuario.token);
localStorage.setItem("id_usuario", usuario.id_usuario);


window.location.href = "principal.html";

    } catch (erro) {
        console.log("ERRO:", erro);
    }
});