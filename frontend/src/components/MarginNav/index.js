import React, { Children, useContext } from 'react'
//Contexto
import { Context } from '../../context/UserContext'
import "./styleMargin.css"

function MarginNav({children, className}) {
    const { authenticated, logout } = useContext(Context)

    return (
        <div className={className}>
            {children}
        </div>
    )
}

export default MarginNav