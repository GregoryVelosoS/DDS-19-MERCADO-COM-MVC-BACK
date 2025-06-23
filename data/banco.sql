CREATE DATABASE mercado;

USE mercado;
CREATE TABLE usuarios(
    id_usu INT AUTO_INCREMENT PRIMARY KEY,
    nome_usu VARCHAR(50),
    email_usu VARCHAR(50),
    senha_usu VARCHAR(50),
    tipo_usu enum('Administrador', 'Gerente', 'Funcionario')
);
CREATE TABLE produtos(
    id_prod INT AUTO_INCREMENT PRIMARY KEY,
    nome_prod VARCHAR(50),
    descricao_prod VARCHAR(100),
    categoria_prod INT,
    preco_prod DECIMAL(6,2),
    imagem_prod VARCHAR(100),
    FOREIGN KEY (categoria_prod) REFERENCES categorias(id_cat)
 );

 CREATE TABLE categorias(
    id_cat INT AUTO_INCREMENT PRIMARY KEY, 
    nome_cat VARCHAR(50)
 )

 CREATE VIEW prod_cat AS
 SELECT *
 FROM produtos as p
 JOIN categorias as c
 ON p.categoria_prod = c.id_cat;

INSERT INTO usuarios (nome_usu, email_usu, senha_usu, tipo_usu) VALUES
('Gregory', 'gregory@gmail.com', '7', 'Administrador'),
('Cristiano', 'cristiano@gmail.com', '7', 'Gerente'),
('Neymar', 'neymar@gmail.com', '10', 'Funcionario'),
('Calleri', 'calleri@gmail.com', '9', 'Funcionario'),
('Goku', 'goku@gmail.com', '1', 'Gerente');

-- Inserção de dados na tabela categorias
INSERT INTO categorias (nome_cat) VALUES
('Alimentos'),
('Bebidas'),
('Higiene'),
('Limpeza'),
('Eletrônicos'),
('Vestuário'),
('Papelaria'),
('Brinquedos'),
('Utilidades Domésticas'),
('Esportes');

-- Inserção de dados na tabela produtos
INSERT INTO produtos (nome_prod, descricao_prod, categoria_prod, preco_prod, imagem_prod) VALUES
('Arroz 5kg', 'Arroz branco tipo 1', 1, 25.90, 'arroz.jpg'),
('Feijão 1kg', 'Feijão carioca', 1, 8.50, 'feijao.jpg'),
('Refrigerante 2L', 'Refrigerante cola', 2, 6.99, 'refrigerante.jpg'),
('Cerveja Lata', 'Cerveja Pilsen 350ml', 2, 3.49, 'cerveja.jpg'),
('Sabonete', 'Sabonete neutro 90g', 3, 2.99, 'sabonete.jpg'),
('Shampoo', 'Shampoo para cabelos secos', 3, 15.90, 'shampoo.jpg'),
('Detergente', 'Detergente neutro 500ml', 4, 3.10, 'detergente.jpg'),
('Desinfetante', 'Desinfetante floral 1L', 4, 5.99, 'desinfetante.jpg'),
('Celular XYZ', 'Smartphone com 128GB', 5, 1299.00, 'celular.jpg'),
('Fone Bluetooth', 'Fone sem fio com estojo', 5, 199.90, 'fone.jpg'),
('Camiseta', 'Camiseta algodão tamanho M', 6, 39.90, 'camiseta.jpg'),
('Calça Jeans', 'Calça masculina tamanho 42', 6, 89.90, 'calca.jpg'),
('Caderno', 'Caderno universitário 200 folhas', 7, 18.99, 'caderno.jpg'),
('Caneta', 'Caneta esferográfica azul', 7, 1.50, 'caneta.jpg'),
('Boneca', 'Boneca com roupas extras', 8, 79.99, 'boneca.jpg'),
('Carrinho', 'Carrinho de brinquedo metálico', 8, 45.00, 'carrinho.jpg'),
('Pano de prato', 'Pano estampado 3 unidades', 9, 12.50, 'pano.jpg'),
('Vassoura', 'Vassoura multiuso', 9, 17.90, 'vassoura.jpg'),
('Bola de Futebol', 'Bola oficial campo', 10, 119.00, 'bola.jpg'),
('Raquete de Tênis', 'Raquete leve em alumínio', 10, 229.90, 'raquete.jpg');