import conn from "../config/conexao.js"; // Importa a conexão do banco de dados

export const buscarUsuarios = (callback) => {
  const sql = `SELECT * FROM usuarios`;
  conn.query(sql, callback);
};

export const inserirUsuario = (usuario, callback) => {
  const sql = `
    INSERT INTO usuarios (nome_usu, email_usu, senha_usu, tipo_usu, imagem_usu)
    VALUES (?,?,?,?,?)
  `;
  const valores = [
    usuario.nome,
    usuario.email,
    usuario.senha,
    usuario.tipo,
    usuario.imagem,
  ];
  conn.query(sql, valores, callback);
};

export const buscarUsuarioPorId = (id, callback) => {
  const sql = `SELECT * FROM usuarios WHERE id_usu = ?`;
  conn.query(sql, [id], callback)
};

export const atualizarUsuario = (id, usuario, callback) =>{
  const sql = `
  UPDATE usuarios
  SET nome_usu = ?, email_usu = ?, senha_usu = ?, tipo_usu = ?, imagem_usu = ?
  WHERE id_usu = ?`
    const valores = [
    usuario.nome,
    usuario.email,
    usuario.senha,
    usuario.tipo,
    usuario.imagem,
    id
  ];
  conn.query(sql, valores, callback);
}