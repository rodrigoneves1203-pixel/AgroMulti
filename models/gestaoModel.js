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
//pegar gasto
exports.pegargasto = (id)=>{
    const result = await db.query("SELECT * FROM gastos WHERE id_gastos =$1", [id]);
    return result.rows[0];
}
//deletar gasto
exports.deleteGasto = async(id)=>{

    const result = await db.query("DELETE FROM gastos WHERE id_gastos = $1", [id]);
    return result.rows[0];

}
//atualizar gasto
exports.atualizarGasto = async(valor,data,descricao,nome, id_gastos)=>{
    const result = await db.query("UPDATE gastos SET valor=$1, data=$2, descricao=$3, nome=$4 WHERE id_gastos=$5 RETURNING *", [valor,data,descricao,nome, id_gastos]);
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
//pegar ganho
exports.pegarganho= async(id)=>{
   const result = await db.query("SELECT * FROM receita WHERE id_receita = $1",[id]);
   return result.rows[0];
}


//atualizar ganho
exports.atualizarGanho = async(data,valor,quantidade,descricao,nome,id_receita)=>{
    const result = await db.query("UPDATE receita SET data=$1, valor=$2, quantidade=$3, descricao=$4, nome=$5 WHERE id_receita = $6 RETURNING *", [data,valor,quantidade,descricao,nome,id_receita]);
    return result.rows[0];
}
//deletar
exports.deleteGanho = async(id)=>{
  const result = await db.query("DELETE FROM receita WHERE id_receita = $1", [id]);
  return result.rows[0];
}
