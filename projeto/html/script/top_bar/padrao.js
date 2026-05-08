console.log("TOPBAR JS CARREGOU");

function getTituloPagina() {

  const nomes = {
    "principal.html": "Início",
    "pagina_ciclo.html": "Ciclos de Produção",
    "relatorio.html": "Relatórios",
    "perfil.html": "Perfil",
    "pagAjuda.html": "Ajuda",
    "pagCicloProducao2.html": "Ajuda",
    "Perfil.html": "Perfil",
    "criar_ciclo.html": "Criar ciclo",
    "criar_gasto.html": "Criar gasto",
    "criar_ganho.html": "Criar ganho",
    "pagFinanceiro.html": "Ajuda",
    "configurar_ciclo.html": "Ciclo",
    "notas.html": "Anotações",
    "parcerias.html": "Parceiros",
    "configurar_ganho.html": "Atualizar",
    "configurar_gasto.html": "Atualizar"
  };

  const pagina = window.location.pathname.split("/").pop();

  return nomes[pagina] || "AgroMulti";
}

function montarLayoutAgroMulti() {

  /* evita duplicar topbar/sidebar */
  if (document.querySelector(".topbar")) return;

  const paginaAtual = window.location.pathname.split("/").pop();

  const layout = `
   
<!-- BARRA SUPERIOR -->
<div class="topbar">

<button class="menu-toggle" aria-label="Abrir menu">
<i class="fa-solid fa-bars"></i>
</button>

<div class="logo d-flex align-items-center flex-wrap">

<img src="https://agromulti-2.onrender.com/html/fotos/AGRO%20MULTI%20original%20(1).png" id="log">

<h1 class="title1">${getTituloPagina()}</h1>

</div>

</div>


<!-- MENU LATERAL -->
<nav class="sidebar" role="navigation">

<ul class="menu">

<li>
<button 
onclick="window.location.href='principal.html'" 
class="menu-btn d-flex align-items-center gap-2 ${paginaAtual === "principal.html" ? "active" : ""}">

<i class="fa-solid fa-house"></i>
<span>Página inicial</span>

</button>
</li>

<li>
<button 
onclick="window.location.href='pagina_ciclo.html'" 
class="menu-btn d-flex align-items-center gap-2 ${paginaAtual === "pagina_ciclo.html" ? "active" : ""}">

<i class="fa-solid fa-seedling"></i>
<span>Ciclos</span>

</button>
</li>

<li>
<button 
onclick="ir_relatorio()" 
class="menu-btn d-flex align-items-center gap-2 ${paginaAtual === "relatorio.html" ? "active" : ""}">

<i class="fa-solid fa-chart-line"></i>
<span>Relatórios</span>

</button>
</li>

<li>
<button 
onclick="window.location.href='notas.html'"
class="menu-btn d-flex align-items-center gap-2 ${paginaAtual === "notas.html" ? "active" : ""}">

<i class="fa-solid fa-clipboard-list"></i>
<span>Anotações</span>

</button>
</li>

<li>
<button 
onclick="window.location.href='parcerias.html'" 
class="menu-btn d-flex align-items-center gap-2 ${paginaAtual === "parcerias.html" ? "active" : ""}">

<i class="fa-solid fa-handshake"></i>
<span>Parcerias</span>

</button>
</li>

<li>
<button 
onclick="window.location.href='pagAjuda.html'" 
class="menu-btn d-flex align-items-center gap-2 ${paginaAtual === "pagAjuda.html" ? "active" : ""}">

<i class="fa-solid fa-circle-question"></i>
<span>Ajuda</span>

</button>
</li>

<li>
<button 
onclick="window.location.href='perfil.html'" 
class="menu-btn d-flex align-items-center gap-2 ${paginaAtual === "perfil.html" ? "active" : ""}">

<i class="fa-solid fa-user"></i>
<span>Perfil</span>

</button>
</li>

<li id="sair">
<button 
onclick="window.location.href='index.html'" 
class="menu-btn d-flex align-items-center gap-2">

<i class="fa-solid fa-right-from-bracket"></i>
<span>Sair</span>

</button>
</li>

</ul>

</nav>
  `;

  document.body.insertAdjacentHTML("afterbegin", layout);

  const toggleBtn = document.querySelector(".menu-toggle");
  const sidebar = document.querySelector(".sidebar");

  /* abrir/fechar sidebar */
  toggleBtn.addEventListener("click", (event) => {

    event.stopPropagation();

    sidebar.classList.toggle("active");

  });

  /* impedir fechar ao clicar dentro */
  sidebar.addEventListener("click", (event) => {

    event.stopPropagation();

  });

  /* fechar ao clicar fora */
  document.addEventListener("click", (event) => {

    const clicouNaSidebar = sidebar.contains(event.target);
    const clicouNoBotao = toggleBtn.contains(event.target);

    if (!clicouNaSidebar && !clicouNoBotao) {

      sidebar.classList.remove("active");

    }

  });

}

function ir_relatorio() {

  window.location.href = `relatorio.html?id=${id_usuario}`;

}

document.addEventListener("DOMContentLoaded", montarLayoutAgroMulti);

window.addEventListener("pageshow", montarLayoutAgroMulti);