import { useState } from 'react'
import { AppContext } from './AppContext'

export default function AppProvider({ children }) {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    const [transactions, setTransaction]=useState([]);
    


    return (
        <AppContext.Provider
            value={{
                username, setUsername,
                token, setToken,
                transactions, setTransaction


            }}>
            {children}
        </AppContext.Provider>
    )
}