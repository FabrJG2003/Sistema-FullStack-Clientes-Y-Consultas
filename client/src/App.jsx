import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import {AuthProvider, useAuth} from './context/AuthContext';
import {ClientsProvider} from './context/ClientsContext';
import LoginPage from './pages/LoginPage';
import ClientsPage from './pages/ClientsPage';
import ClientFormPage from './pages/ClientFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import HomeLayout from './pages/HomeLayout';
import ProtectedRoute from './pages/ProtectedRoute';
import ClientsPage_Contador from './pages/user_contador/ClientsPage_Contador';
import ContadoresPage from './pages/user_gerente/ContadoresPage';
import ClientPage from './pages/ClientPageName';
import AgendaEmpresa from './pages/user_gerente/AgendaEmpresaPage';
import ContadorPageName from './pages/user_gerente/ContadorPageName';
import ContadorFormPage from './pages/user_gerente/ContadorFormPage';
import { ConsultasProvider } from './context/ConsultaContext';
import ConsultaFormPage from './pages/user_gerente/ConsultaFormPage';
import HistorialConsultasCliente from './pages/HistorialConsultasCliente';
import AgendaContador from './pages/user_contador/AgendaContadorPage';
import { NotificacionesProvider } from './context/NotificacionContext';
import GenerarDocumento from './pages/user_gerente/GenerateDocument';
import { DocumentProvider } from './context/DocumentContext';
import SolicitudConsulta from './pages/solicitud de consulta/solicitud_consulta';
import Solicitud_Cliente_Page2 from './pages/solicitud de consulta/solicitud_cliente_pag2';
import Solicitud_Consulta_Final from './pages/solicitud de consulta/solicitud_final';
import Solicitud_NoCliente_Page2 from './pages/solicitud de consulta/solicitud_nocliente_pag2';
import SolicitudPage from './pages/user_gerente/SolicitudPage';

function App() {
  return (
    <AuthProvider>
      <ClientsProvider>
        <NotificacionesProvider>
        <DocumentProvider>
        <ConsultasProvider>
        <BrowserRouter>
          {/* <DynamicNavbar /> */}
          <Routes>
              <Route path="/" element={<HomePage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route element={<ProtectedRoute/>}>
                <Route path="/home" element={<HomeLayout/>}/>
                <Route path="/clients" element={<ClientsPage/>} />
                <Route path="/clients/nuevo-cliente" element={<ClientFormPage/>} />
                <Route path="/clients/name/:name/historial-consultas" element={<HistorialConsultasCliente/>} />
                <Route path="/clients/:id" element={<ClientFormPage/>} />
                <Route path="/clients/name/:name"  element={<ClientPage/>} />
                <Route path="/profile" element={<ProfilePage/>} />
                <Route path="/clients-contador" element={<ClientsPage_Contador/>} />
                <Route path="/contadores" element={<ContadoresPage/>} />
                <Route path="/contadores/nuevo-contador" element={<ContadorFormPage/>} />
                <Route path="/contadores/name/:username" element={<ContadorPageName/>} />
                <Route path="/agenda" element={<AgendaEmpresa/>} />
                <Route path="/agenda/contador" element={<AgendaContador/>} />
                <Route path="/clients/name/:name/nueva-consulta" element={<ConsultaFormPage/>} />
                <Route path="/clients/name/:name/generar-documento" element={<GenerarDocumento/>} />
                <Route path="/solicitudes" element={<SolicitudPage/>} />
              </Route>
              <Route path="/solicitar-consulta" element={<SolicitudConsulta/>} />
              <Route path="/solicitar-consulta/cliente" element={<Solicitud_Cliente_Page2/>} />
              <Route path="/solicitar-consulta/finalizar" element={<Solicitud_Consulta_Final/>} />
              <Route path="/solicitar-consulta/no-cliente" element={<Solicitud_NoCliente_Page2/>} />
          </Routes>
        </BrowserRouter>
        </ConsultasProvider>
        </DocumentProvider>
        </NotificacionesProvider>
      </ClientsProvider>
    </AuthProvider>
  );
}

export default App;