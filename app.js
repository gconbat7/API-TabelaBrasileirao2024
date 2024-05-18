import tabela2024 from "./tabela.js";
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send(tabela2024);
});

app.get("/:sigla", (req, res) => {
  const siglaInformada = req.params.sigla.toUpperCase();
  const time = tabela2024.find((infoTime) => infoTime.sigla === siglaInformada);
  res.send(time);
});

app.listen(3000, () => console.log("Servidor rodando com sucesso!!!"));
