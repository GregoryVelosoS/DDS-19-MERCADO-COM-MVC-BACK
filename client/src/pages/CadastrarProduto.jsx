// importando components do bootstrap
import Container from "react-bootstrap/Container";

// Importa o hook de usar um contexto
import { useContext } from "react";
// Importa o contexto de usuário
import { AuthContext } from "../contexts/UserContext";

//Importação do navigate pra transitar entre páginas
import { Navigate } from "react-router-dom";

// Importando o componente de formulário
import Formulario from "../components/Formulario";

const CadastrarProduto = () => {
  // variavel que armazena o nome do usuario, que veio do contexto
  const { usuarioNome } = useContext(AuthContext);
  // Verifica se o usuario é visitante, se sim redireciona ele para a tela de login
  if (usuarioNome === "Visitante") return <Navigate to="/" />;

  return (
    <div style={{ height: "93vh" }}>
      <Container>
        <h1>Cadastrar Produto</h1>
        <Formulario page="cadastro" />
      </Container>
    </div>
  );
};

export default CadastrarProduto;
