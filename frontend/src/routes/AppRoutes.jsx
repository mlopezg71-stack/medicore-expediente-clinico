import { Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";

import DashboardAdmin from "../pages/dashboard/DashboardAdmin";
import DashboardPaciente from "../pages/dashboard/DashboardPaciente";
import Pacientes from "../pages/pacientes/Pacientes";
import PacienteForm from "../pages/pacientes/PacienteForm";
import PacienteDetalle from "../pages/pacientes/PacienteDetalle";
import Expedientes from "../pages/expedientes/Expedientes";
import ExpedienteForm from "../pages/expedientes/ExpedienteForm";
import ExpedienteDetalle from "../pages/expedientes/ExpedienteDetalle";
import Consultas from "../pages/consultas/Consultas";
import ConsultaForm from "../pages/consultas/ConsultaForm";
import ConsultaDetalle from "../pages/consultas/ConsultaDetalle";
import Diagnosticos from "../pages/Diagnosticos/Diagnosticos";
import DiagnosticoForm from "../pages/Diagnosticos/DiagnosticoForm";
import DiagnosticoDetalle from "../pages/Diagnosticos/DiagnosticoDetalle";
import Tratamientos from "../pages/Tratamientos/Tratamientos";
import TratamientoForm from "../pages/Tratamientos/TratamientoForm";
import TratamientoDetalle from "../pages/Tratamientos/TratamientoDetalle";
import Recetas from "../pages/recetas/Recetas";
import RecetaForm from "../pages/recetas/RecetaForm";
import RecetaDetalle from "../pages/recetas/RecetaDetalle";
import Citas from "../pages/citas/Citas";
import CitaForm from "../pages/citas/CitaForm";
import CitaDetalle from "../pages/citas/CitaDetalle";
import Usuarios from "../pages/usuarios/Usuarios";
import UsuarioForm from "../pages/usuarios/UsuarioForm";
import UsuarioDetalle from "../pages/usuarios/UsuarioDetalle";
import Bitacora from "../pages/Bitacora/Bitacora";


import ProtectedRoute from "./ProtectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />


      {/* DASHBOARDS */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardAdmin />
          </ProtectedRoute>
        }
      />

      {/* PACIENTES */}
      <Route
        path="/pacientes"
        element={
          <ProtectedRoute>
            <Pacientes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/dashboard-paciente"
        element={
          <ProtectedRoute>
            <DashboardPaciente />
          </ProtectedRoute>
        }
      />

      {/* PACIENTE */}
      <Route
        path="/paciente/citas"
        element={
          <ProtectedRoute>
            <Citas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paciente/citas/crear"
        element={
          <ProtectedRoute>
            <CitaForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paciente/consultas"
        element={
          <ProtectedRoute>
            <Consultas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paciente/consultas/ver/:id"
        element={
          <ProtectedRoute>
            <ConsultaDetalle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paciente/recetas"
        element={
          <ProtectedRoute>
            <Recetas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paciente/recetas/ver/:id"
        element={
          <ProtectedRoute>
            <RecetaDetalle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paciente/tratamientos"
        element={
          <ProtectedRoute>
            <Tratamientos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paciente/tratamientos/ver/:id"
        element={
          <ProtectedRoute>
            <TratamientoDetalle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paciente/expediente"
        element={
          <ProtectedRoute>
            <Expedientes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paciente/expediente/ver/:id"
        element={
          <ProtectedRoute>
            <ExpedienteDetalle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pacientes/crear"
        element={
          <ProtectedRoute>
            <PacienteForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pacientes/editar/:id"
        element={
          <ProtectedRoute>
            <PacienteForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/pacientes/ver/:id"
        element={
          <ProtectedRoute>
            <PacienteDetalle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/paciente/citas/ver/:id"
        element={
          <ProtectedRoute>
            <CitaDetalle />
          </ProtectedRoute>
        }
      />

      {/* EXPEDIENTES */}
      <Route
        path="/expedientes"
        element={
          <ProtectedRoute>
            <Expedientes />
          </ProtectedRoute>
        }
      />

      <Route
        path="/expedientes/crear"
        element={
          <ProtectedRoute>
            <ExpedienteForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/expedientes/editar/:id"
        element={
          <ProtectedRoute>
            <ExpedienteForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/expedientes/ver/:id"
        element={
          <ProtectedRoute>
            <ExpedienteDetalle />
          </ProtectedRoute>
        }
      />

      {/* CONSULTAS */}
      <Route
        path="/consultas"
        element={
          <ProtectedRoute>
            <Consultas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/consultas/crear"
        element={
          <ProtectedRoute>
            <ConsultaForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/consultas/editar/:id"
        element={
          <ProtectedRoute>
            <ConsultaForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/consultas/ver/:id"
        element={
          <ProtectedRoute>
            <ConsultaDetalle />
          </ProtectedRoute>
        }
      />

      {/* DIAGNOSTICOS */}
      <Route
        path="/diagnosticos"
        element={
          <ProtectedRoute>
            <Diagnosticos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/diagnosticos/crear"
        element={
          <ProtectedRoute>
            <DiagnosticoForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/diagnosticos/ver/:id"
        element={
          <ProtectedRoute>
            <DiagnosticoDetalle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/diagnosticos/editar/:id"
        element={
          <ProtectedRoute>
            <DiagnosticoForm />
          </ProtectedRoute>
        }
      />

      {/* TRATAMIENTOS */}
      <Route
        path="/tratamientos"
        element={
          <ProtectedRoute>
            <Tratamientos />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tratamientos/crear"
        element={
          <ProtectedRoute>
            <TratamientoForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tratamientos/ver/:id"
        element={
          <ProtectedRoute>
            <TratamientoDetalle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/tratamientos/editar/:id"
        element={
          <ProtectedRoute>
            <TratamientoForm />
          </ProtectedRoute>
        }
      />

      {/* RECETAS */}
      <Route
        path="/recetas"
        element={
          <ProtectedRoute>
            <Recetas />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recetas/crear"
        element={
          <ProtectedRoute>
            <RecetaForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recetas/ver/:id"
        element={
          <ProtectedRoute>
            <RecetaDetalle />
          </ProtectedRoute>
        }
      />

      <Route
        path="/recetas/editar/:id"
        element={
          <ProtectedRoute>
            <RecetaForm />
          </ProtectedRoute>
        }
      />

      {/* CITAS */}
      <Route
        path="/citas"
        element={
          <ProtectedRoute>
            <Citas />
          </ProtectedRoute>
        }
      />
      <Route
        path="/citas/crear"
        element={
          <ProtectedRoute>
            <CitaForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citas/editar/:id"
        element={
          <ProtectedRoute>
            <CitaForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/citas/ver/:id"
        element={
          <ProtectedRoute>
            <CitaDetalle />
          </ProtectedRoute>
        }
      />

      {/* USUARIOS */}
      <Route
        path="/usuarios"
        element={
          <ProtectedRoute>
            <Usuarios />
          </ProtectedRoute>
        }
      />

      <Route
        path="/usuarios/crear"
        element={
          <ProtectedRoute>
            <UsuarioForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/usuarios/editar/:id"
        element={
          <ProtectedRoute>
            <UsuarioForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/usuarios/ver/:id"
        element={
          <ProtectedRoute>
            <UsuarioDetalle />
          </ProtectedRoute>
        }
      />

      {/* BITÁCORA */}
      <Route
        path="/bitacora"
        element={
          <ProtectedRoute>
            <Bitacora />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
};

export default AppRoutes;