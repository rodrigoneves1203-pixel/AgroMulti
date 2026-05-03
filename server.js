const express = require("express");
const cors = require("cors"); 
require("dotenv").config();
const app = express();
const rateLimit = require("express-rate-limit");

app.use(rateLimit({
 windowMs: 15 * 60 * 1000,
 max: 1000
}));
console.log(process.env.EMAIL_USER)
app.use(cors()); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("projeto"));


const rota_ciclo = require("../Agromulti/routes/ciclosRoutes");
const rota_usuario = require("../Agromulti/routes/usuarioRoutes");
const rotas_gestao = require("../Agromulti/routes/gestaoRoutes");
const rotas_notas = require("../Agromulti/routes/notasRoutes")
app.use("/", rotas_gestao);
app.use("/", rota_ciclo);
app.use("/",rota_usuario);
app.use("/",rotas_notas);
app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});