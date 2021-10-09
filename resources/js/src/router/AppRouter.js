import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';

import { LoginScreen } from '../components/auth/LoginScreen';
import { HomeScreen } from '../components/isAuth/HomeScreen';
import { UserScreen } from '../components/isAuth/users/UserScreen';
import { ClientScreen } from '../components/isAuth/clients/ClientScreen';
import { authIsAuthenticated } from '../components/actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';

export const AppRouter = () => {
    const dispatch = useDispatch();

    const { checking, id, role } = useSelector(state => state.auth);

    useEffect(() => {
        dispatch(authIsAuthenticated());
    }, [dispatch])
    
    if (checking) {
        return (<h1>Cargando ...</h1>);
    }

    return (
        <Router>
            <Switch>
                {
                    (role === 'Administrador') 
                    ? <PrivateRoute exact path="/users" component={ UserScreen } isAuthUser={ !!id } />
                    : ' '
                }

                <PrivateRoute exact path="/home" component={ HomeScreen } isAuthUser={ !!id } />
                <PrivateRoute exact path="/clients" component={ ClientScreen } isAuthUser={ !!id } />  

                <PublicRoute exact path='/login' component={ LoginScreen } isAuthUser={ !!id } />

                <Redirect to="/home" />

            </Switch>
        </Router>
    )
}
