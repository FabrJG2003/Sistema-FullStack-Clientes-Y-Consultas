import axios from './axios.js';
import Cookies from 'js-cookie';

export const loginRequest = user => axios.post(`/login`, user)

export const verifyTokenRequest = () => axios.get(`/verify`)

export const getUsersRequest = async () => {
    const token = Cookies.get('token');
    try{
        const response = await axios.get('/users', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        return response.data;
    } catch (error) {
        throw new Error('Error al obtener los usuarios');
    }
}

// export const getContadorRequest = (username) => axios.get(`/contadores/name/${username}`);

export const getContadorByNameRequest = (username) => axios.get(`/contadores/name/${username}`);

export const createContadorRequest = (contador) => axios.post(`/contadores`, contador);

export const deleteContadorRequest = (id) => axios.delete(`/contadores/${id}`);

export const updateUserRequest = (id, user) => axios.put(`/update/${id}`, user);

// export const updateUserRequest = async (id, user) => {
//     const token = Cookies.get('token');
//     try {
//         const response = await axios.put(`/update/${id}`, user, {
//             headers: {
//                 Authorization: `Bearer ${token}`
//             }
//         });
//         return response;
//     } catch (error) {
//         console.error("Error en updateUserRequest:", error.response?.data || error.message);
//         throw error;
//     }
// };
