import { createContext, useContext, useState } from "react";

import { createClientsRequest, getClientsRequest } from "../api/clients"

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

  return (
    <ClientContext.Provider value={{
        clients,
        createClient,
        getClients,
    }}>
      {children}
    </ClientContext.Provider>
  );
}