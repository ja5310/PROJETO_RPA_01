import express from "express";

const app = express(); // Primeiro cria o app

app.use(express.json());

const user = [];

app.get("/usuarios", (req, res) => {
  res.status(200).json(user);
});

app.post("/usuarios", (req, res) => {
  user.push(req.body);
  res.status(201).json({ message: "Criado!" });
});

app.listen(5500, () => console.log("Servidor rodando na porta 5500"));
