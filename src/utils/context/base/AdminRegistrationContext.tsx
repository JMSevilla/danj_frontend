import { createContext, useState } from 'react'
import { ContextSetup } from '..'

export const ARContext = createContext<ContextSetup | null>(null)

type ARContextProps = {
    children: React.ReactNode
}

const AdminRegistrationContext: React.FC<ARContextProps> = ({
    children
}) => {
    const [isHidden, setIsHidden] = useState(false)
    return (
        <ARContext.Provider
        value={{
            isHidden, setIsHidden
        }}
        >
            {children}
        </ARContext.Provider>
    )
}

export default AdminRegistrationContext