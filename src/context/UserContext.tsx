import React, { useState, createContext } from 'react';

export const UserContext = createContext(null);

interface UserProviderProps {
    children: any;
}

function UserProvider({ children }: UserProviderProps) {
    const [userData, setUserData] = useState({
        token: '',
        user: {},
    });
}

export default UserProvider;
