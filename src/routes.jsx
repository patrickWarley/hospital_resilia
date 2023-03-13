import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./assets/pages/Home";
import Login from "./assets/pages/Login";
import CadastroMedico from "./assets/pages/medicos/CadastroMedico";

import Medicos from "./assets/pages/medicos/Medicos";
import Medicamentos from "./assets/pages/Medicamentos";
import EditarMedico from "./assets/pages/medicos/EditarMedico";

import Pacientes from "./assets/pages/pacientes/Pacientes";
import EditarPaciente from "./assets/pages/pacientes/EditarPaciente";
import CadastroPaciente from "./assets/pages/pacientes/CadastroPaciente";

import Unidades from "./assets/pages/unidades/Unidades";
import EditarUnidade from "./assets/pages/unidades/EditarUnidade";
import CadastrarUnidade from "./assets/pages/unidades/CadastrarUnidade";

import Exames from "./assets/pages/exames/Exames";
import EditarExame from "./assets/pages/exames/EditarExame";
import CadastrarExame from "./assets/pages/exames/CadastrarExame"
import Consultas from "./assets/pages/consultas/Consultas";
import EditarConsulta from "./assets/pages/consultas/EditarConsulta";
import CadastrarConsulta from "./assets/pages/consultas/CadastrarConsulta";

const pacienteRoutes = [
  {
    path: '/pacientes',
    element: <Pacientes />
  },
  {
    path: '/editarPaciente/:id',
    element: <EditarPaciente />
  },
  {
    path: '/cadastroPaciente',
    element: <CadastroPaciente />
  }
];

const medicoRoutes = [
  {
    path: '/medicos',
    element: <Medicos />
  },
  {
    path: '/cadastroMedico',
    element: <CadastroMedico />
  },
  {
    path: '/editarMedico/:id',
    element: <EditarMedico />
  }
];

const unidadesRoutes = [
  {
    path: '/unidades',
    element: <Unidades />
  },
  {
    path: '/editarUnidade/:id',
    element: <EditarUnidade />
  },
  {
    path: '/cadastrarUnidade',
    element: <CadastrarUnidade />
  }
];

const examesRoutes = [
  {
    path: '/exames',
    element: <Exames />
  },
  {
    path: '/editarExame/:id',
    element: <EditarExame />
  },
  {
    path: '/cadastrarExame',
    element: <CadastrarExame />
  }
];

const consultasRoutes = [
  {
    path: '/consultas',
    element: <Consultas />
  },
  {
    path: '/editarConsulta/:id',
    element: <EditarConsulta />
  },
  {
    path: '/cadastrarConsulta',
    element: <CadastrarConsulta />
  }
]
export const routes = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />
      },
      ,
      {
        path: '/login',
        element: <Login />
      },
      ...pacienteRoutes,
      ...medicoRoutes,
      ...unidadesRoutes,
      ...examesRoutes,
      ...consultasRoutes,
      {
        path: '/medicamentos',
        element: <Medicamentos />
      }
    ]
  },
]);