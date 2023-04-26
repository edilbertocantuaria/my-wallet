import { useState } from 'react'
import { AppContext } from './AppContext'


export default function AppProvider({ children }) {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const [transactions, setTransactions] = useState([]);
    const [listTransactions, setListTransactions] = useState([]);
    const [balance, setBalance] = useState(0);
    const [idUser, setIdUser] = useState("");
    const [operation, setOperation] = useState("");

    return (
        <AppContext.Provider
            value={{
                username, setUsername,
                token, setToken,
                transactions, setTransactions,
                listTransactions, setListTransactions,
                balance, setBalance,
                idUser, setIdUser,
                operation, setOperation
            }}>
            {children}
        </AppContext.Provider>
    )
}