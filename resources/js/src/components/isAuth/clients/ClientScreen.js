import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Navbar } from '../../ui/Navbar'

export const ClientScreen = () => {
    const [clients, setClients] = useState([])
    
    const token = localStorage.getItem('token') || '';

    const getClients = async() => {
        await axios.get(`/api/clients?token=${ token }`).then(res => {
            setClients(res.data.clients)
        })
    }

    useEffect(() => {
        getClients();
    }, [])

    const handleDelete = (client_id) => {
        Swal.fire({
            title: '¿Esta seguro de eliminar este registro?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si',
            cancelButtonText: 'No'
            }).then(async(result) => {
                if (result.isConfirmed) {
                    await axios.delete(`/api/clients/${ client_id }?token=${ token }`).then(res => {
                        if (res.data.success) {
                            getClients();
                            Swal.fire('', res.data.message, 'success');
                        }
                    });
                }   
        })
    }
    
    return (
        <div>
            <Navbar />
            <div className="container mt-5">
                <div className="row">
                    <div className="col-md-12">
                        <div className="card">
                            <div className="card-header">
                                <div className="d-flex justify-content-between">
                                    <b>Lista de Clientes</b>
                                    <Link to="/clients/create" className="btn btn-success btn-sm">Nuevo</Link>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Documento</th>
                                                <th>Correo</th>
                                                <th>Dirección</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                clients.map(client => {
                                                    return (
                                                        <tr key={ client.id }>
                                                            <td>{ client.name }</td>
                                                            <td>{ client.document }</td>
                                                            <td>{ client.email }</td>
                                                            <td>{ client.address }</td>
                                                            <td className="text-right">
                                                                <Link to={`/clients/edit/${client.id}`} className="btn btn-primary btn-sm mr-3">Editar</Link>
                                                                <button onClick={ () => handleDelete(client.id) } className="btn btn-danger btn-sm">Eliminar</button>
                                                            </td>
                                                        </tr>
                                                    );
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
