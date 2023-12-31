import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from '../components/NavBar'
import MarginNav from '../components/MarginNav'
import { Context } from '../context/UserContext'

// Usuario 
import Login from '../pages/User/Login'

// Administracao
import ListaUser from '../pages/Administracao/Usuarios'
import Profile from '../pages/Administracao/Profile'
import Register from "../pages/Administracao/Register"

//Assistencia
import Dashboard from "../pages/Assistencia/Dashboard"
import CriarChamado from "../pages/Assistencia/CriarChamado"
import Chamados from "../pages/Assistencia/Chamados"
import EditarChamado from "../pages/Assistencia/EditarChamado"

function Rotas() {
    const { authenticated } = useContext(Context)

    return (
        <>
            {authenticated ? <NavBar /> : null}
            <MarginNav
                className={authenticated ? 'marginNav' : 'marginNavNone'}
            >
                <Routes>
                    {authenticated ? (
                        <>
                            <Route exact path="/dashboard" element={<Dashboard />} />
                            
                            {/* administracao */}
                            <Route exact path="/administracao" element={<ListaUser   />} />
                            <Route exact path="/users/:id" element={<Profile   />} />
                            <Route exact path="/register" element={<Register />} />

                            {/* assistencia */}
                            <Route exact path="/chamados/create" element={<CriarChamado />} />
                            <Route exact path="/chamados/:id" element={<EditarChamado />} />
                            <Route exact path="/chamados" element={<Chamados />} />
                        </>
                    ) : (
                        <>
                            <Route exact path="/" element={<Login />} />
                        </>
                    )}
                </Routes>
            </MarginNav>
        </>
    )
}

export default Rotas