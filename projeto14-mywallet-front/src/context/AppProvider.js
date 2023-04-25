import { useState } from 'react'
import { AppContext } from './AppContext'

export default function AppProvider({ children }) {
    const [username, setUsername] = useState("");
    const [token, setToken] = useState("");
    


    return (
        <AppContext.Provider
            value={{
                username, setUsername,
                token, setToken


            }}>
            {children}
        </AppContext.Provider>
    )
}