import React, { Children, useContext } from 'react'
//Contexto
import { Context } from '../../context/UserContext'
import "./style.css"

function MarginNav({children}) {
    const { authenticated, logout } = useContext(Context)

    return (
        <div className='marginNav'>
            {children}
        </div>
    )
}

export default MarginNav