import { createBrowserRouter } from "react-router-dom";

//Importação das páginas
import App from "./App.jsx";
import Home from "./pages/Home.jsx";
import PaginaErro from "./pages/PaginaErro.jsx";
import CadastrarProduto from "./pages/CadastrarProduto.jsx";
import EditarProduto from "./pages/EditarProduto.jsx";
import Login from "./pages/Login.jsx";
import CadastraUsuario from "./pages/CadastraUsuario.jsx";
import EditarUsuario from "./pages/EditarUsuario.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <PaginaErro />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/cadastraproduto",
        element: <CadastrarProduto />,
      },
      {
        path: "/editarproduto/:id",
        element: <EditarProduto />,
      },
       // MUDEI AQUI AGORA
      {
        path: "/cadastrausuario",
        element: <CadastraUsuario />,
      },
      {
        path: "/editausuario/:id",
        element: <EditarUsuario />
      },
    ],
  },
]);

export default router;
