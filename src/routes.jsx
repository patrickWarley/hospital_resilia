import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import CadastroMedico from "./assets/pages/CadastroMedico";
import ListarMedicos from "./assets/pages/ListarMedicos";

export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      {
        path: '/login',
        element: <Login />
      },
      {
        path: '/cadastroMedico',
        element: <CadastroMedico />
      },
      {
        path: '/medicos',
        element: <ListarMedicos />
      }
    ]
  },
]);