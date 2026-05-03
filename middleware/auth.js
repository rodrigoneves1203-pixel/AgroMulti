const jwt = require("jsonwebtoken");

function verificarToken(req,res,next){

 const token = req.headers.authorization;

 if(!token){
   return res.status(401).json({erro:"Token não enviado"});
 }

 try{

   const tokenLimpo = token.split(" ")[1];

   const decoded = jwt.verify(tokenLimpo, process.env.JWT_SECRET);

   req.usuario = decoded;

   next();

 }catch(err){
   return res.status(401).json({erro:"Token inválido"});
 }

}

module.exports = verificarToken;