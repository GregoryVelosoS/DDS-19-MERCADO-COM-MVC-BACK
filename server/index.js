import express from "express";
import cors from "cors";

import usuarioRoute from './routes/usuarioRoute.js';
import produtoRoute from './routes/produtoRoute.js';
import categoriaRoute from './routes/categoriaRoute.js';

const app = express();
const port = 5000;

// Middlewares
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/", usuarioRoute);
app.use("/", produtoRoute);
app.use("/", categoriaRoute);

//Rota/middleware para pasta de imagens
app.use("/imagens", express.static("public/imagens"))

app.get("/", (req, res) => {
  res.status(200).send("");
});

// Iniciar servidor
app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});
