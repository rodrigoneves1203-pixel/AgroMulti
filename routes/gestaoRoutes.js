const express = require("express");
const rotas = express.Router();
const ControllerGestao = require("../controllers/gestaoController")

rotas.get("/gastos/ciclo/:id_ciclo",ControllerGestao.listarGastos);
rotas.get("/receita/ciclo/:id_ciclo",ControllerGestao.listarGanhos);
rotas.get("/receita/:id_ganho",ControllerGestao.pegarGanho);
rotas.get("/gastos/:id_gasto",ControllerGestao.pegarGasto);
rotas.post("/adicionar/gastos/:id_ciclo",ControllerGestao.adicionarGasto);
rotas.post("/adicionar/receita/:id_ciclo", ControllerGestao.adicionarGanho);
rotas.put('/gastos/:id_gastos',ControllerGestao.atualizarGasto);
rotas.put('/receita/:id_receita',ControllerGestao.atualizarGanho);
rotas.delete('/deletar/gastos/:id_gastos',ControllerGestao.deleteGasto);
rotas.delete('/receita/deletar/:id_receita', ControllerGestao.deleteGanho);
module.exports = rotas;