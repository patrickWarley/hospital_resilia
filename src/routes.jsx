import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import CadastroMedico from "./assets/pages/medicos/CadastroMedico";
import Medicos from "./assets/pages/medicos/Medicos";
import Medicamentos from "./assets/pages/Medicamentos";

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
        element: <Medicos/>
      },
      {
        path:'/medicamentos',
        element:<Medicamentos/>
      }
    ]
  },
]);