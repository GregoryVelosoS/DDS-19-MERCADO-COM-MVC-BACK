import express from 'express';

import {
  criarUsuario,
  listarUsuarios,
  listarUsuarioPorId,
  editarUsuario,
  excluirUsuario
} from '../controllers/usuarioController.js';

const router = express.Router();

import { upload } from "../config/multer.js";

// Rotas
router.post('/usuarios', upload.single('imagem'), criarUsuario);
router.get('/usuarios', listarUsuarios);
router.get('/usuarios/:id', listarUsuarioPorId);
router.put('/usuarios/:id', upload.single('imagem'), editarUsuario);
router.delete('/usuarios/:id', excluirUsuario);

export default router;
