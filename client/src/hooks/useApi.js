// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";

// Cria o hook para listar os produtos, puxando os dados da api
export function useListaProdutos() {
  //Lista com produtos
  const [produtos, setProdutos] = useState([]);

  // UseEffect para puxar os dados assim que o componente é montado
  useEffect(() => {
    // Função pra buscar os dados da API
    async function fetchData() {
      try {
        const req = await fetch(`${url}/produtos`);
        const produtos = await req.json();
        setProdutos(produtos);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // Retorna a lista de produtos
  return produtos;
}

// Cria o hook para excluir um produto
export function useDeletaProduto() {
  // Recebe o id do produto a ser deletado e faz a requisição para a Api
  // com o método DELETE
  const deletarProduto = async (idProduto) => {
    // mudei aqui
    const req = await fetch(`${url}/produtos/${idProduto}`, {
      method: "DELETE",
    });
    const res = await req.json();
    // Retorna o produto deletado
    return res;
  };
  return { deletarProduto };
}

// Cria o hook para inserir um produto
export function useInserirProduto() {
  // Recebe os dados do produto e faz a requisição para a API
  // com o método POST
  const inserirProduto = async (data) => {
    const req = await fetch(`${url}/produtos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Produto inserido:", res);
    // Retorna o produto inserido
    return res;
  };

  return { inserirProduto };
}

// Cria o hook para bucar um produto por id
export function useBuscarProdutoPorId() {
  // Receb o id do produto e faz a requisição para a api
  // com o método GET
  const buscarProdutoPorId = async (idProduto) => {
    const req = await fetch(`${url}/produtos/${idProduto}`);
    const res = await req.json();
    console.log("Produto encontrado:", res);
    return res;
  };
  return { buscarProdutoPorId };
}

// Cria o hook para atualizar um produto
export function useAtualizaProduto() {
  // Envia os dados do produtos recebido via data, para o produto específico que recebeu via id produto,
  // e faz a requisição para a ai, com o método PUT
  const atualizaProduto = async (data, idProduto) => {
    const req = await fetch(`${url}/produtos/${idProduto}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await req.json();
    console.log("Produto atualizado:", res);
    // Retorna o produto atualizado
    return res;
  };
  return { atualizaProduto };
}



export function useListaCategorias() {
  //Lista com categorias
  const [categorias, setCategorias] = useState([]);
  //UseEffect pra puxar os dados da api
  useEffect(() => {
    async function fetchData() {
      try {
        const req = await fetch(`${url}/categorias`);
        const cate = await req.json();
        setCategorias(cate);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);
  return categorias;
}
