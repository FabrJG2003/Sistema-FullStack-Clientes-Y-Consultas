import { createContext, useContext, useState } from "react";

import { createClientsRequest, getClientsRequest, getClientRequest, updateClientsRequest, getClientByNameRequest, deleteClientsRequest } from "../api/clients"

const ClientContext = createContext();

export const useClients = () => {
  const context = useContext(ClientContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientsProvider");
  }
  return context;
};

export function ClientsProvider({ children }) {

    const [clients, setClients] = useState([]);
    
    const getClients = async () => {
      try {
        const res = await getClientsRequest();
        setClients(res.data);
      } catch (error) {
        console.error(error);
      }
    }

    const createClient = async (client) => {
        console.log(client)
        const res = await createClientsRequest(client)
        console.log(res)
    }

    const getClient = async (id) => {
      try {
        const res = await getClientRequest(id)
        console.log(res )
        return res.data
      } catch (error) {
        console.log(error)
      }
    }

    const getClientName = async (name) => {
      try {
        const res = await getClientByNameRequest(name)
        return res.data
      } catch (error) {
        console.log (error)
      }
    }

    const updateClient = async (id, client) => {
      try {
        await updateClientsRequest(id, client)
      } catch (error) {
        console.error(error);
      }
    }

    const deleteClient = async (id) => {
      try {
        const res = await deleteClientsRequest(id);
        if (res.status === 204) setClients(clients.filter(client => client._id !== id))
        return res
      } catch (error) {

      }
    }

  return (
    <ClientContext.Provider value={{
        clients,
        createClient,
        getClients,
        getClient,
        updateClient,
        getClientName,
        deleteClient,
    }}>
      {children}
    </ClientContext.Provider>
  );
}