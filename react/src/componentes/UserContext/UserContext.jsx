import { createContext, useState } from 'react';

const UserContext = createContext({
    userData:false
});

const UserProvider = ({ children }) => {

    // datos del usuario logueado
    const [userData, setUserData] = useState(null);

    const isLoggedIn = () => {
        return (userData != null && userData.user != null);
    }
    
    const esEntrenador = () => {        
        return (userData != null && userData.user.tipoUsuario === 1);
    }

    const esPresidente = () => {        
        return (userData != null && userData.user.tipoUsuario === 0);
    }

    return (
        <UserContext.Provider value={{ userData, setUserData, isLoggedIn, esEntrenador, esPresidente }}>
            {children}
        </UserContext.Provider>
    );
};

export { UserContext, UserProvider };