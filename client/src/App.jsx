import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import {AuthProvider} from './context/AuthContext';
import {ClientsProvider} from './context/ClientsContext';
import LoginPage from './pages/LoginPage';
import ClientsPage from './pages/ClientsPage';
import ClientFormPage from './pages/ClientFormPage';
import ProfilePage from './pages/ProfilePage';
import HomePage from './pages/HomePage';
import HomeLayout from './pages/HomeLayout';
import HomeUser_Gerente from './pages/HomeUser_Gerente';
import HomeUser_Contador from './pages/HomeUser_Contador';

import ProtectedRoute from './pages/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <ClientsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage/>} />
            <Route path="/login" element={<LoginPage/>} />

            <Route element={<ProtectedRoute/>}>
              <Route path="/home" element={<HomeLayout/>}/>
              <Route path="/clients" element={<ClientsPage/>} />
              <Route path="/add-clients" element={<ClientFormPage/>} />
              <Route path="/clients/:id" element={<ClientFormPage/>} />
              <Route path="/profile" element={<ProfilePage/>} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ClientsProvider>
    </AuthProvider>
  );
}

export default App;