import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from '../components/NavBar'
import MarginNav from '../components/MarginNav'
import { Context } from '../context/UserContext'

// Usuario 
import Login from '../pages/User/Login'
import Register from "../pages/User/Register"
import Profile from "../pages/User/Profile"

//Chamados
import Dashboard from "../pages/Chamados/Dashboard"
import CriarChamado from "../pages/Chamados/CriarChamado"

function Rotas() {
    const { authenticated } = useContext(Context)

    return (
        <>
            {authenticated ? <NavBar /> : null}
            <MarginNav>
                <Routes>
                    {authenticated ? (
                        <>

                            <Route exact path="/dashboard" element={<Dashboard />} />
                            <Route exact path="/criarchamado" element={<CriarChamado />} />
                            <Route exact path="/profile" element={<Profile />} />
                        </>
                    ) : (
                        <>
                            <Route exact path="/" element={<Login />} />
                            <Route exact path="/register" element={<Register />} />
                        </>
                    )}
                </Routes>
            </MarginNav>
        </>
    )
}

export default Rotas