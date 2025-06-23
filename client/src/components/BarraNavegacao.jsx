// importando components do bootstrap
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Button from "react-bootstrap/Button";
// MUDEI AQUI AGORA
import NavDropdown from "react-bootstrap/NavDropdown";

// importando icone do react-icons
import { BsShop } from "react-icons/bs";

// Importa o hook de usar um contexto
import { useContext } from "react";
// Importa o contexto de usuário
import { AuthContext } from "../contexts/UserContext";

const BarraNavegacao = () => {
  // Usa as variaveis do contexto de usuário
  const { usuarioNome, logout } = useContext(AuthContext);

  // MUDEI AQUI AGORA
  const id = localStorage.getItem("id") || "";

  return (
    <div style={{ position: "sticky", top: "0", width: "100%", zIndex: 1 }}>
      <Navbar expand="lg" bg="success" data-bs-theme="dark">
        <Container>
          {/* Texto logo */}
          <Navbar.Brand href="/home">
            {/* Icone logo usando react icons */}
            <BsShop size="1.5em" className="me-2" color="white" />
            C&G Mercados
          </Navbar.Brand>
          {/* Botão de menu responsivo */}
          <Navbar.Toggle aria-controls="minha-nav" />
          <Navbar.Collapse id="minha-nav">
            {/* MUDEI AQUI AGORA */}
            {/* Paginas */}
            <Nav className="me-auto">
              <Nav.Link href="/cadastrausuario">Cadastrar usuário</Nav.Link>
              {usuarioNome != "Visitante" && (
                <>
                  <Nav.Link href="/home">Ver Produtos</Nav.Link>
                  <Nav.Link href="/cadastraproduto">Cadastrar produto</Nav.Link>
                </>
              )}
            </Nav>
            {/* Sair */}
            <Nav className="justify-content-end">
              {/* Nome do usuário */}
              <Navbar.Text style={{ color: "white", marginRight: "5px" }}>
                Usuário:
                {/* MUDEI AQUI AGORA */}
                {/* Caso tenha feito login, aparece o botao de sair, caso contrairo, o botao para login */}
                {usuarioNome === "Visitante" ? (
                  <>
                    {" " + usuarioNome + " "}
                    <Button variant="primary" href="/login">
                      Entrar
                    </Button>
                  </>
                ) : (
                  <>
                    <NavDropdown
                      title={usuarioNome}
                      className="d-inline-block"
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item href={`/editausuario/${id}`}>
                        Editar usuário
                      </NavDropdown.Item>
                    </NavDropdown>
                    <Button variant="danger" href="/login" onClick={logout}>
                      Sair
                    </Button>
                  </>
                )}
              </Navbar.Text>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default BarraNavegacao;
