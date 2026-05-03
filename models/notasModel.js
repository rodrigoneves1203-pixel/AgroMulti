const db = require("../db");
// criar nota
exports.insertNota = async(id_usuario, titulo, texto)=>{

     const result = await db.query(
      "INSERT INTO notas (id_usuario, titulo, texto) VALUES ($1, $2, $3) RETURNING *",
      [id_usuario, titulo, texto]
    );
    return result.rows[0];
}
//listar
exports.selectNotas = async(id_usuario)=>{
       const result = await db.query(
      "SELECT * FROM notas WHERE id_usuario=$1 ORDER BY id_nota DESC",
      [id_usuario]
    );
    return result.rows;
}
//editar
exports.updateNotas = async(titulo, texto, id_nota)=>{
  const result = await  db.query(
      "UPDATE notas SET titulo=$1, texto=$2 WHERE id_nota=$3",
      [titulo, texto, id_nota]
    );
    return result.rows[0];
}
//deletar
exports.deleteNotas = async(id)=>{
    const result = await db.query(
      "DELETE FROM notas WHERE id_nota=$1",
      [id]
    );
    return result.rows;
}