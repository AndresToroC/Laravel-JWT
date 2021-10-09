import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navbar } from '../../ui/Navbar';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

export const UserScreen = () => {
    const [users, setUsers] = useState([]);
    
    const token = localStorage.getItem('token') || '';

    const getUsers = async() => {
        await axios.get(`/api/users?token=${ token }`).then(res => {
            setUsers(res.data.users);
        })
    }

    useEffect(() => {
        getUsers();
    }, [])

    const handleDelete = (user_id) => {
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
                    await axios.delete(`/api/users/${ user_id }?token=${ token }`).then(res => {
                        if (res.data.success) {
                            getUsers();
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
                                    <b>Lista de usuarios</b>
                                    <Link to="/users/create" className="btn btn-success btn-sm">Nuevo</Link>
                                </div>
                            </div>
                            <div className="card-body">
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th>Nombre</th>
                                                <th>Correo</th>
                                                <th>Rol</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                users.map(user => {
                                                    return (
                                                        <tr key={ user.id }>
                                                            <td>{ user.name }</td>
                                                            <td>{ user.email }</td>
                                                            <td>{ user.role }</td>
                                                            <td className="text-right">
                                                                <Link to={`/users/edit/${user.id}`} className="btn btn-primary btn-sm mr-3">Editar</Link>
                                                                <button onClick={ () => handleDelete(user.id) } className="btn btn-danger btn-sm">Eliminar</button>
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
