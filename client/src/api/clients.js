import axios from "./axios";

export const getClientsRequest = () => axios.get(`/clients`);

export const getClientRequest = (id) => axios.get(`/clients/${id}`);

export const getClientByNameRequest = (name) => axios.get(`/clients/name/${name}`);

export const createClientsRequest = (client) => axios.post(`/clients`, client);

export const updateClientsRequest = (id, client) => axios.put(`/clients/${id}`, client);

export const deleteClientsRequest = (id) => axios.delete(`/clients/${id}`);

export const getClientsByDataRequest = (ruc, email) => axios.get(`/clients/data`, {params: {ruc: ruc || undefined, email: email || undefined}});