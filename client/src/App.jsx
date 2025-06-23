import React from "react";

// Importando o outlet do rea
import { Outlet } from "react-router-dom";

//Importação do React-Bootstrap
import "bootstrap/dist/css/bootstrap.min.css";

// importando components do bootstrap
import Container from "react-bootstrap/Container";
import BarraNavegacao from "./components/BarraNavegacao";

// Importando o provider do contexto
import { AuthProvider } from "./contexts/UserContext";

function App() {
  return (
    <React.StrictMode>
      {/* Fornece o contexto de usuario para toda a aplicacao */}
      <AuthProvider>
        <div className="App">
          <BarraNavegacao />
          <Container>
            <Outlet />
          </Container>
        </div>
      </AuthProvider>
    </React.StrictMode>
  );
}

export default App;
