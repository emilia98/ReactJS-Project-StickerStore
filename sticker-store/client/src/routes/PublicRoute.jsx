import React from 'react';
import { Route, Redirect, } from 'react-router-dom';

const PublicRoute = ({ component: Component, ...rest }) => {
console.log(sessionStorage.getItem('user'));
    return <Route {...rest} render={(props) => (
        sessionStorage.getItem('user') === null
            ? <Component {...props} />
            : <Redirect to='/' />
    )} />
}

export default PublicRoute;