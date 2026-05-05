const express = require("express");
const cors = require("cors");
require("dotenv").config();
const rateLimit = require("express-rate-limit");

const app = express();
const MANUTENCAO = true;

if (MANUTENCAO) {
  app.use((req, res) => {
    return res.status(503).send("Sistema em manutenção");
  });
}
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 1000
}));

app.use(cors({
  origin: "*"
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("projeto"));
app.use('/fotos', express.static('fotos'));

// ROTAS
const rota_ciclo = require("./routes/ciclosRoutes");
const rota_usuario = require("./routes/usuarioRoutes");
const rotas_gestao = require("./routes/gestaoRoutes");
const rotas_notas = require("./routes/notasRoutes");

app.use("/", rotas_gestao);
app.use("/", rota_ciclo);
app.use("/", rota_usuario);
app.use("/", rotas_notas);
app.set("trust proxy", 1);
// PORT (IMPORTANTE)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});