// Importa a url da api do aquivo .env
const url = import.meta.env.VITE_API_URL;

// Importando os hooks pra controar o states e useEffect
import { useState, useEffect } from "react";

// Importa o hook de usar um contexto
import { useContext } from "react";

// Importa o contexto de usuário
import { AuthContext } from "../contexts/UserContext";

// Cria o hook para fazer login, enviandos os dados de usuario e senha pra api
// e verificando se o usuario existe na lista de usuarios
export function useVerificaLogin() {
  // importa a funcao de login do contexto
  const { login } = useContext(AuthContext);

  // state para armazenar a lista de usuarios
  const [usuarios, setUsuarios] = useState([]);

  // use effect pra puxar os dados da api, assim que o componente é montado
  useEffect(() => {
    // Função pra buscar os dados da API
    async function fetchData() {
      try {
        const req = await fetch(`${url}/usuarios`);
        const users = await req.json();
        setUsuarios(users);
      } catch (erro) {
        console.log(erro.message);
      }
    }
    fetchData();
  }, []);

  // funcao pra verificar se o usuário existe na lista que puxou da api
  const verificaLogin = (data) => {
    // Verifica se há um usuário com aquele email passado em data na lista que puxou da api
    const userToFind = usuarios.find((user) => {
      // mudei aqui
      return user.email_usu === data.email;
    });

    // Se o usuário existe, verifica se a senha está correta
    // mudei aqui
    if (userToFind != undefined && userToFind.senha_usu == data.senha) {
      login(userToFind);
      console.log("Usuário logado:", userToFind.nome);
      return "Login efetuado com sucesso";
    }
    // Caso não exista ou a senha esteja errada, retorna uma mensagem de erro
    else {
      return "Usuário ou senha inválidos";
    }
  };
  // Retorna a função de verificar login
  return { verificaLogin };
}

// Cria o hook para inserir um usuario
export function useInserirUsuario() {
  // Recebe os dados do produto e faz a requisição para a API
  // com o método POST
  const inserirUsuario = async (formData) => {
    // atualizei aqui
    const req = await fetch(`${url}/usuarios`, {
      method: "POST",
      body: formData,
    });
    const res = await req.json();
    console.log("Usuario registrado");
    // Retorna o produto inserido
    return res;
  };

  return { inserirUsuario };
}

// Cria o hook para bucar um usuario por id
export function useBuscarUsuarioPorId() {
  // Receb o id do produto e faz a requisição para a api
  // com o método GET
  const buscarUsuarioPorId = async (idUsuario) => {
    console.log(idUsuario);
    
    const req = await fetch(`${url}/usuarios/${idUsuario}`);
    const res = await req.json();
    console.log("Usuario encontrado:");
    return res;
  };
  return { buscarUsuarioPorId };
}

// Cria o hook para atualizar um usuario
export function useAtualizaUsuario() {
  // Envia os dados do usuario recebido via data, para o usuario específico que recebeu via id usuario,
  // e faz a requisição para a ai, com o método PUT
  const atualizaUsuario = async (formData, idUsuario) => {
    const req = await fetch(`${url}/usuarios/${idUsuario}`, {
      method: "PUT",
      body: formData,
    });
    const res = await req.json();
    console.log("Atualizado atualizado");
    // Retorna o produto atualizado
    return res;
  };
  return { atualizaUsuario };
}


// Cria o hook para excluir um produto
export function useDeletaUsuario() {
  // Recebe o id do usuario a ser deletado e faz a requisição para a Api
  // com o método DELETE
  const deletarUsuario = async (idUsuario) => {
    // mudei aqui
    const req = await fetch(`${url}/produtos/${idUsuario}`, {
      method: "DELETE",
    });
    const res = await req.json();
    // Retorna o usuario deletado
    return res;
  };
  return { deletarUsuario };
}

