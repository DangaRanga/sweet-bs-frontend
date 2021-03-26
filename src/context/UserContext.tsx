import React, { useState, createContext } from 'react';

export const UserContext = createContext(null);

interface UserProviderProps {
    children: any;
}

function UserProvider(props: UserProviderProps) {}

export default UserProvider;
