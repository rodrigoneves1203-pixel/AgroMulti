const gestaoModel = require("../models/gestaoModel");

// gasto
exports.adicionarGasto = async (req, res) => {
  try {
    const id_ciclo = req.params.id_ciclo;
    const descricao_gasto = req.body.descricao_gasto;
    const valor = req.body.valor;
    const data_inicio = req.body.data_inicio;
    const nome_gasto = req.body.nome_gasto;

    if (!valor || isNaN(valor)) {
      return res.status(400).json({ erro: "valor inválido" });
    }

    const result = await gestaoModel.adicionarGasto(
      id_ciclo,
      descricao_gasto,
      valor,
      data_inicio,
      nome_gasto
    );

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao adicionar gasto");
  }
};

// listar
exports.listarGastos = async (req, res) => {
  try {
    const id_ciclo = req.params.id_ciclo;
    const result = await gestaoModel.gastosLista(id_ciclo);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar gastos");
  }
};

// deletar
exports.deleteGasto = async (req, res) => {
  try {
    const id_gastos = req.params.id_gastos;
    await gestaoModel.deleteGasto(id_gastos);
    res.json({ message: "Gasto deletado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar gasto");
  }
};

// atualizar
exports.atualizarGasto = async (req, res) => {
  try {
    const id_gastos = req.params.id_gastos;
    const oque_mudar = req.params.oque_mudar;
    const novo_valor = req.body.novo_valor;

    let query;

    switch (oque_mudar) {
      case "descricao_gasto":
        query = "UPDATE gastos SET descricao_gasto = $1 WHERE id_gastos = $2";
        break;
      case "valor":
        query = "UPDATE gastos SET valor = $1 WHERE id_gastos = $2";
        break;
      case "data_inicio":
        query = "UPDATE gastos SET data_inicio = $1 WHERE id_gastos = $2";
        break;
      case "nome_gasto":
        query = "UPDATE gastos SET nome_gasto = $1 WHERE id_gastos = $2";
        break;
      default:
        return res.status(400).json({ error: "Campo inválido" });
    }

    await gestaoModel.atualizarGasto(novo_valor, id_gastos, query);
    res.json({ message: "Atualizado com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar gasto");
  }
};

// ganho
exports.adicionarGanho = async (req, res) => {
  try {
    const id_ciclo = req.params.id_ciclo;
    const quantidade = req.body.quantidade_ganho;
    const valor_receita = req.body.valor_ganho;
    const data_venda = req.body.data_ganho;
    const nome_produto = req.body.nome_ganho;
    const descricao_venda = req.body.descricao_ganho;

    if (!valor_receita || isNaN(valor_receita)) {
      return res.status(400).json({ erro: "valor inválido" });
    }

    const result = await gestaoModel.adicionarGanho(
      id_ciclo,
      quantidade,
      valor_receita,
      data_venda,
      nome_produto,
      descricao_venda
    );

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao adicionar ganho");
  }
};

// listar
exports.listarGanhos = async (req, res) => {
  try {
    const id_ciclo = req.params.id_ciclo;
    const result = await gestaoModel.listarGanho(id_ciclo);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar ganhos");
  }
};

exports.atualizarGanho = async (req, res) => {
  try {
    const id_receita = req.params.id_receita;
    const oque_mudar = req.params.oque_mudar;
    const novo_valor = req.body.novo_valor;

    let query;

    switch (oque_mudar) {
      case "quantidade":
        query = "UPDATE receita SET quantidade = $1 WHERE id_receita = $2";
        break;
      case "valor_receita":
        query = "UPDATE receita SET valor_receita = $1 WHERE id_receita = $2";
        break;
      case "data_venda":
        query = "UPDATE receita SET data_venda = $1 WHERE id_receita = $2";
        break;
      case "nome_produto":
        query = "UPDATE receita SET nome_produto = $1 WHERE id_receita = $2";
        break;
      case "descricao_venda":
        query = "UPDATE receita SET descricao_venda = $1 WHERE id_receita = $2";
        break;
      default:
        return res
          .status(400)
          .json({ error: "Campo a ser atualizado não válido" });
    }

    await gestaoModel.atualizarGanho(novo_valor, id_receita, query);
    res.json({ message: "Receita atualizada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao atualizar ganho");
  }
};

// deletar
exports.deleteGanho = async (req, res) => {
  try {
    const id_receita = req.params.id_receita;
    await gestaoModel.deleteGanho(id_receita);
    res.json({ message: "Receita deletada com sucesso" });
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar ganho");
  }
};