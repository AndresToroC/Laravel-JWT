import axios from "axios";
import { type } from "jquery";
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
        
        if (token) {
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
        } else {
            dispatch({
                type: types.authIsNotAuthenticated
            })
        }
    }
}