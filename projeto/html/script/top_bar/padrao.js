
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
    "pagFinanceiro.html":"Ajuda",
    "configurar_ciclo.html": "Ciclo",
    "notas.html": "Anotações",
    "parcerias.html":  "Parceiros",
    "configurar_ganho.html": "atualizar",
    "configurar_gasto.html": "atualizar"
  };
  

  const pagina = window.location.pathname.split("/").pop();

  return nomes[pagina];
}

function montarLayoutAgroMulti() {

  const layout = `
   
<!-- BARRA SUPERIOR -->
<div class="topbar">

<button class="menu-toggle" aria-label="Abrir menu">
<i class="fa-solid fa-bars"></i>
</button>

<div class="logo d-flex align-items-center flex-wrap">

 <h1 class="title1">${getTituloPagina()}</h1>

</div>

</div>


<!-- MENU LATERAL -->
<nav class="sidebar" role="navigation">

<ul class="menu">

<li>
<button onclick="window.location.href='principal.html'" class="active d-flex align-items-center gap-2">
<i class="fa-solid fa-house"></i>
<span>Página inicial</span>
</button>
</li>

<li>
<button onclick="window.location.href='pagina_ciclo.html'" class="active d-flex align-items-center gap-2">
<i class="fa-solid fa-seedling"></i>
<span>Ciclos</span>
</button>
</li>

<li>
<button onclick="ir_relatorio()" class="d-flex align-items-center gap-2">
<i class="fa-solid fa-chart-line"></i>
<span>Relatórios</span>
</button>
</li>

<li><button onclick="window.location.href='notas.html'"
aria-label="Anotções">

<i class="fa-solid fa-clipboard-list"></i>

<span>Anotações</span>

</button>
</li>

<li>
<button onclick="window.location.href='parcerias.html'" class="d-flex align-items-center gap-2">
<i class="fa-solid fa-handshake"></i>
<span>Parcerias</span>
</button>
</li>

<li>
<button onclick="window.location.href='pagAjuda.html'" class="d-flex align-items-center gap-2">
<i class="fa-solid fa-circle-question"></i>
<span>Ajuda</span>
</button>
</li>

<li>
<button onclick="window.location.href='perfil.html'" class="d-flex align-items-center gap-2">
<i class="fa-solid fa-user"></i>
<span>Perfil</span>
</button>
</li>
<li id="sair">
<button onclick="window.location.href='index.html'" class="d-flex align-items-center gap-2">
<i class="fa-solid fa-right-from-bracket"></i>
<span>Sair</span>
</button>
</li>

</ul>

</nav>


  `;

  document.body.insertAdjacentHTML("afterbegin", layout);

const toggleBtn = document.querySelector(".menu-toggle")
const sidebar = document.querySelector(".sidebar")

toggleBtn.addEventListener("click", () => {
sidebar.classList.toggle("active")
})
}

function ir_relatorio(){
    window.location.href = `relatorio.html?id=${id_usuario}`
}
/* 🔥 ESSENCIAL PRA NÃO SUMIR AO VOLTAR */
document.addEventListener("DOMContentLoaded", montarLayoutAgroMulti);
window.addEventListener("pageshow", montarLayoutAgroMulti);