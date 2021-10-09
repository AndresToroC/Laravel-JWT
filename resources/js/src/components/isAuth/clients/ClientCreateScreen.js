import React, { useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Navbar } from '../../ui/Navbar'
import Swal from 'sweetalert2';

export const ClientCreateScreen = () => {
    const token = localStorage.getItem('token');
    
    const [name, setName] = useState('');
    const [document, setDocument] = useState('');
    const [email, setEmail] = useState('');
    const [address, setAdress] = useState('');
    const [errors, setErrors] = useState([]);

    const handleNameChange = ({ target }) => {
        setName(target.value)
    }

    const handleDocumentChange = ({ target }) => {
        setDocument(target.value)
    }

    const handleEmailChange = ({ target }) => {
        setEmail(target.value)
    }


    const handleAdressChange = ({ target }) => {
        setAdress(target.value)
    }

    const handleCreate = async(e) => {
        e.preventDefault();
        
        const data = {
            name, document, email, address
        }

        try {
            await axios.post(`/api/clients?token=${ token }`, data).then(res => {
                if (res.data.success) {
                    setErrors([]);
                    clearForm();
                    
                    Swal.fire('', res.data.message, 'success');
                } else {
                    setErrors(Object.values(res.data.errors));
                }
            })
        } catch (error) {
            console.log(error);
        }
    }

    const clearForm = () => {
        setName('');
        setDocument('');
        setEmail('');
        setAdress('');
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
                                <b>Crear Cliente</b>
                            </div>
                            <div className="card-body">
                                <form onSubmit={ handleCreate }>
                                    <div className="form-group">
                                        <label htmlFor="name">Nombre</label>
                                        <input type="name" name="name" id="name" className="form-control" 
                                            value={ name } onChange={ handleNameChange } />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="document">Document</label>
                                        <input type="text" name="document" id="document" className="form-control" 
                                            value={ document } onChange={ handleDocumentChange } />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="email">Correo</label>
                                        <input type="email" name="email" id="email" className="form-control" 
                                            value={ email } onChange={ handleEmailChange } />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="address">Dirección</label>
                                        <input type="text" name="address" id="address" className="form-control" 
                                            value={ address } onChange={ handleAdressChange } />
                                    </div>
                                    <div className="mt-4">
                                        <button type="submit" className="btn btn-success btn-block">Guardar</button>
                                        <Link to="/clients" className="btn btn-dark btn-block">Regresar</Link>
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
