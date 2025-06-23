import multer from "multer";
import path from "path";

// Configuração de armazenamento
const storage = multer.diskStorage({
  // Define onde e como os arquivos serão armazenados
  destination: 'public/imagens',
  filename: (req, file, callback) => {
    // Cria um nome único para o arquivo
    callback(null, Date.now() + "-" + path.basename(file.originalname)); // Nome do arquivo no servidor
  },
});

// Instância do multer
export const upload = multer({ storage: storage });
