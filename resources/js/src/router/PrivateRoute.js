import { Redirect, Route } from "react-router-dom";
import PropTypes from 'prop-types';

export const PrivateRoute = ({
    isAuthUser,
    component: Component,
    ...rest
}) => {
    localStorage.setItem('pathname', rest.location.pathname);
    
    return (
        <Route {...rest}
            component={(props) => (
                (isAuthUser)
                    ? ( <Component {...props}/> )
                    : ( <Redirect to="/login" /> )
            )}
        />
    );
}

PrivateRoute.protTypes = {
    isAuthUser: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}