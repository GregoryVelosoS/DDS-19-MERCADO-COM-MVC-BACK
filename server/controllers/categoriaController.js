import { buscarCategorias } from "../models/categoriaModel.js";

export const listarCategorias = (req, res) => {
  buscarCategorias((erro, dados) => {
    if (erro) {
      res.status(500).json({ erro: erro.sqlMessage });
    } else {
      res.status(200).json(dados);
    }
  });
};
