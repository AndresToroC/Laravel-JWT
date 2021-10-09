import axios from 'axios';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Navbar } from '../../ui/Navbar'

export const CreateScreen = () => {
    const token = localStorage.getItem('token');
    
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [role, setRole] = useState('');
    const [password, setPassword] = useState('');
    const [password_confirmation, setPasswordConfirmation] = useState('');
    const [errors, setErrors] = useState([]);

    const handleNameChange = ({ target }) => {
        setName(target.value)
    }

    const handleEmailChange = ({ target }) => {
        setEmail(target.value)
    }

    const handleRoleChange = ({ target }) => {
        setRole(target.value)
    }

    const handlePasswordChange = ({ target }) => {
        setPassword(target.value)
    }

    const handlePasswordConfirmationChange = ({ target }) => {
        setPasswordConfirmation(target.value)
    }

    const handleCreate = async(e) => {
        e.preventDefault();
        
        const data = {
            name, email, role, password, password_confirmation
        }

        if (password !== password_confirmation) {
            Swal.fire('Error', 'Las contraseñas deben de ser iguales', 'error');
        }

        try {
            await axios.post(`/api/users?token=${ token }`, data).then(res => {
                if (res.data.success) {
                    setErrors([]);

                    Swal.fire('', res.data.message, 'success');
                } else {
                    setErrors(Object.values(res.data.errors));
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        {
                            (errors.length > 0)
                                &&  <div className="alert alert-danger">
                                        <b>Los siguientes campos son obligatorios</b>
                                        <ul>
                                            { 
                                                errors.map((error, i) => {
                                                    return (<li key={ i }>{ error }</li>);
                                                })
                                            }
                                        </ul>
                                    </div>
                        }
                        
                        <div className="card">
                            <div className="card-header">
                                <b>Crear usuario</b>
                            </div>
                            <div className="card-body">
                                <form onSubmit={ handleCreate }>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre</label>
                                        <input type="name" name="name" id="name" className="form-control" 
                                            value={ name } onChange={ handleNameChange } />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Correo</label>
                                        <input type="email" name="email" id="email" className="form-control" 
                                            value={ email } onChange={ handleEmailChange } />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="role">Rol</label>
                                        <select name="role" id="role" className="form-control" value={ role } onChange={ handleRoleChange } >
                                            <option value="" disabled>Seleccione un Rol</option>
                                            <option value="Administrador" >Administrador</option>
                                            <option value="Vendedor" >Vendedor</option>
                                        </select>
                                        <p>{ role }</p>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password">Contraseña</label>
                                        <input type="password" name="password" id="password" className="form-control"
                                            value={ password } onChange={ handlePasswordChange } />
                                        <small className="text-gray">Dejar en blanco si no se va a actualizar</small>
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="password_confirmation">Confirmar Contraseña</label>
                                        <input type="password" name="password_confirmation" id="password_confirmation" className="form-control"
                                            value={ password_confirmation } onChange={ handlePasswordConfirmationChange } />
                                    </div>
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-success btn-block">Guardar</button>
                                        <Link to="/users" className="btn btn-dark btn-block">Regresar</Link>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
