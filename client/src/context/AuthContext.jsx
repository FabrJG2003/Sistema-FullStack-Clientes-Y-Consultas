import { createContext, useContext, useState, useEffect, use } from 'react';
import { loginRequest, verifyTokenRequest } from '../api/auth';
import Cookies from 'js-cookie';
import { set } from 'mongoose';

export const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [errors, setErrors] = useState([]);
    const [loading, setLoading] = useState(true);

    const signin = async (user) => {
        try {
            const res = await loginRequest(user);
            console.log(res);
            setIsAuthenticated(true);
            setUser(res.data);
        } catch (error) {
            console.log(error);
            setErrors([error.response.data])
        }
    }

    useEffect(() => {
        if(errors.length > 0) {
            const timer = setTimeout(() => {
                setErrors([])
            }, 3000)
            return () => clearTimeout(timer);
        }
    }, [errors])
    
    useEffect(() => {
        async function checkLogin(){
            const cookies = Cookies.get();
            if(!cookies.token) {
                setIsAuthenticated(false);
                setLoading(false);
                return setUser(null);
            }
            try {
                const res = await verifyTokenRequest(cookies.token);
                if(!res.data) {
                    setIsAuthenticated(false);
                    setLoading(false);
                    return
                } 
                setIsAuthenticated(true);
                setUser(res.data);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setIsAuthenticated(false);
                setUser(null);
                setLoading(false);
            }
        }
        checkLogin();
    }, [])   

    return(
        <AuthContext.Provider value={{
            signin, loading, user, isAuthenticated, errors,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;