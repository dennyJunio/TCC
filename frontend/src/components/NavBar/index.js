import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
//Contexto
import { Context } from '../../context/UserContext'
import "./style.css"

function NavBar() {
    const { authenticated, logout } = useContext(Context)

    return (
        <div class="sidebar close">
            <div class="logo">
            <img class="logoSupmate" src={img}></img>
                <span class="logo-name">SupMate</span>
            </div>
            <ul class="nav-list">
                <li>
                    <Link to='/'>
                        <i class="fab fa-microsoft"></i>
                        <span class="link-name">Dashboard</span>
                    </Link>
                    <ul class="sub-menu blank">
                        <li><Link to='/dashboard' class="link-name">Dashboard</Link></li>
                    </ul>
                </li>

                <li>
                    <div class="icon-link">
                        <Link to='/'>
                            <i class="fa-solid fa-pen-to-square"></i>
                            <span class="link-name">Assistência</span>
                        </Link>
                        <i class="fas fa-caret-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li><Link to='/' class="link-name">Assistência</Link></li>
                        <li><Link to='/chamados/create'>Criar Chamado</Link></li>
                        <li><Link to='/chamados'>Chamados</Link></li>
                    </ul>
                </li>
                <li>
                    <div class="icon-link">
                        <Link to='/'>
                            <i class="fab fa-blogger"></i>
                            <span class="link-name">Administração</span>
                        </Link>
                        <i class="fas fa-caret-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li><Link to='/' class="link-name">Administração</Link></li>
                        <li><Link to='/administracao'>Usuarios</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to='/'>
                        <i class="fas fa-clock-rotate-left"></i>
                        <span class="link-name">Pensando muito?</span>
                    </Link>
                    <ul class="sub-menu blank">
                        <li><Link to='/' class="link-name">Pensando muito?</Link></li>
                    </ul>
                </li>
                <li>
                    <Link to='/'>
                        <i class="fas fa-gear"></i>
                        <span class="link-name">Configurar</span>
                    </Link>
                    <ul class="sub-menu blank">
                        <li><Link to='/' class="link-name">Configurar</Link></li>
                    </ul>
                </li>
                <li onClick={logout} className="exit">
                    <Link to='/'>
                    <i class="fa-solid fa-right-from-bracket"></i>
                        <span class="link-name">Sair</span>
                    </Link>
                    <ul class="sub-menu blank">
                        <li><Link to='/' class="link-name">Sair</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default NavBar