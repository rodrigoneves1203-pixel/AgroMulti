const cicloModel = require("../models/cicloModel");

exports.dados = async (req, res) => {
  const id = req.params.id_ciclo;
  try {
    const dados = await cicloModel.buscar(id);
    res.send(dados);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar dados");
  }
};

exports.buscarUsuario = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await cicloModel.buscarUsuario(id);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao buscar usuário");
  }
};

exports.listar = async (req, res) => {
  try {
    const id_usuario = req.usuario.id_usuario;
    const result = await cicloModel.listarCiclos(id_usuario);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar ciclos");
  }
};

exports.adicionarCiclo = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const nome_ciclo = req.body.nome_ciclo;
    const data_inicio = req.body.data_inicio;
    const tipo = req.body.tipo;
    const imagem = req.body.imagem;

    const result = await cicloModel.criarCiclo(
      id_usuario,
      nome_ciclo,
      data_inicio,
      tipo,
      imagem
    );

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao adicionar ciclo");
  }
};

exports.deletar = async (req, res) => {
  try {
    const id_ciclo = req.params.id_ciclo;
    const result = await cicloModel.deletarCiclo(id_ciclo);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao deletar ciclo");
  }
};

exports.encerrarCiclo = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const id_ciclo = req.params.id_ciclo;
    const nome_relatorio = req.body.nome_re;

    const soma_gasto = await cicloModel.somaGasto(id_ciclo);
    const soma_receita = await cicloModel.somaGanho(id_ciclo);

    const total_gasto = soma_gasto.total || 0;
    const total_venda = soma_receita.total || 0;

    const lucro = total_venda - total_gasto;

    await cicloModel.fechar(id_ciclo);

    const verificar = await cicloModel.verificarRelatorio(id_ciclo);

    let result;
    if (verificar > 0) {
      result = await cicloModel.atualizar(
        nome_relatorio,
        id_ciclo,
        total_gasto,
        total_venda,
        lucro
      );
    } else {
      result = await cicloModel.inserir(
        id_ciclo,
        id_usuario,
        total_gasto,
        total_venda,
        lucro,
        nome_relatorio
      );
    }

    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao encerrar ciclo");
  }
};

exports.relatorioLista = async (req, res) => {
  try {
    const id_usuario = req.params.id_usuario;
    const result = await cicloModel.listarRelatiro(id_usuario);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao listar relatórios");
  }
};

exports.abrir = async (req, res) => {
  try {
    const { id_ciclo } = req.params;
    const result = await cicloModel.abrir(id_ciclo);
    res.send(result);
  } catch (error) {
    console.error(error);
    res.status(500).send("Erro ao abrir ciclo");
  }
};

//deletar relatório
exports.deletarRelatorio = async(req,res)=>{
   try {
    const { id_relatorio, id_ciclo } = req.params;

    // deletar relatório
   const result = await cicloModel.deleteRelatorio(id_relatorio);

    // verificar se ainda existem relatórios nesse ciclo
    const verificar = await cicloModel.conferir(id_ciclo);


    // se não existir mais, destrava o ciclo
    if (verificar == 0) {
      const result = await cicloModel.abrir(id_ciclo);
    }

    res.json({ message: "Relatório removido com sucesso" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Erro ao remover relatório" });
  }
}