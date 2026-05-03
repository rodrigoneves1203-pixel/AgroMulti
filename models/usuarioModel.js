const db = require('../db');

// buscar email
exports.buscarPorEmail = async (email) => {
  const result = await db.query(
    "SELECT * FROM usuario WHERE email=$1",
    [email]
  );

  return result.rows[0];
};
// encontrar usuario
exports.acharUsuario = async (id)=>{
  const result = await db.query(
      "SELECT nome, email FROM usuario WHERE id_usuario = $1",
      [id]
    );
    return result.rows[0];
}

// criar usurio para cadastro
exports.criar = async (nome, email, senhaHash, token) => {
 const result =  await db.query(
    "INSERT INTO usuario (nome,email,senha,email_confirmado,token_confirmacao) VALUES ($1,$2,$3,false,$4)",
    [nome, email, senhaHash, token]
  );

  return result.rows[0];
};

// procurar por token
exports.buscarToken = async (token) =>{
const result =  await db.query(
    "SELECT * FROM usuario WHERE token_confirmacao=$1",
     [token]
    );
      return result.rowCount;
}

// limpar token
exports.limpar = async (token)=>{
    await db.query(
        "UPDATE usuario SET email_confirmado=true, token_confirmacao=NULL WHERE token_confirmacao=$1", 
        [token]
    );
}

// comfirmar
exports.comfirmarEmail = async(token)=>{
 const result = await db.query("UPDATE usuario SET email_confirmado=true, token_confirmacao=NULL WHERE token_confirmacao=$1", [token]);
return result.rows[0]
}
//alterar senha
exports.alterarSenha = async(senhaHash, email)=>{
  const result = await db.query("UPDATE usuario SET senha=$1 WHERE email=$2",
    [senhaHash, email]);
    return result.rowCount;

}
//token recuperação
exports.tokenRecuperaçao = async(token, expira, email) =>{
  const result = await await db.query(
      "UPDATE usuario SET token_recuperacao=$1, token_expira=$2 WHERE email=$3",
      [token, expira, email]
    );
    return result.rows[0];
}

//pegar usuario recuperação

exports.pegarRecuperacao = async(token)=>{
 const result = await db.query(
      "SELECT * FROM usuario WHERE token_recuperacao=$1 AND token_expira > NOW()",
      [token]
    );
    return result.rows[0];
}
// atualizar senha
exports.atualizarSenha = async(senhaHash, token)=>{
 const result = await db.query(
"UPDATE usuario SET senha=$1, token_recuperacao=NULL, token_expira=NULL WHERE token_recuperacao=$2",
[senhaHash, token]
);
return result.rows[0];
}
//atualizar dados usuario
exports.atualizarDadosNoBanco=async(nome, senhaHash, id)=>{
  const result = await db.query(
        "UPDATE usuario SET nome=$1, senha=$2 WHERE id_usuario=$3 RETURNING *",
        [nome, senhaHash, id]);
        return result.rows[0];
}
//atualizar nome 
exports.atualizarNome = async(nome, id)=>{
  const  result = await db.query(
        "UPDATE usuario SET nome=$1 WHERE id_usuario=$2 RETURNING *",
        [nome, id]
      );
      return result.rows[0];
}
//deletar user
exports.deleteUser = async(id)=>{
      const result = await db.query(
      "DELETE FROM usuario WHERE id_usuario = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
}