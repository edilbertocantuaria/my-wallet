import { useState } from 'react'
import { AppContext } from './AppContext'

export default function AppProvider({ children }) {
    const [userImage, setUserImage] = useState("");



    return (
        <AppContext.Provider
            value={{
                userImage, setUserImage,
                
            }}>
            {children}
        </AppContext.Provider>
    )
}