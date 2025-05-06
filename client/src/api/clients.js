import axios from "./axios";

export const getClientsRequest = () => axios.get(`/clients`);

export const getClientRequest = (id) => axios.get(`/clients/${id}`);

export const createClientsRequest = (client) => axios.post(`/clients`, client);

export const updateClientsRequest = (client) => axios.put(`/clients/${client._id}`, client);

export const deleteClientsRequest = () => axios.delete(`/clients/${id}`);