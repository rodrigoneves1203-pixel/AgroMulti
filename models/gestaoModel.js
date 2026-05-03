const db = require("../db");

// gasto

//adicionar 
exports.adicionarGasto = async(id_ciclo, descricao_gasto, valor, data_inicio, nome_gasto)=>{

    const result = await db.query("INSERT INTO gastos (id_ciclo, descricao_gasto, valor, data_inicio, nome_gasto) VALUES ($1, $2, $3, $4, $5)",
    [id_ciclo, descricao_gasto, valor, data_inicio, nome_gasto]);

    return result.rows[0];
}
exports.gastosLista = async(id_ciclo)=>{

    const result = await db.query("SELECT * FROM gastos WHERE id_ciclo = $1",
        [id_ciclo]
    );

    return result.rows;
}
//deletar gasto
exports.deleteGasto = async(id)=>{

    const result = await db.query("DELETE FROM gastos WHERE id_gastos = $1", [id]);
    return result.rows[0];

}
//atualizar gasto
exports.atualizarGasto = async(novo_valor, id_gastos,query)=>{
    const result = await db.query(query, [novo_valor, id_gastos]);
    return result.rows[0];
}

// ganho
exports.adicionarGanho = async (id_ciclo, quantidade, valor_receita, data_venda, nome_produto, descricao_venda)=>{

    const result =  await db.query("INSERT INTO receita (id_ciclo, quantidade, valor_receita, data_venda, nome_produto, descricao_venda) VALUES ($1, $2, $3, $4, $5, $6)",
    [id_ciclo, quantidade, valor_receita, data_venda, nome_produto, descricao_venda]);

    return result.rows[0];
}
exports.listarGanho = async(id)=>{
    const result = await db.query("SELECT * FROM receita WHERE id_ciclo = $1",[id]);
    return result.rows;
}
//atualizar ganho
exports.atualizarGanho = async(novo_valor, id_receita,query)=>{
    const result = await db.query(query, [novo_valor, id_receita]);
    return result.rows[0];
}
//deletar
exports.deleteGanho = async(id)=>{
  const result = await db.query("DELETE FROM receita WHERE id_receita = $1", [id]);
  return result.rows[0];
}
