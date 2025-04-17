import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem('token') || '');
    const [isLoggedIn, setIsLoggedIn] = useState(!!token);

    useEffect(() => {
        setIsLoggedIn(!!token);
    }, [token]);

    const login = (token) => {
        localStorage.setItem('token', token);
        setToken(token);
    };

    const logout = () => {
        localStorage.removeItem('token');
        setToken('');
    };

    return (
        <AuthContext.Provider value={{ token, isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
