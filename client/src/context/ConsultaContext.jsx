import { createContext, useContext, useState } from "react";
import { createConsultaRequest, getConsultasByClientNameRequest, updateConsultaRequest,
  getConsultasRequest, getConsultasByContadorRequest } from '../api/consulta' ;
import axios from "axios";

const ConsultaContext = createContext();

export const useConsultas = () => {
  const context = useContext(ConsultaContext);
  if (!context) {
    throw new Error("useClient must be used within a ClientsProvider");
  }
  return context;
};

export function ConsultasProvider({ children }) {

  const [consultas, setConsultas] = useState([]);

  const createConsulta = async (consulta) => {
    console.log(consulta)
    const res = await createConsultaRequest(consulta)
    console.log(res)
  }

  const getConsultas = async () => {
    try {
      const res = await getConsultasRequest();
      return res.data;
    } catch (error) {
      console.error("Error buscando consultas:", error);
    }
  }

  const getConsultasByContador = async (name) => {
    try {
      const res = await getConsultasByContadorRequest(name);
      return res.data;
    } catch (error) {
      console.error("Error buscando consultas por contador:", error);
      return [];
    }
  }
  
  const getConsultasByClientName = async (name) => {
    try {
      const res = await getConsultasByClientNameRequest(name);
      return res.data;
    } catch (error) {
      console.error("Error fetching consultas by client name:", error);
      return [];
    }
  }

  const updateConsulta = async (id, consulta) => {
    try{
      await updateConsultaRequest(id, consulta);
    } catch (error) {
      console.error("No se puede cambiar el estado de la consulta:", error)
    }
  }

  return (
    <ConsultaContext.Provider value={{
      createConsulta, getConsultasByClientName, consultas, setConsultas, updateConsulta,
      getConsultas, getConsultasByContador
    }}>
      {children}
    </ConsultaContext.Provider>
  )
}