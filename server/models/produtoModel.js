import conn from "../config/conexao.js"; // Importa a conexão do banco de dados

export const inserirProduto = (produto, callback) => {
  const sql = `
    INSERT INTO produtos (nome_prod, descricao_prod, categoria_prod, preco_prod, imagem_prod)
    VALUES (?, ?, ?, ?, ?)
  `;
  const valores = [
    produto.nome,
    produto.descricao,
    produto.categoria,
    produto.preco,
    produto.imagem,
  ];
  conn.query(sql, valores, callback);
};

export const buscarProdutos = (callback) => {
  const sql = `SELECT * FROM prod_cat`; // View ou join
  conn.query(sql, callback);
};

export const buscarProdutoPorId = (id, callback) => {
  const sql = `SELECT * FROM produtos WHERE id_prod = ?`;
  conn.query(sql, [id], callback);
};

export const atualizarProduto = (id, produto, callback) => {
  const sql = `
    UPDATE produtos
    SET nome_prod = ?, descricao_prod = ?, categoria_prod = ?, preco_prod = ?, imagem_prod = ?
    WHERE id_prod = ?
  `;
  const valores = [
    produto.nome,
    produto.descricao,
    produto.categoria,
    produto.preco,
    produto.imagem,
    id,
  ];
  conn.query(sql, valores, callback);
};

export const deletarProduto = (id, callback) => {
  const sql = `DELETE FROM produtos WHERE id_prod = ?`;
  conn.query(sql, [id], callback);
};
