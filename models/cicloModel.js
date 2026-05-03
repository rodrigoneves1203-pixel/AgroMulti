const db = require("../db");

//buscar
exports.buscar = async () =>{

    const result = await db.query('SELECT * FROM ciclo');
  return result.rows;

}
//encontrar usuario
  exports.buscarUsuario = async(id)=>{  
    const result = await db.query(
    "SELECT nome, email FROM usuario WHERE id_usuario = $1",
    [id]
    );
    return result.rows;
  }

//ciclos
exports.listarCiclos = async(id) =>{
const result = await db.query("SELECT * FROM ciclo WHERE id_usuario = $1", [id]);

    return result.rows;
    
}

// ciclo adicionar
exports.criarCiclo = async (id_usuario,nome_ciclo,data_inicio,tipo,imagem)=>{

 const result= await db.query("INSERT INTO ciclo (id_usuario, nome_ciclo, data_inicio, tipo, imagem) VALUES ($1, $2, $3, $4,$5)",
    [id_usuario, nome_ciclo, data_inicio, tipo,imagem]);

   return result.rows[0];
 }

// ciclo deletar 
 exports.deletarCiclo = async(id)=>{
  const result = await db.query(
    "DELETE FROM ciclo WHERE id_ciclo = $1",[id]);
  return result.rows[0];
 }

 //soma gasto
 exports.somaGasto = async(id)=>{
  const soma_gasto = await db.query(
      "SELECT SUM(valor) AS total FROM gastos WHERE id_ciclo = $1",
      [id]);
      return soma_gasto.rows[0];
 }
 //soma ganho
 exports.somaGanho = async(id)=>{
  const soma_receita = await db.query(
      "SELECT SUM(valor_receita) AS total FROM receita WHERE id_ciclo = $1",
      [id]
    );
    return soma_receita.rows[0];
 }
//fechar
 exports.fechar = async(id)=>{
     const resut = await db.query(
      "UPDATE ciclo SET trancado = TRUE WHERE id_ciclo = $1 RETURNING *",
      [id]
    );
    return resut.rows[0];
 }
 //verificar
 exports.verificarRelatorio = async(id)=>{
      const verificar = await db.query(
      "SELECT * FROM relatorio WHERE id_ciclo = $1",
      [id]
    );
    return verificar.rowCount;
 }
 //atualizar
 exports.atualizar = async (nome_relatorio, id_ciclo, total_gasto, total_venda, lucro)=>{
       const  result = await db.query(
        `UPDATE relatorio
         SET nome_relatorio = $1,
             total_gasto = $3,
             total_venda = $4,
             lucro = $5
         WHERE id_ciclo = $2
         RETURNING *`,
        [nome_relatorio, id_ciclo, total_gasto, total_venda, lucro]
      );
return result.rows[0]
 }
 //inserir relatório
 exports.inserir = async(id_ciclo, id_usuario, total_gasto, total_venda, lucro, nome_relatorio)=>{
 const result = await db.query(
        `INSERT INTO relatorio 
        (id_ciclo, id_usuario, total_gasto, total_venda, lucro, nome_relatorio)
        VALUES ($1,$2,$3,$4,$5,$6)
        RETURNING *`,
        [id_ciclo, id_usuario, total_gasto, total_venda, lucro, nome_relatorio]
      );
      return result.rows[0]
 }

 //relatorio lista
 exports.listarRelatiro = async(id)=>{
    const result= await db.query("SELECT * FROM relatorio WHERE id_usuario = $1 ORDER BY id_ciclo DESC", 
    [id]
  )
  return result.rows;
 }

 // abrir ciclo
 exports.abrir = async(id_ciclo)=>{
  
  const result =  await db.query(
        "UPDATE ciclo SET trancado = FALSE WHERE id_ciclo = $1",
        [id_ciclo]
    )
    
    return result.rows[0];
 }
 //deletar relatório
 exports.deleteRelatorio = async(id)=>{
    const result = await db.query(
      "DELETE FROM relatorio WHERE id_relatorio = $1",
      [id]
    );
    return result.rows[0];
 }
 //coferir ciclo
 exports.conferir = async(id_ciclo)=>{
    const verificar = await db.query(
      "SELECT * FROM relatorio WHERE id_ciclo = $1",
      [id_ciclo]
    );
    return verificar.rowCount;
 }