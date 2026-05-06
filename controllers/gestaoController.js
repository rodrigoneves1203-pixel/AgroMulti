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
// pegar gasto
exports.pegarGasto = async(req,res)=>{
  const id = req.params.id_gasto;
  const result = await gestaoModel.pegargasto(id);
  res.send(result);

}
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
    const descricao = req.body.descricao;
    const valor = req.body.novo_valor;
    const data = req.body.data;
    const nome = req.body.nome;

    await gestaoModel.atualizarGasto(valor,data,descricao,nome, id_gastos);
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
//pegar ganho
exports.pegarGanho = async (req,res)=>{
  const id = req.params.id_ganho;
  const result = await gestaoModel.pegarganho(id);
  res.send(result);
}
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
    const data = req.body.data;
    const valor = req.body.valor;
    const quantidade = req.body.quantidade;
    const descricao = req.body.descricao;
    const nome = req.body.nome;


    await gestaoModel.atualizarGanho(data,valor,quantidade,descricao,nome,id_receita);
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