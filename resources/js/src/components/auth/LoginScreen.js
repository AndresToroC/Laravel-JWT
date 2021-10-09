import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';

import { useForm } from '../hooks/useForm'
import { useDispatch } from 'react-redux';
import { authLogin } from '../actions/auth';

export const LoginScreen = () => {
    const dispatch = useDispatch();

    const [formValues, handleInputChange] = useForm({
        'email': '',
        'password': ''
    });

    const { email, password } = formValues;

    const handleSubmitLogin = (e) => {
        e.preventDefault();

        if (email.trim() === '' || password.trim() === '') {
            Swal.fire('Error', 'El email y la contraseña son obligatorios', 'error')            
        }
        
        dispatch(authLogin(email, password));
    }

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-3">
                    <b>Laravel con JWT y React</b>
                    <div className="card">
                        <div className="card-header text-center">
                            <b>Iniciar sesión</b>
                        </div>
                        <div className="card-body">
                            <form onSubmit={ handleSubmitLogin }>
                                <div className="form-group">
                                    <label htmlFor="email">Correo</label>
                                    <input type="email" name="email" id="email" className="form-control" 
                                        value={ email } onChange={ handleInputChange } />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="password">Contraseña</label>
                                    <input type="password" name="password" id="password" className="form-control"
                                        value={ password } onChange={ handleInputChange } />
                                </div>
                                <div className="mt-4">
                                    <button type="submit" className="btn btn-primary btn-block">Ingresar</button>
                                </div>
                            </form>
                            <hr />
                            <p>Ingresar con cualquier usuario que tenga uno de los siguientes roles</p>
                            <div className="d-flex justify-content-between">
                                <a href="" className="btn btn-success">Administrador</a>
                                <a href="" className="btn btn-warning">Vendedor</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
