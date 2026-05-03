const notasModel = require("../models/notasModel");

// criar
exports.criarNota = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    let { titulo, texto } = req.body;

    // se não tiver título, cria automaticamente
    if (!titulo || titulo.trim() === "") {
      titulo = "Sem título";
    }

    const result = await notasModel.insertNota(id_usuario, titulo, texto);

    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao criar nota");
  }
};

// listar
exports.listarNotas = async (req, res) => {
  try {
    const { id_usuario } = req.params;
    const result = await notasModel.selectNotas(id_usuario);
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar notas");
  }
};

// editar
exports.editarNota = async (req, res) => {
  try {
    const { id_nota } = req.params;
    let { titulo, texto } = req.body;

    // evita null no título
    if (!titulo || titulo.trim() === "") {
      titulo = "Sem título";
    }

    await notasModel.updateNotas(titulo, texto, id_nota);

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao editar nota");
  }
};

// deletar
exports.deletarNota = async (req, res) => {
  try {
    const { id_nota } = req.params;
    await notasModel.deleteNotas(id_nota);

    res.json({ ok: true });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar nota");
  }
};