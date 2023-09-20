import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Context } from '../../context/UserContext';
import img from './img/imgLogo.png';
import api from '../../utils/api';
import { useNavigate } from 'react-router-dom';
import "./styleNavbar.css";

function NavBar() {
    const { authenticated, logout } = useContext(Context);
    const [user, setUser] = useState({});
    const [users, setUsers] = useState([]);
    const [token] = useState(localStorage.getItem('token') || '');
    const navigate = useNavigate();

    useEffect(() => {
        if (!token) {
            alert('Por favor faça o login');
            navigate('/login');
        } else {
            api.get('/users/checkuser', {
                headers: {
                    Authorization: `Bearer ${JSON.parse(token)}`
                }
            })
                .then((response) => {
                    setUser(response.data);  // Set the user data
                })
                .catch((error) => {
                    console.error('API Error:', error.response);
                });
        }
    }, [token, navigate]);

    return (
        <div className="sidebar close">
            <div className="logo">
                <img className="logoSupmate" src={img} alt="Logo" />
                <span className="logo-name">SupMate</span>
            </div>
            <ul className="nav-list">
                <li>
                    <Link to='/'>
                        <i className="fab fa-microsoft"></i>
                        <span className="link-name">Dashboard</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link to='/dashboard' className="link-name">Dashboard</Link></li>
                    </ul>
                </li>

                <li>
                    <div className="icon-link">
                        <Link to='/'>
                            <i className="fa-solid fa-pen-to-square"></i>
                            <span className="link-name">Assistência</span>
                        </Link>
                        <i className="fas fa-caret-down arrow"></i>
                    </div>
                    <ul className="sub-menu">
                        <li><Link to='/' className="link-name">Assistência</Link></li>
                        <li><Link to='/chamados/create'>Criar Chamado</Link></li>
                        <li><Link to='/chamados'>Chamados</Link></li>
                    </ul>
                </li>
                {user.nivel === 0 && (
                    <>
                        <li>
                            <div className="icon-link">
                                <Link to='/'>
                                    <i className="fab fa-blogger"></i>
                                    <span className="link-name">Administração</span>
                                </Link>
                                <i className="fas fa-caret-down arrow"></i>
                            </div>
                            <ul className="sub-menu">
                                <li><Link to='/' className="link-name">Administração</Link></li>
                                <li><Link to='/administracao'>Usuarios</Link></li>
                            </ul>
                        </li>                   
                    </>
                )}

                <li>
                    <Link to='/'>
                        <i className="fas fa-gear"></i>
                        <span className="link-name">Configurar</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link to='/' className="link-name">Configurar</Link></li>
                    </ul>
                </li>

                <li onClick={logout} className="exit">
                    <Link to='/'>
                        <i className="fa-solid fa-right-from-bracket"></i>
                        <span className="link-name">Sair</span>
                    </Link>
                    <ul className="sub-menu blank">
                        <li><Link to='/' className="link-name">Sair</Link></li>
                    </ul>
                </li>
            </ul>
        </div>
    )
}

export default NavBar;
