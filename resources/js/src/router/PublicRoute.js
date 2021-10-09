import { Redirect, Route } from "react-router-dom";
import PropTypes from 'prop-types';

export const PublicRoute = ({
    isAuthUser,
    component: Component,
    ...rest
}) => {
    return (
        <Route { ...rest } 
            component={(props) => (
                (!isAuthUser)
                    ? (<Component { ...props }/>)
                    : (<Redirect to="/home" />)
            )}
        />
    );
}

PublicRoute.propTypes = {
    isAuthUser: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}