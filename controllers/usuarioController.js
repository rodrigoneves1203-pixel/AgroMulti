const usuarioModel = require('../models/usuarioModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const BASE_URL = "https://agromulti.onrender.com";
const { Resend } = require("resend");
const resend = new Resend(process.env.RESEND_API_KEY);
// login
exports.login = async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await usuarioModel.buscarPorEmail(email);

    if (!usuario) {
      return res.json({ erro: "Email ou senha incorretos" });
    }

    const senhaCorreta = await bcrypt.compare(senha, usuario.senha);

    if (!senhaCorreta) {
      return res.json({ erro: "Email ou senha incorretos" });
    }

    if (!usuario.email_confirmado) {
      return res.json({
        erro: "Por favor, confirme seu email antes de fazer login."
      });
    }

    const token = jwt.sign(
      { id_usuario: usuario.id_usuario },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    res.json({
      token,
      id_usuario: usuario.id_usuario,
      nome: usuario.nome
    });

  } catch (erro) {
    console.log(erro);
    res.status(500).json({ erro: "Erro no servidor" });
  }
};
// cadastro
exports.cadastro = async (req, res) => {
  const { nome, email, senha } = req.body;

  try {
    const usuarioExistente = await usuarioModel.buscarPorEmail(email);

    if (usuarioExistente) {
      return res.send(`
        <script>
        alert("Este email já está cadastrado!");
        window.history.back();
        </script>
      `);
    }

    const senhaHash = await bcrypt.hash(senha, 10);
    const tokenConfirmacao = crypto.randomBytes(20).toString("hex");

    await usuarioModel.criar(nome, email, senhaHash, tokenConfirmacao);

    const link = `${BASE_URL}/confirmar-email?token=${tokenConfirmacao}`;

    // ✅ ENVIO COM RESEND
    const response = await resend.emails.send({
      from: process.env.EMAIL_FROM,
      to: email,
      subject: "Confirme seu email",
      html: `
        <h2>AgroMulti 🌱</h2>
        <p>Clique no link para confirmar seu cadastro:</p>
        <a href="${link}">${link}</a>
      `
    });

    console.log("EMAIL ENVIADO:", response);

    res.send(`
      <script>
      alert("Cadastro realizado! Verifique seu email.");
      window.location.href='../html/index.html';
      </script>
    `);

  } catch (erro) {
    console.log("ERRO NO CADASTRO:", erro);
    res.status(500).send("Erro ao cadastrar usuário");
  }
};
// confirmar email
exports.confirmar = async (req, res) => {
  try {
    const token = req.query.token;

    const result = await usuarioModel.buscarToken(token);
    if (result == 0) {
      return res.send("Token inválido");
    }

    await usuarioModel.comfirmarEmail(token);

    res.send(`
      <script>
      alert("Email confirmado com sucesso!");
      window.location.href='/html/index.html';
      </script>
    `);

  } catch (erro) {
    console.log(erro);
    res.status(500).send("Erro ao confirmar email");
  }
};

// alterar senha
exports.alterarSenha = async (req, res) => {
  try {
    const { email, senha } = req.body;

    const senhaHash = await bcrypt.hash(senha, 10);
    const resultado = await usuarioModel.alterarSenha(senhaHash, email);

    if (resultado.rowCount === 0) {
      return res.send(`
        <script>
        alert("Email não encontrado!");
        window.location.href="novasenha.html";
        </script>
      `);
    }

    res.send(`
      <script>
      alert("Senha alterada com sucesso!");
      window.location.href="index.html";
      </script>
    `);

  } catch (erro) {
    console.log(erro);
    res.status(500).send("Erro ao alterar senha");
  }
};

// pedir senha
exports.pedirSenha = async (req, res) => {
  try {
    const { email } = req.body;

    const usuario = await usuarioModel.buscarPorEmail(email);
    if (!usuario) {
      return res.send(`
        <script>
        alert("Email não encontrado");
        window.location.href = "/html/index.html";
        </script>
      `);
    }

    const token = crypto.randomBytes(20).toString("hex");
    const expira = new Date(Date.now() + 3600000);

    await usuarioModel.tokenRecuperaçao(token, expira, email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const link = `${BASE_URL}/html/novasenha.html?token=${token}`;

    await transporter.sendMail({
      from: "AgroMulti",
      to: email,
      subject: "Recuperação de senha",
      html: `<p>Clique no link para redefinir sua senha:</p>
             <a href="${link}">${link}</a>`
    });

    res.send(`
      <script>
      alert("Email enviado com sucesso!");
      window.location.href = "/html/index.html";
      </script>
    `);

  } catch (erro) {
    console.log(erro);
    res.status(500).send("Erro ao solicitar recuperação de senha");
  }
};

// nova senha
exports.novaSenha = async (req, res) => {
  try {
    const { token, senha } = req.body;

    const usuario = await usuarioModel.pegarRecuperacao(token);
    if (!usuario) {
      return res.send("Token inválido ou expirado");
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    await usuarioModel.atualizarSenha(senhaHash, token);

    res.send(`
      <script>
      alert("Senha alterada com sucesso!");
      window.location.href = "/html/index.html";
      </script>
    `);

  } catch (erro) {
    console.log(erro);
    res.status(500).send("Erro ao redefinir senha");
  }
};

// encontrar usuario
exports.encontrarUsuario = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await usuarioModel.acharUsuario(id);

    if (!result) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json(result);

  } catch (erro) {
    console.log(erro);
    res.status(500).send("Erro ao buscar usuário");
  }
};

// atualizar
exports.atualizarDadosUser = async (req, res) => {
  try {
    const id = req.params.id;
    const { nome, senha } = req.body;

    if (!nome) {
      return res.status(400).json({ erro: "Nome é obrigatório" });
    }

    let result;

    if (senha && senha.trim() !== "") {
      const senhaHash = await bcrypt.hash(senha, 10);
      result = await usuarioModel.atualizarDadosNoBanco(nome, senhaHash, id);
    } else {
      result = await usuarioModel.atualizarNome(nome, id);
    }

    if (!result) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ mensagem: "Atualizado com sucesso!" });

  } catch (erro) {
    console.log(erro);
    res.status(500).send("Erro ao atualizar usuário");
  }
};

// deletar user
exports.deletarUser = async (req, res) => {
  try {
    const id = req.params.id;

    const result = await usuarioModel.deleteUser(id);

    if (!result) {
      return res.status(404).json({ erro: "Usuário não encontrado" });
    }

    res.json({ mensagem: "Usuário excluído com sucesso!" });

  } catch (erro) {
    console.log(erro);
    res.status(500).send("Erro ao deletar usuário");
  }
};