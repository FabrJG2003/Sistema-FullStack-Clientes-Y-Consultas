import { useAuth } from '../context/AuthContext';
import NavbarGerente from './navbar_gerente';
import NavbarContador from './navbar_contador';
import { useState } from "react";

function DynamicNavbar() {
  const { user } = useAuth();
  const [ isCollapsed, setIsCollapsed ] = useState(false);
  return (
    <>
      {user?.type_User === 'Gerente' ? <NavbarGerente /> : null}
      {user?.type_User === 'Contador' ? <NavbarContador /> : null}
      {user?.type_User === 'Admin' ? <NavbarGerente /> : null}
    </>
  );
}

export default DynamicNavbar;