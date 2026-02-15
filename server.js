import express from "express";
import pool from "./db.js";
import bcrypt from "bcrypt";

const app = express();

app.use(express.json());

app.get("/usuarios", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM usuarios");
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send("Erro ao buscar usuários");
  }
});

app.listen(5500, () => {
  console.log("Servidor rodando na porta 5500");
});

/* ============================
   CRIAR USUÁRIO
============================ */
app.post("/usuarios", async (req, res) => {
  const {
    perfil,
    nome,
    social_name,
    senha,
    nascimento,
    documento,
    telefone,
    email,
    termos_aceitos,
  } = req.body;

  try {
    // 🔐 criptografa senha
    const senhaCriptografada = await bcrypt.hash(senha, 10);

    const result = await pool.query(
      `INSERT INTO usuarios 
      (perfil, nome, social_name, senha, nascimento, documento, telefone, email, termos_aceitos)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING *`,
      [
        perfil,
        nome,
        social_name,
        senhaCriptografada,
        nascimento,
        documento,
        telefone,
        email,
        termos_aceitos,
      ],
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error(err);

    if (err.code === "23505") {
      return res.status(400).json({
        error: "Email ou documento já cadastrado",
      });
    }

    res.status(500).send("Erro ao criar usuário");
  }
});
