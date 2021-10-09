import React from 'react';
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from 'react-router-dom';
import { LoginScreen } from '../components/auth/LoginScreen';
import { ClientScreen } from '../components/isAuth/clients/ClientScreen';
import { UserScreen } from '../components/isAuth/users/UserScreen';

export const AppRouter = () => {
    return (
        <Router>
            <Switch>
                <Route exact path='/users' component={ UserScreen } />
                <Route exact path='/clients' component={ ClientScreen } />
                <Route exact path='/login' component={ LoginScreen } />

                <Redirect to='/login' />
            </Switch>
        </Router>
    )
}
