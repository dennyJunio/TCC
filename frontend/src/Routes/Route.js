import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import NavBar from '../components/NavBar'
import Container from "../components/Container"
import { Context } from '../context/UserContext'

// Usuario 
import Login from '../pages/User/Login'
import Register from "../pages/User/Register"
import Profile from "../pages/User/Profile"
import Home from '../pages/Home'

function Rotas() {
    const { authenticated } = useContext(Context)

    return (
        <>
            {authenticated ? <NavBar /> : null}
            <Routes>
                {authenticated ? (
                    <>
                        {/* User  */}
                            <Route exact path="/" element={<Profile />} />
                            {/* <Route exact path="/settings/edit/:id" element={<EditDepart />} /> */}
                    </>
                ) : (
                    <>
                        <Route exact path="/" element={<Login />} />
                        <Route exact path="/register" element={<Register />} />
                    </>
                )}
            </Routes>
        </>
    )
}

export default Rotas