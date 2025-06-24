import {
  buscarUsuarios,
  inserirUsuario,
  buscarUsuarioPorId,
  atualizarUsuario,
} from "../models/usuarioModel.js";

export const listarUsuarios = (req, res) => {
  buscarUsuarios((erro, resultado) => {
    if (erro) {
      res.status(500).json({ erro: erro.sqlMessage });
    } else {
      res.status(200).json(resultado);
    }
  });
};
export const criarUsuario = (req, res) => {
  const usuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    tipo: req.body.tipo,
    imagem: req.file ? req.file.filename : null,
  };

  inserirUsuario(usuario, (erro) => {
    if (erro) {
      res.status(500).json(erro.sqlMessage);
    } else {
      res.status(200).json("Usuário Cadastrado");
    }
  });
};

export const listarUsuarioPorId = (req, res) => {
  const { id } = req.params.id;
  buscarUsuarioPorId(id, (erro, resultdo) => {
    if (erro) {
      res.status(500).json(erro.sqlMessage);
    } else {
      res.status(200).json(resultado);
    }
  });
};

export const editarUsuario = (req, res) => {
  const { id } = req.params.id;

  const usuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    tipo: req.body.tipo,
    imagem: req.file ? req.file.filename : null,
  };

  atualizarUsuario(id, usuario, (erro) => {
    if (erro) {
      res.status(500).json(erro.sqlMessage);
    } else {
      res.status(200).json("Usuário Editado");
    }
  });
};
