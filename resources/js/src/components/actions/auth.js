import axios from "axios";
import Swal from "sweetalert2";

import { types } from "../types/types";

export const authLogin = (email, password) => {
    return async(dispatch) => {
        await axios.post('/api/auth/login', { email, password }).then(res => {
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);

                dispatch({
                    type: types.authLogin,
                    payload: res.data.user
                })
            } else {
                Swal.fire('Error', res.data.message, 'error');
            }
        })
    }
}

export const authLogout = () => {
    return async(dispatch) => {
        const token = localStorage.getItem('token') || '';

        await axios.post('api/auth/logout?token='+token).then(res => {
            if (res.data.success) {
                localStorage.clear();
                
                dispatch({
                    type: types.authLogout
                })
            }
        })
    }
}

export const authIsAuthenticated = () => {
    return async(dispatch) => {
        const token = localStorage.getItem('token') || '';
        
        try {
            await axios.post('/api/auth/refreshToken?token='+token).then(res => {
                if (res.data.success) {
                    localStorage.setItem('token', res.data.token);
                    
                    dispatch({
                        type: types.authLogin,
                        payload: res.data.user
                    })
                } else {
                    dispatch({
                        type: types.authIsNotAuthenticated
                    })
                }
            });
        } catch (error) {
            dispatch({
                type: types.authIsNotAuthenticated
            })
        }
    }
}

// Autenticar cualquier usuario con el rol administrador
export const authUserAdmin = () => {
    return async(dispatch) => {
        await axios.get('/api/auth/authAdmin').then(res => {
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);

                dispatch({
                    type: types.authLogin,
                    payload: res.data.user
                })
            } else {
                Swal.fire('Error', 'Error al autenticar un administrador');
            }
        })
    }
}

// Autenticar cualquier usuario con el rol vendedor
export const authUserVendedor = () => {
    return async(dispatch) => {
        await axios.get('/api/auth/authVendedor').then(res => {
            if (res.data.success) {
                localStorage.setItem('token', res.data.token);

                dispatch({
                    type: types.authLogin,
                    payload: res.data.user
                })
            } else {
                Swal.fire('Error', 'Error al autenticar un vendedor');
            }
        })
    }
}