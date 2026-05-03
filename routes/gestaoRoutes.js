const express = require("express");
const rotas = express.Router();
const ControllerGestao = require("../controllers/gestaoController")

rotas.get("/gastos/:id_ciclo",ControllerGestao.listarGastos);
rotas.get("/receita/:id_ciclo",ControllerGestao.listarGanhos);
rotas.post("/adicionar/gastos/:id_ciclo",ControllerGestao.adicionarGasto);
rotas.post("/adicionar/receita/:id_ciclo", ControllerGestao.adicionarGanho);
rotas.put('/gastos/:oque_mudar/:id_gastos',ControllerGestao.atualizarGasto);
rotas.put('/receita/:id_receita/:oque_mudar',ControllerGestao.atualizarGanho);
rotas.delete('/deletar/gastos/:id_gastos',ControllerGestao.deleteGasto);
rotas.delete('/receita/deletar/:id_receita', ControllerGestao.deleteGanho);
module.exports = rotas;