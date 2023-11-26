import { useContext } from 'react';
import { Navigate } from "react-router-dom";
import { UserContext } from '../UserContext/UserContext';


const ProtectedRoute = ({mustBeEntrenador, children }) => {

    const { isLoggedIn, esEntrenador } = useContext(UserContext);

    if (!isLoggedIn() || (mustBeEntrenador && !esEntrenador())) {
        return <Navigate to="/" replace />;
    }

    return children;
};
export { ProtectedRoute };