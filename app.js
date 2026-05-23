const express = require("express");
const app = express();

let dados = [];

app.get("/sensor", (req, res) => {
  const { temp, hum } = req.query;

  if (!temp || !hum) { // ← bug corrigido
    return res.status(400).send("Dados inválidos");
  }

  const leitura = {
    temperatura: parseFloat(temp),
    umidade: parseFloat(hum),
    data: new Date()
  };

  dados.push(leitura);
  console.log("[NOVO DADO]", leitura);

  res.send("OK");
});

app.get("/dados", (req, res) => {
  res.json(dados);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});