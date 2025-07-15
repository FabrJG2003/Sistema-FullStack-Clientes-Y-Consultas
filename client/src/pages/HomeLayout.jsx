import { useAuth } from '../context/AuthContext';
import HomeUser_Gerente from './user_gerente/HomeUser_Gerente';
import HomeUser_Contador from './user_contador/HomeUser_Contador';

function HomeLayout() {
    const { user } = useAuth();

    console.log(user);
  
    if(location.pathname === "/home"){
        if(user?.type_User === "Gerente"){
            return <HomeUser_Gerente />;
        } else if(user?.type_User === "Contador"){
            return <HomeUser_Contador />;
        } else if(user?.type_User === "Administrador"){
            return <Navigate to="/clients" />;
        }
    }
}

export default HomeLayout;
