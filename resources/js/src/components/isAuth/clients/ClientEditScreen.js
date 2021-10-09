import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Navbar } from '../../ui/Navbar'

export const ClientEditScreen = () => {
    const { id } = useParams();
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

    useEffect(async() => {
        await axios.get(`/api/clients/${ id }/edit?token=${ token }`).then(res => {
            if (res.data.success) {
                setName(res.data.client.name);
                setDocument(res.data.client.document);
                setEmail(res.data.client.email);
                setAdress(res.data.client.address);
            }
        });
    }, [])

    const handleUpdate = async(e) => {
        e.preventDefault();
        
        const data = {
            name, document, email, address
        }
        
        try {
            await axios.put(`/api/clients/${ id }?token=${ token }`, data).then(res => {
                if (res.data.success) {
                    setErrors([]);
    
                    Swal.fire('', res.data.message, 'success')
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
                                <b>Editar usuario</b>
                            </div>
                            <div className="card-body">
                                <form onSubmit={ handleUpdate }>
                                <div className="form-group">
                                        <label htmlFor="name">Nombre</label>
                                        <input type="name" name="name" id="name" className="form-control" 
                                            value={ name } onChange={ handleNameChange } />
                                    </div>
                                    <div className="form-group">
                                        <label htmlFor="document">Document</label>
                                        <input type="number" name="document" id="document" className="form-control" 
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
                                        <button type="submit" className="btn btn-primary btn-block">Actualizar</button>
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
