import React, { useContext, useState } from 'react'
import { Link } from 'react-router-dom'
//Contexto
import { Context } from '../../context/UserContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faUsers, faUser, faPlus, faSignOutAlt, faChartBar, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import "./styles.css"

function NavBar() {
    const { authenticated, logout } = useContext(Context)
    const [collapsed, setCollapsed] = useState(false);


    const toggleSidebar = () => {
        setCollapsed(!collapsed);
    };
    const sidebarWidth = collapsed ? "90px" : "280px";


    return (
        <div class="sidebar close" style={{ width: sidebarWidth, height: "100vh" }}>
            <div class="logo">
                <i class="fab fa-trade-federation"></i>
                <span class="logo-name">SupMate</span>
            </div>
            <button className="btn btn-light btn-sm" onClick={toggleSidebar} style={{ width: '50px', height: '50px', borderRadius: '100%', margin: '1rem auto 0' }}>
                {collapsed ? <FontAwesomeIcon icon={faChevronRight} /> : <FontAwesomeIcon icon={faChevronLeft} />}
            </button>
            <ul class="nav-list">
                <li>
                    <Link to='/'>
                        <i class="fab fa-microsoft"></i>
                        <span class="link-name">Dashboard</span>
                    </Link>

                    <ul class="sub-menu blank">
                        <li><Link to='/' class="link-name">Dashboard</Link></li>
                    </ul>
                </li>

                <li>
                    <div class="icon-link">
                        <Link to='/'>
                            <i class="fab fa-codepen"></i>
                            <span class="link-name">Chamado?</span>
                        </Link>
                        <i class="fas fa-caret-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li><Link to='/' class="link-name">Courses</Link></li>
                        <li><a href="#">Block Chain</a></li>
                        <li><a href="#">Cryptography</a></li>
                        <li><a href="#">Animation</a></li>
                    </ul>
                </li>
                <li>
                    <div class="icon-link">
                        <Link to='/'>
                            <i class="fab fa-blogger"></i>
                            <span class="link-name">AlgumaCoisa?</span>
                        </Link>
                        <i class="fas fa-caret-down arrow"></i>
                    </div>
                    <ul class="sub-menu">
                        <li><Link to='/' class="link-name">AlgumaCoisa?</Link></li>
                        {/* <li><a href="#">Web Design</a></li>
                        <li><a href="#">Card Design</a></li>
                        <li><a href="#">Form Design</a></li> */}
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
                <li onClick={logout}>
                    <Link to='/'>
                        <i class="fas fa-gear"></i>
                        <span class="link-name">Sair</span>
                    </Link>

                    <ul class="sub-menu blank">
                        <li><Link to='/' class="link-name">Sair</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    )

    return (
        <div class="home-section">
            <div class="home-content">
                <i class="fas fa-bars"></i>
                <span class="text">Dropdown Sidebar Menu</span>
            </div>
        </div>
    )
}

export default NavBar