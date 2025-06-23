import conn from "../config/conexao.js"; // Importa a conexão do banco de dados

export const buscarCategorias = (callback) => {
  const sql = `SELECT * FROM categorias`;
  conn.query(sql, callback);
};
