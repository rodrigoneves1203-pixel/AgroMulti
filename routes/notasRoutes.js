const express = require("express");
const rotas = express.Router();
const ControllerNotas = require("../controllers/notasControlles");

rotas.post('/notas/:id_usuario', ControllerNotas.criarNota);
rotas.get('/notas/:id_usuario', ControllerNotas.listarNotas);
rotas.put('/notas/:id_nota', ControllerNotas.editarNota);
rotas.delete('/notas/:id_nota',ControllerNotas.deletarNota);
module.exports = rotas;