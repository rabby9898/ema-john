import React from 'react';
import { Navigate, useNavigate } from 'react-router';
import { useContext } from 'react/cjs/react.production.min';
import { UserContext } from '../App';


const PrivateRoute = ({children}) => {
    const Navigate = useNavigate();
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const isAuthenticated = loggedInUser.email;
      
    if (isAuthenticated ) {
      return children
    }
      
    return <Navigate to="/login"/>
};
export default PrivateRoute;