import {
  inserirUsuario,
  buscarUsuarios,
  buscarUsuarioPorId,
  atualizarUsuario,
  deletarUsuario
} from '../models/usuarioModel.js';

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
      res.status(500).json({ erro: erro.sqlMessage });
    } else {
      res.status(201).json({ mensagem: "Usuário cadastrado com sucesso" });
    }
  });
};

export const listarUsuarios = (req, res) => {
  buscarUsuarios((erro, resultado) => {
    if (erro) {
      res.status(500).json({ erro: erro.sqlMessage });
    } else {
      res.status(200).json(resultado);
    }
  });
};

export const listarUsuarioPorId = (req, res) => {
  const { id } = req.params;
  buscarUsuarioPorId(id, (erro, resultado) => {
    if (erro) {
      res.status(500).json({ erro: erro.sqlMessage });
    } else {
      res.status(200).json(resultado);
    }
  });
};

export const editarUsuario = (req, res) => {
  const { id } = req.params;
  const usuario = {
    nome: req.body.nome,
    email: req.body.email,
    senha: req.body.senha,
    tipo: req.body.tipo,
    imagem: req.file ? req.file.filename : null,
  };

  atualizarUsuario(id, usuario, (erro) => {
    if (erro) {
      res.status(500).json({ erro: erro.sqlMessage });
    } else {
      res.status(200).json({ mensagem: "Usuário atualizado com sucesso" });
    }
  });
};

export const excluirUsuario = (req, res) => {
  const { id } = req.params;
  deletarUsuario(id, (erro) => {
    if (erro) {
      res.status(500).json({ erro: erro.sqlMessage });
    } else {
      res.status(200).json({ mensagem: "Usuário excluído com sucesso" });
    }
  });
};
