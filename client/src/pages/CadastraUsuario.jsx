// importando components do bootstrap
import Container from "react-bootstrap/Container";


// Importando o componente de formulário
import FormularioUsuario from "../components/FormularioUsuario";

const CadastraUsuario = () => {

  return (
    <div style={{ height: "93vh" }}>
      <Container>
        <h1>Cadastrar Usuário</h1>
        <FormularioUsuario page="cadastro" />
      </Container>
    </div>
  );
};

export default CadastraUsuario;
