// importando components do bootstrap
import Button from "react-bootstrap/Button";
//Importação do navigate pra transitar entre páginas
import { useNavigate } from "react-router-dom";

const PaginaErro = () => {
  // Criando o navigate
  const navigate = useNavigate();
  return (
    <div className="text-center">
      <h2> Essa página não existe</h2>
      <Button onClick={() => navigate("/home")}>Voltar para home</Button>
    </div>
  );
};

export default PaginaErro;
