import tabela2024 from "./tabela.js";
import express from "express";
import { modeloTime, modeloAtualizacaoTime } from "./validacao.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send(tabela2024);
});

//--------------------→ MÉTODO GET ←----------------------------------------
//Função de solicitar ou requisitar algum recurso ao servidor.

app.get("/:sigla", (req, res) => {
  const siglaInformada = req.params.sigla.toUpperCase();
  const time = tabela2024.find((infoTime) => infoTime.sigla === siglaInformada);
  if (!time) {
    res
      .status(404)
      .send(
        "Não existe na série A do Brasileirão o time com a sigla informada!"
      );
    return;
  }
  res.status(200).send(time);
});

//--------------------→ MÉTODO PUT ←----------------------------------------
//É responsável por editar arquivos e informações já existentes.

app.put("/:sigla", (req, res) => {
  const siglaInformada = req.params.sigla.toUpperCase();
  const timeSelecionado = tabela2024.find((t) => t.sigla === siglaInformada);
  if (!timeSelecionado) {
    res
      .status(404)
      .send(
        "Não existe na série A do Brasileirão o time com a sigla informada!"
      );
    return;
  }

  const { error } = modeloAtualizacaoTime.validate(req.body);
  if (error) {
    res.status(400).send(error);
    return;
  }
  const campos = Object.keys(req.body);
  for (let campo of campos) {
    timeSelecionado[campo] = req.body[campo];
  }
  res.status(200).send(timeSelecionado);
});

//--------------------→ MÉTODO POST ←----------------------------------------
//É utilizado para enviar informações ao servidor.

app.post("/", (req, res) => {
  const novoTime = req.body;
  const { error } = modeloTime.validate(novoTime);
  if (error) {
    res.status(400).send(error);
    return;
  }
  tabela2024.push(novoTime);
  res.status(201).send(novoTime);
});

//--------------------→ MÉTODO DELETE ←--------------------------------------
//Deleta arquivos ou informações presentes no banco de dados.

app.delete("/:sigla", (req, res) => {
  const siglaInformada = req.params.sigla.toUpperCase();
  const indiceTimeSelecionado = tabela2024.findIndex(
    (t) => t.sigla === siglaInformada
  );
  if (indiceTimeSelecionado === -1) {
    res
      .status(404)
      .send(
        "Não existe na série A do Brasileirão o time com a sigla informada!"
      );
    return;
  }
  const timeRemovido = tabela2024.splice(indiceTimeSelecionado, 1);
  res.status(200).send(timeRemovido);
});

app.listen(3000, () => console.log("Servidor rodando com sucesso!!!"));
