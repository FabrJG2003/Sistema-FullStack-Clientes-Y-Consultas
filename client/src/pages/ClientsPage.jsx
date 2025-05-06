import { use, useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { useClients } from "../context/ClientsContext";

function ClientsPage() {

  const { getClients, clients } = useClients();

  useEffect(() => {
    getClients()
  }, [])

  return (
    <div>
      <h1>Clients Page</h1>
      <p>This is the clients page.</p>
      {
        clients.map(client => (
          <div key = {client._id}>
            <h1>{client.name}</h1>
            <p>{client.ruc}</p>
            <p>{client.email}</p>
            <p>--------------------------------</p>
          </div>
        ))
      }

    </div>
  );
}

export default ClientsPage;