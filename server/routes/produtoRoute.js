import express from "express";
import multer from "multer";
import {
  criarProduto,
  listarProdutos,
  listarProdutoPorId,
  editarProduto,
  excluirProduto
} from "../controllers/produtoController.js";

const router = express.Router();

// Configuração multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + file.originalname;
    cb(null, uniqueSuffix);
  }
});
const upload = multer({ storage });

// Rotas
router.post("/produtos", upload.single("imagem"), criarProduto);
router.get("/produtos", listarProdutos);
router.get("/produtos/:id", listarProdutoPorId);
router.put("/produtos/:id", upload.single("imagem"), editarProduto);
router.delete("/produtos/:id", excluirProduto);

export default router;
