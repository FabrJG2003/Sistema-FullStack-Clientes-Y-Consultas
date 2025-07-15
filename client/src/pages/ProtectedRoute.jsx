import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DynamicNavbar from "../components/DynamicNavbar";

function ProtectedRoute({ children }) {
    const { loading,  isAuthenticated} = useAuth();

    if(loading) return <div className="loader"><h1>Loading...</h1></div>;

    if(!loading && !isAuthenticated) return <Navigate to="/login" replace />;

    return(
        <>
            <div className="flex min-h-screen">
                <DynamicNavbar/>
                <main className="flex-1 overflow-auto ml-8 transition-all duration-300">
                    <Outlet/>
                </main>
            </div>
        </>
    )
}

export default ProtectedRoute;