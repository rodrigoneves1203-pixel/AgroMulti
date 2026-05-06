const express = require("express");
const rotas = express.Router();
const Ciclocontrollers = require("../controllers/cicloControllers");
const verificarToken = require("../middleware/auth");
rotas.get('/ciclo',verificarToken,Ciclocontrollers.listar);
rotas.get("/relatorios/:id_usuario", Ciclocontrollers.relatorioLista)
rotas.post("/encerrar-ciclo/:id_usuario/:id_ciclo",Ciclocontrollers.encerrarCiclo)
rotas.get("/ciclo-dados", verificarToken ,Ciclocontrollers.dados);
rotas.post('/ciclo/:id_usuario',Ciclocontrollers.adicionarCiclo);
rotas.delete('/ciclo/:id_ciclo',Ciclocontrollers.deletar);
rotas.delete('/relatorio/:id_relatorio/:id_ciclo',Ciclocontrollers.deletarRelatorio);
rotas.put("/abrir-ciclo/:id_ciclo",Ciclocontrollers.abrir);
module.exports = rotas;