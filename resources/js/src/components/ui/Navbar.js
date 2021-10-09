import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { authLogout } from '../actions/auth';

export const Navbar = () => {
    const dispatch = useDispatch();
    
    const { role, name } = useSelector(state => state.auth)

    const handleLogout = () => {
        dispatch(authLogout());
    }

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <Link className="navbar-brand" to="/home">Laravel JWT</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div className="navbar-nav">
                        {
                            (role === 'Administrador')
                                ? <Link className="nav-item nav-link" to='/users'>Usuarios</Link>
                                : ''
                        }
                        <Link className="nav-item nav-link" to='/clients'>Clientes</Link>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                { name }
                            </a>
                            <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                {/* <a className="dropdown-item">Actualizar perfil</a> */}
                                <a className="dropdown-item" onClick={ handleLogout }>Cerrar sesión</a>
                            </div>
                        </li>
                    </div>
                </div>
            </nav>
        </div>
    )
}
