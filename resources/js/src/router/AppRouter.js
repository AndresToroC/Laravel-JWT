import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    BrowserRouter as Router,
    Switch,
    Redirect
} from 'react-router-dom';

import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { LoginScreen } from '../components/auth/LoginScreen';
import { HomeScreen } from '../components/isAuth/HomeScreen';
import { authIsAuthenticated } from '../components/actions/auth';

import { UserScreen } from '../components/isAuth/users/UserScreen';
import { UserCreateScreen } from '../components/isAuth/users/UserCreateScreen';
import { UserEditScreen } from '../components/isAuth/users/UserEditScreen';

import { ClientScreen } from '../components/isAuth/clients/ClientScreen';
import { ClientCreateScreen } from '../components/isAuth/clients/ClientCreateScreen';
import { ClientEditScreen } from '../components/isAuth/clients/ClientEditScreen';

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
                        && <PrivateRoute exact path="/users" component={ UserScreen } isAuthUser={ !!id } />
                }

                <PrivateRoute exact path="/users/create" component={ UserCreateScreen } isAuthUser={ !!id } />
                <PrivateRoute exact path="/users/edit/:id" component={ UserEditScreen } isAuthUser={ !!id } />

                <PrivateRoute exact path="/home" component={ HomeScreen } isAuthUser={ !!id } />

                <PrivateRoute exact path="/clients" component={ ClientScreen } isAuthUser={ !!id } />  
                <PrivateRoute exact path="/clients/create" component={ ClientCreateScreen } isAuthUser={ !!id } />
                <PrivateRoute exact path="/clients/edit/:id" component={ ClientEditScreen } isAuthUser={ !!id } />

                <PublicRoute exact path='/login' component={ LoginScreen } isAuthUser={ !!id } />

                <Redirect to="/home" />

            </Switch>
        </Router>
    )
}
