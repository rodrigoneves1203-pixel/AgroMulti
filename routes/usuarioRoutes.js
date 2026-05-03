const express = require('express');
const rotas = express.Router();
const Controller = require('../controllers/usuarioController');

rotas.post('/login', Controller.login);
rotas.post('/cadastro', Controller.cadastro);
rotas.post('/alterar', Controller.alterarSenha);
rotas.post('/recuperar-senha',Controller.pedirSenha);
rotas.post('/nova-senha',Controller.novaSenha);
rotas.put('/usuario/:id', Controller.atualizarDadosUser);
rotas.get('/confirmar-email', Controller.confirmar);
rotas.get('/usuario/:id', Controller.encontrarUsuario);
rotas.delete('/usuario/:id', Controller.deletarUser);

module.exports = rotas;