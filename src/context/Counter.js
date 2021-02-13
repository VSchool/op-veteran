import React, { useState } from 'react'

export const CountContext = React.createContext()

export default function Counter({ children }) {
    const [count, setCount] = useState(0)

    return (
        <CountContext.Provider value={[count, setCount]}>
            { children }
        </CountContext.Provider>
    )
}