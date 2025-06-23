// importação do card para exibição dos produtos
import CardProduto from "../components/CardProduto";

// importacao do hook para buscar os produtos
import { useListaProdutos } from "../hooks/useApi";

// Importa o hook de usar um contexto
import { useContext } from "react";
// Importa o contexto de usuário
import { AuthContext } from "../contexts/UserContext";

// Importacao do navigate para redirecionar os usuarios
import { Navigate } from "react-router-dom";

const Home = () => {
  // variavel para armazenar os produtos, que veio do hook
  const produtos = useListaProdutos();

  // variavel que armazena o nome do usuario, que veio do contexto
  const { usuarioNome } = useContext(AuthContext);
  // Verifica se o usuario é visitante, se sim redireciona ele para a tela de login
  if (usuarioNome === "Visitante") return <Navigate to="/" />;

  return (
    <div>
      <div>
        <h1>Lista</h1>
        <div className="d-flex col-12 gap-2 mt-3 justify-content-between flex-wrap">
          {/* Card com informações fixas */}
          <CardProduto
            id="1"
            nome="Shampoo Cr7"
            descricao="Melhor shampoo do mundo"
            preco="7,77"
            categoria="Saúde e beleza"
            imagemUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAiGeCC3KhBPz8xa_dcPdPor2D__CuueBzeA&s"
          />

          {/* Card com informações variáveis */}
          {produtos.map((prod) => (
            // Mudou aqui
            <CardProduto
              key={prod.id_prod}
              id={prod.id_prod}
              nome={prod.nome_prod}
              descricao={prod.descricao_prod}
              preco={prod.preco_prod}
              categoria={prod.nome_cat}
              imagemUrl={prod.imagem_prod}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
