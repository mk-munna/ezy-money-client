import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

export const AuthContext = createContext("");

const AuthProvider = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [auth, setAuth] = useState(null);
    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            setAuth(token);
        }
        setTimeout(() => {
            setLoading(false)
        }, 500);
    }, []);
    const axiosPublic = useAxiosPublic();
    const signUp = async (name, mobile, email, pin, role) => {
        try {
            const { data } = await axiosPublic.post('/sign-up', { name, mobile, email, pin, role });
            console.log(data);
            toast(data.message)
            if (data.result.insertedId) {
                setAuth(data.token);
                localStorage.setItem('token', data.token);
                localStorage.setItem('user', mobile);
            } 
        } catch (err) {
            console.error(err);
        }
    }
    const login = async (mobile, pin) => {
        try {
            console.log(mobile, pin);
            const { data } = await axiosPublic.post('/login', { mobile, pin });
            console.log(data.number);
            setAuth(data.token);
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', data.number);
        } catch (err) {
            console.error(err);
        }
    };

    const logout = () => {
        setAuth(null);
        localStorage.removeItem('token');
    };
    const authInfo = {
        auth,
        signUp,
        login,
        logout,
        loading,
        setLoading
    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};
export default AuthProvider;