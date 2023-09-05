import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from '../components/NavBar'
import MarginNav from '../components/MarginNav'
import { Context } from '../context/UserContext'

// Usuario 
import Login from '../pages/User/Login'
import Register from "../pages/User/Register"
import Profile from "../pages/User/Profile"

//Assistencia
import Dashboard from "../pages/Assistencia/Dashboard"
import CriarChamado from "../pages/Assistencia/CriarChamado"
import Chamados from "../pages/Assistencia/Chamados"

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
                            {/* user */}

                            {/* assistencia */}
                            <Route exact path="/criarchamado" element={<CriarChamado />} />
                            <Route exact path="/chamados" element={<Chamados />} />
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