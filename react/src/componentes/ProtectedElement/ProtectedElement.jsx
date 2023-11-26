import { useContext } from 'react';
import { UserContext } from '../UserContext/UserContext';

const ProtectedElement = ({mustBeEntrenador,mustBePresidente, children }) => {

    const { isLoggedIn, esEntrenador, esPresidente } = useContext(UserContext);

    if (!isLoggedIn() || (mustBeEntrenador && !esEntrenador())) {
        return <></>;
    }

    if (!isLoggedIn() || (mustBePresidente && !esPresidente())) {
        return <></>;
    }
    return children;
};
export { ProtectedElement };