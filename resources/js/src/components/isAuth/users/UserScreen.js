import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Navbar } from '../../ui/Navbar';

export const UserScreen = () => {
    const [users, setUsers] = useState([]);

    const token = localStorage.getItem('token') || '';

    useEffect(() => {
        axios.get('/api/users?token='+token).then(res => {
            setUsers(res.data.users);
        })
    }, [setUsers])
    
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
                                    <a className="btn btn-success btn-sm">Nuevo</a>
                                </div>
                            </div>
                            <div className="card-body">
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
                                                        <td>Rol</td>
                                                        <td></td>
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
    )
}
