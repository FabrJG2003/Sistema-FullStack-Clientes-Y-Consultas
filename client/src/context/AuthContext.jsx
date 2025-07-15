import { createContext, useContext, useState, useEffect, use } from 'react';
import { getUsersRequest, loginRequest, verifyTokenRequest, getContadorByNameRequest,
    createContadorRequest, deleteContadorRequest, 
    updateUserRequest} from '../api/auth';
import Cookies from 'js-cookie';
import axios from "../api/axios.js";

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
    const [users, setUsers] = useState([]);

    const getUsers = async (type = null) => {
        try {
            const usersData = await getUsersRequest();
            setUsers(usersData);
            return usersData;
        } catch (error) {
            console.error('Error fetching users:', error);
            return [];
        }
    }

    const getContadores = async () => {
        const users = await getUsers();
        return users.filter(user => user.type_User === "Contador");
    }

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

    const logout = () => {
        Cookies.remove("token");
        setIsAuthenticated(false);
        setUser(null);
    }

    const createContador = async(contador) => {
        console.log(contador);
        const res = await createContadorRequest(contador);
        console.log(res);
    }
    
    const getContador = async(id) => {
        try {
            const res = await getContadorRequest(id);
            console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }

    const getContadorName = async(username) => {
        try {
            const res = await getContadorByNameRequest(username);
            console.log(res)
            return res.data
        } catch (error) {
            console.log(error)
        }
    }
   
    const deleteContador = async (id) => {
        try {
            const res = await deleteContadorRequest(id);
            if (res.status === 204) setUser(user.filter(contador => contador._id !== id))
            return res
        } catch (error) {
    
        }
    }

    const updateUser = async (id, updateData) => {
        
        try {
            console.log("Id: ", id)
            console.log("Data: ", updateData)
            console.log("Hola2")
            const response = await updateUserRequest(id, updateData);
            console.log("Hola3")
            setUser(response.data);
            return { success: true };
        } catch (error) {
            console.error("Error al actualizar usuario.", error.response?.data || error.message);
            return { success: false, message: error.response?.message || "Error al actualizar." } 
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
            signin, logout, loading, user, isAuthenticated, errors,
            getUsers, getContadores, getContador, getContadorName,
            createContador, deleteContador, updateUser,
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;