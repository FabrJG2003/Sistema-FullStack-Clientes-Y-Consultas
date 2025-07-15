import { createContext, useContext, useState, useEffect, use } from 'react';
import { getDocumentsByClientRequest } from "./../api/document"
import clientModel from '../../../models/client.model';

export const DocumentContext = createContext();

export const useDocuments = () => {
    const context = useContext(DocumentContext);
    if (!context) throw new Error('useAuth must be used within an AuthProvider');
    return context;
}

export const DocumentProvider = ({ children }) => {
    
    const [documents, setDocuments] = useState([]);

    const getDocumentsByClient = async (clienteId) => {
        try {
        console.log("CLIENT.ID: ", clienteId)
        const res = await getDocumentsByClientRequest(clienteId);
        //return res.data;
        setDocuments(res.data);
        } catch (error) {
            console.error("Error fetching documents:", error);
            }
    };

    return(
        <DocumentContext.Provider value={{
            documents, getDocumentsByClient,
        }}>
            {children}
        </DocumentContext.Provider>
    )
}