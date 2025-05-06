import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import HomeUser_Gerente from '../pages/HomeUser_Gerente';
import HomeUser_Contador from '../pages/HomeUser_Contador';

function ProtectedRoute({ children }) {
    const { loading,  isAuthenticated, user} = useAuth();
    const location = useLocation();

    if(loading) return <div className="loader"><h1>Loading...</h1></div>;

    if(!loading && !isAuthenticated) return <Navigate to="/login" replace />;

    return(
        <Outlet/>
    )
}

export default ProtectedRoute;